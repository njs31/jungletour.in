import { defineMiddleware } from "astro:middleware";
import { getEnv } from "@/lib/env";

/** Maintenance is OFF by default. Set SITE_MAINTENANCE=true to enable maintenance mode. */
function isMaintenanceEnabled() {
  return getEnv("SITE_MAINTENANCE") === "true";
}

function isAllowedDuringMaintenance(pathname: string) {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/api/admin")) return true;
  if (pathname === "/under-deployment") return true;
  if (/^\/_astro\//.test(pathname)) return true;
  if (/^\/favicon\.ico$/.test(pathname)) return true;
  if (/\.(svg|png|jpg|jpeg|gif|webp|ico)$/.test(pathname)) return true;
  return false;
}

export const onRequest = defineMiddleware((context, next) => {
  if (!isMaintenanceEnabled()) {
    return next();
  }

  const { pathname } = context.url;

  if (isAllowedDuringMaintenance(pathname)) {
    return next();
  }

  return context.redirect("/under-deployment");
});
