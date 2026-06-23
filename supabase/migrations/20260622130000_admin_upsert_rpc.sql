CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_settings (
  key text PRIMARY KEY,
  value text NOT NULL
);

CREATE OR REPLACE FUNCTION public.upsert_trek_override_admin(
  p_payload jsonb,
  p_secret text
) RETURNS trek_overrides
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  expected_hash text;
  result trek_overrides;
BEGIN
  SELECT value INTO expected_hash FROM admin_settings WHERE key = 'write_key_hash';

  IF expected_hash IS NULL
    OR p_secret IS NULL
    OR encode(extensions.digest(p_secret, 'sha256'), 'hex') != expected_hash THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO trek_overrides (
    trek_id,
    price,
    original_price,
    discount_label,
    title,
    meta_description,
    duration,
    difficulty,
    altitude,
    distance,
    next_trip_dates,
    highlights,
    is_active,
    updated_at
  ) VALUES (
    p_payload->>'trek_id',
    NULLIF(p_payload->>'price', ''),
    NULLIF(p_payload->>'original_price', ''),
    NULLIF(p_payload->>'discount_label', ''),
    NULLIF(p_payload->>'title', ''),
    NULLIF(p_payload->>'meta_description', ''),
    NULLIF(p_payload->>'duration', ''),
    NULLIF(p_payload->>'difficulty', ''),
    NULLIF(p_payload->>'altitude', ''),
    NULLIF(p_payload->>'distance', ''),
    COALESCE(p_payload->'next_trip_dates', '[]'::jsonb),
    p_payload->'highlights',
    COALESCE((p_payload->>'is_active')::boolean, true),
    COALESCE((p_payload->>'updated_at')::timestamptz, now())
  )
  ON CONFLICT (trek_id) DO UPDATE SET
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    discount_label = EXCLUDED.discount_label,
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description,
    duration = EXCLUDED.duration,
    difficulty = EXCLUDED.difficulty,
    altitude = EXCLUDED.altitude,
    distance = EXCLUDED.distance,
    next_trip_dates = EXCLUDED.next_trip_dates,
    highlights = EXCLUDED.highlights,
    is_active = EXCLUDED.is_active,
    updated_at = EXCLUDED.updated_at
  RETURNING * INTO result;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_trek_override_admin(jsonb, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_trek_override_admin(jsonb, text) TO anon, authenticated, service_role;
