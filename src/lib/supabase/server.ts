import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

/**
 * Public (anon) Supabase client for server-side reads.
 * No user sessions are used in this app, so no cookie handling is required.
 */
export async function createClient() {
  return createSupabaseClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL")!,
    getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")!
  );
}
