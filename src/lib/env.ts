type EnvRecord = Record<string, string | undefined>;

function viteEnv(): EnvRecord {
  try {
    return (import.meta.env ?? {}) as EnvRecord;
  } catch {
    return {};
  }
}

export function getEnv(key: string): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  if (fromProcess) return fromProcess;

  const env = viteEnv();
  if (env[key]) return env[key];

  if (key.startsWith("NEXT_PUBLIC_")) {
    return env[key.replace("NEXT_PUBLIC_", "PUBLIC_")];
  }

  return undefined;
}

export function isProduction(): boolean {
  const nodeEnv = getEnv("NODE_ENV");
  if (nodeEnv) return nodeEnv === "production";

  try {
    return Boolean((import.meta as { env?: { PROD?: boolean } }).env?.PROD);
  } catch {
    return false;
  }
}
