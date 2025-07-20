import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

// Deno-specific environment variable access
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

if (!supabaseUrl || !supabaseKey || !geminiApiKey) {
  throw new Error("Missing environment variables.");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface Event {
  id: string;
  title: string;
  description: string;
  audience_size: number;
  category: string;
  budget_range: string;
  location: string;
}

interface Sponsor {
  id: string;
  company_name: string;
  industry: string;
  target_demographics: any;
  marketing_goals: string;
  budget_range: string;
}

interface Match {
    event_id: string;
    sponsor_id: string;
    match_score: number;
    status: 'pending' | 'accepted' | 'rejected';
}

async function getEventsAndSponsors() {
  const { data: events, error: eventsError } = await supabase.from("events").select("*");
  if (eventsError) throw new Error(`Error fetching events: ${eventsError.message}`);

  const { data: sponsors, error: sponsorsError } = await supabase.from("sponsors").select("*");
  if (sponsorsError) throw new Error(`Error fetching sponsors: ${sponsorsError.message}`);

  return { events, sponsors };
}

async function getExistingMatches(eventId: string) {
  const { data, error } = await supabase.from("matches").select("sponsor_id").eq("event_id", eventId);
  if (error) {
    console.error(`Error fetching existing matches for event ${eventId}:`, error);
    return new Set<string>();
  }
  return new Set(data.map((match: { sponsor_id: string }) => match.sponsor_id));
}

async function generateMatch(event: Event, sponsor: Sponsor) {
  const prompt = `
    You are an expert event-sponsor matchmaking AI. Your task is to analyze an event and a potential sponsor and determine how good of a match they are.

    Event Details:
    - Title: ${event.title}
    - Description: ${event.description}
    - Category: ${event.category}
    - Audience Size: ${event.audience_size}
    - Budget: ${event.budget_range}
    - Location: ${event.location}

    Sponsor Details:
    - Company: ${sponsor.company_name}
    - Industry: ${sponsor.industry}
    - Marketing Goals: ${sponsor.marketing_goals}
    - Target Demographics: ${JSON.stringify(sponsor.target_demographics)}
    - Sponsorship Budget: ${sponsor.budget_range}

    Based on all of this information, please provide a match score from 0.0 to 1.0, where 1.0 is a perfect match.
    Also provide a brief "reasoning" for your score.

    Return your response as a JSON object with two keys: "matchScore" (a number) and "reasoning" (a string).
    Example:
    {
      "matchScore": 0.85,
      "reasoning": "The sponsor's target demographic of young tech enthusiasts aligns perfectly with the hackathon's audience. Their marketing goal of brand awareness is also a great fit."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean the text to ensure it's valid JSON
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedText);
    return {
      matchScore: parsed.matchScore,
      reasoning: parsed.reasoning
    };
  } catch (error) {
    console.error("Error generating match with Gemini:", error);
    return {
      matchScore: 0,
      reasoning: "Error analyzing match."
    };
  }
}

serve(async (_req) => {
  try {
    const { events, sponsors } = await getEventsAndSponsors();
    const newMatches: Match[] = [];

    for (const event of events) {
      const existingSponsorIds = await getExistingMatches(event.id);
      for (const sponsor of sponsors) {
        if (existingSponsorIds.has(sponsor.id)) {
          continue; // Skip if a match already exists
        }

        const { matchScore, reasoning } = await generateMatch(event, sponsor);

        console.log(`Match score for ${event.title} and ${sponsor.company_name}: ${matchScore}`);

        if (matchScore > 0.5) { // Threshold for creating a match
          newMatches.push({
            event_id: event.id,
            sponsor_id: sponsor.id,
            match_score: matchScore,
            status: 'pending',
          });
        }
      }
    }

    if (newMatches.length > 0) {
      const { data, error } = await supabase.from("matches").insert(newMatches).select();
      if (error) {
        console.error("Error inserting new matches:", error);
        throw new Error(`Error inserting new matches: ${error.message}`);
      }
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ message: "No new matches found." }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
