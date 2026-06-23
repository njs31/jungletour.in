#!/usr/bin/env node
/**
 * Syncs ADMIN_SESSION_SECRET hash to Supabase admin_settings.
 * Run after changing ADMIN_SESSION_SECRET in .env.local or Vercel.
 *
 * Usage: node scripts/sync-admin-write-hash.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(path) {
  try {
    const content = readFileSync(path, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local may not exist in CI
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const secret = process.env.ADMIN_SESSION_SECRET;

if (!url || !serviceKey || !secret) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or ADMIN_SESSION_SECRET"
  );
  process.exit(1);
}

const hash = createHash("sha256").update(secret).digest("hex");
const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { error } = await supabase.from("admin_settings").upsert(
  { key: "write_key_hash", value: hash },
  { onConflict: "key" }
);

if (error) {
  console.error("Failed to sync admin write hash:", error.message);
  process.exit(1);
}

console.log("Admin write hash synced successfully.");
