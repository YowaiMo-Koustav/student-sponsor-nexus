-- Function to get event performance stats for a student organizer
CREATE OR REPLACE FUNCTION get_event_performance_stats(p_organizer_id UUID)
RETURNS TABLE (
  event_title TEXT,
  views INT,
  inquiries INT,
  match_rate REAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Note: 'views' is a placeholder as we are not tracking event views yet.
  -- 'inquiries' is the count of pending matches.
  RETURN QUERY
  SELECT
    e.title,
    (random() * 1000)::INT AS views,
    (SELECT COUNT(*) FROM matches m WHERE m.event_id = e.id AND m.status = 'pending')::INT AS inquiries,
    (
      (SELECT COUNT(*) FROM matches m WHERE m.event_id = e.id AND m.status = 'accepted')::REAL /
      NULLIF((SELECT COUNT(*) FROM matches m WHERE m.event_id = e.id), 0)
    ) * 100 AS match_rate
  FROM events e
  WHERE e.organizer_id = p_organizer_id;
END;
$$;

-- Function for sponsor response rates
CREATE OR REPLACE FUNCTION get_sponsor_response_rates(p_organizer_id UUID)
RETURNS TABLE (sponsor_name TEXT, response_rate REAL)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH sponsor_interactions AS (
    SELECT
      s.company_name,
      COUNT(m.id) AS total_inquiries,
      COUNT(m.id) FILTER (WHERE m.status IN ('accepted', 'rejected')) AS responded_inquiries
    FROM matches m
    JOIN events e ON m.event_id = e.id
    JOIN sponsors s ON m.sponsor_id = s.id
    WHERE e.organizer_id = p_organizer_id
    GROUP BY s.company_name
  )
  SELECT
    si.company_name,
    (si.responded_inquiries::REAL / si.total_inquiries) * 100 AS response_rate
  FROM sponsor_interactions si;
END;
$$;

-- Function for top sponsor categories
CREATE OR REPLACE FUNCTION get_top_sponsor_categories(p_organizer_id UUID)
RETURNS TABLE (category TEXT, "count" BIGINT)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.industry,
    COUNT(m.id)
  FROM matches m
  JOIN events e ON m.event_id = e.id
  JOIN sponsors s ON m.sponsor_id = s.id
  WHERE e.organizer_id = p_organizer_id
  GROUP BY s.industry
  ORDER BY count DESC;
END;
$$;

-- Function for revenue tracking
CREATE OR REPLACE FUNCTION get_revenue_tracking(p_organizer_id UUID)
RETURNS TABLE ("month" TEXT, total_revenue NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    to_char(m.updated_at, 'YYYY-MM') AS month,
    SUM(m.sponsorship_amount) AS total_revenue
  FROM matches m
  JOIN events e ON m.event_id = e.id
  WHERE e.organizer_id = p_organizer_id AND m.status = 'completed'
  GROUP BY to_char(m.updated_at, 'YYYY-MM')
  ORDER BY month;
END;
$$; 