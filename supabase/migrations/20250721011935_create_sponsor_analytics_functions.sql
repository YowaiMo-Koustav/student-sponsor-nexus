-- Function to get portfolio stats for a sponsor
CREATE OR REPLACE FUNCTION get_sponsor_portfolio_stats(p_sponsor_user_id UUID)
RETURNS TABLE (
  total_events_sponsored BIGINT,
  total_investment NUMERIC,
  avg_student_engagement REAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Note: 'avg_student_engagement' is a placeholder.
  RETURN QUERY
  SELECT
    COUNT(m.id) AS total_events_sponsored,
    SUM(m.sponsorship_amount) AS total_investment,
    AVG((random() * 100))::REAL AS avg_student_engagement
  FROM matches m
  JOIN sponsors s ON m.sponsor_id = s.id
  WHERE s.user_id = p_sponsor_user_id AND m.status = 'completed';
END;
$$;

-- Function for ROI tracking
CREATE OR REPLACE FUNCTION get_roi_tracking(p_sponsor_user_id UUID)
RETURNS TABLE ("month" TEXT, roi REAL)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Note: ROI is a placeholder calculation.
  RETURN QUERY
  SELECT
    to_char(m.updated_at, 'YYYY-MM') AS month,
    (SUM(e.audience_size * random()) / NULLIF(SUM(m.sponsorship_amount), 0)) * 100 AS roi
  FROM matches m
  JOIN sponsors s ON m.sponsor_id = s.id
  JOIN events e ON m.event_id = e.id
  WHERE s.user_id = p_sponsor_user_id AND m.status = 'completed'
  GROUP BY to_char(m.updated_at, 'YYYY-MM')
  ORDER BY month;
END;
$$;

-- Function for student engagement metrics
CREATE OR REPLACE FUNCTION get_student_engagement_metrics(p_sponsor_user_id UUID)
RETURNS TABLE (event_name TEXT, engagement_rate REAL)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Note: engagement_rate is a placeholder calculation.
  RETURN QUERY
  SELECT
    e.title AS event_name,
    (random() * 100)::REAL AS engagement_rate
  FROM matches m
  JOIN sponsors s ON m.sponsor_id = s.id
  JOIN events e ON m.event_id = e.id
  WHERE s.user_id = p_sponsor_user_id AND m.status = 'completed';
END;
$$; 