-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('student', 'sponsor');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  audience_size INTEGER,
  category TEXT,
  engagement_metrics JSONB DEFAULT '{}',
  budget_range TEXT,
  location TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  target_demographics JSONB DEFAULT '[]',
  marketing_goals TEXT,
  budget_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  sponsor_id UUID REFERENCES public.sponsors(id) ON DELETE CASCADE NOT NULL,
  match_score DECIMAL(3,2) CHECK (match_score >= 0 AND match_score <= 1),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  sponsorship_amount INT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE (event_id, sponsor_id)
);

-- Create a type for message status
CREATE TYPE public.message_status AS ENUM ('sent', 'delivered', 'read');

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_one UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  participant_two UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE (participant_one, participant_two)
);

-- Create messages table for chat functionality
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  status public.message_status DEFAULT 'sent',
  attachment_url TEXT
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;


-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role LANGUAGE SQL STABLE SECURITY DEFINER AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User roles RLS policies
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Events RLS policies
CREATE POLICY "All users can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Student organizers can manage their events" ON public.events FOR ALL USING (auth.uid() = organizer_id AND public.has_role(auth.uid(), 'student'));

-- Sponsors RLS policies
CREATE POLICY "All users can view sponsor profiles" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "Sponsors can manage their own profile" ON public.sponsors FOR ALL USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'sponsor'));

-- Matches RLS policies
CREATE POLICY "Users can view matches for their events/sponsors" ON public.matches FOR SELECT USING (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND organizer_id = auth.uid()) OR EXISTS (SELECT 1 FROM public.sponsors WHERE id = sponsor_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage matches for their events/sponsors" ON public.matches FOR ALL USING (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND organizer_id = auth.uid()) OR EXISTS (SELECT 1 FROM public.sponsors WHERE id = sponsor_id AND user_id = auth.uid()));

-- Conversations RLS policies
CREATE POLICY "Users can view their own conversations" ON public.conversations FOR SELECT USING (auth.uid() = participant_one OR auth.uid() = participant_two);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = participant_one OR auth.uid() = participant_two);

-- Messages RLS policies
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (conversation_id IN (SELECT id FROM public.conversations WHERE auth.uid() = participant_one OR auth.uid() = participant_two));
CREATE POLICY "Authenticated users can create messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their own messages" ON public.messages FOR UPDATE USING (auth.uid() = sender_id);
CREATE POLICY "Users can delete their own messages" ON public.messages FOR DELETE USING (auth.uid() = sender_id);


-- Create trigger function for updating updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON public.sponsors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Recommendation Functions
CREATE OR REPLACE FUNCTION get_recommendations_for_event(event_id_param UUID)
RETURNS TABLE (sponsor JSON, match_score DECIMAL) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY SELECT json_build_object('id', s.id, 'company_name', s.company_name, 'industry', s.industry) AS sponsor, m.match_score
  FROM matches m JOIN sponsors s ON m.sponsor_id = s.id
  WHERE m.event_id = event_id_param ORDER BY m.match_score DESC LIMIT 5;
END;
$$;

CREATE OR REPLACE FUNCTION get_recommendations_for_sponsor(sponsor_id_param UUID)
RETURNS TABLE ("event" JSON, match_score DECIMAL) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY SELECT json_build_object('id', e.id, 'title', e.title, 'category', e.category, 'description', e.description) AS "event", m.match_score
  FROM matches m JOIN events e ON m.event_id = e.id
  WHERE m.sponsor_id = sponsor_id_param ORDER BY m.match_score DESC LIMIT 5;
END;
$$;

-- Conversation Functions
CREATE OR REPLACE FUNCTION get_user_conversations(p_user_id UUID)
RETURNS TABLE (id UUID, other_user JSON, last_message JSON) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  WITH user_convos AS (
    SELECT c.id as convo_id,
           CASE WHEN c.participant_one = p_user_id THEN c.participant_two ELSE c.participant_one END as other_user_id
    FROM conversations c
    WHERE c.participant_one = p_user_id OR c.participant_two = p_user_id
  ),
  last_messages AS (
    SELECT DISTINCT ON (m.conversation_id) m.conversation_id, m.content, m.created_at
    FROM messages m
    WHERE m.conversation_id IN (SELECT convo_id FROM user_convos)
    ORDER BY m.conversation_id, m.created_at DESC
  )
  SELECT uc.convo_id,
         json_build_object('id', p.id, 'full_name', p.full_name) as other_user,
         json_build_object('content', lm.content, 'created_at', lm.created_at) as last_message
  FROM user_convos uc
  JOIN profiles p ON p.id = uc.other_user_id
  LEFT JOIN last_messages lm ON lm.conversation_id = uc.convo_id
  ORDER BY lm.created_at DESC;
END;
$$; 