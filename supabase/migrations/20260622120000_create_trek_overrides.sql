CREATE TABLE IF NOT EXISTS trek_overrides (
  trek_id TEXT PRIMARY KEY,
  price TEXT,
  original_price TEXT,
  discount_label TEXT,
  title TEXT,
  meta_description TEXT,
  duration TEXT,
  difficulty TEXT,
  altitude TEXT,
  distance TEXT,
  next_trip_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlights JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE trek_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read trek overrides" ON trek_overrides;
CREATE POLICY "Public read trek overrides"
  ON trek_overrides FOR SELECT
  TO anon, authenticated
  USING (true);
