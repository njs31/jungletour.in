CREATE TABLE IF NOT EXISTS booking_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id TEXT,
  trip_slug TEXT,
  trip_title TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS booking_inquiries_created_at_idx
  ON booking_inquiries (created_at DESC);

ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;
