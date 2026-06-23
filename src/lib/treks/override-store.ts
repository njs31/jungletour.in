import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { TrekOverride } from "@/types/trek-override";

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(STORE_DIR, "trip-overrides.json");

export async function readFileOverrides(): Promise<Record<string, TrekOverride>> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Record<string, TrekOverride>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export async function writeFileOverride(
  trekId: string,
  override: TrekOverride
): Promise<TrekOverride> {
  const all = await readFileOverrides();
  all[trekId] = override;
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(all, null, 2), "utf8");
  return override;
}

export async function mergeOverrides(
  primary: Record<string, TrekOverride>,
  secondary: Record<string, TrekOverride>
) {
  return { ...secondary, ...primary };
}
