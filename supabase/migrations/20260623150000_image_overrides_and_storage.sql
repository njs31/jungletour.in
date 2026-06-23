INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'trip-images',
  'trip-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read trip images" ON storage.objects;
CREATE POLICY "Public read trip images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'trip-images');

CREATE TABLE IF NOT EXISTS image_overrides (
  image_key TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT,
  storage_path TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE image_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read image overrides" ON image_overrides;
CREATE POLICY "Public read image overrides"
  ON image_overrides FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON image_overrides TO anon, authenticated;
