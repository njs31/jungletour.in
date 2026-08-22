import { defineMiddleware } from "astro:middleware";
import { getEnv } from "@/lib/env";

/** Maintenance is ON by default. Set SITE_MAINTENANCE=false to launch the full site. */
function isMaintenanceEnabled() {
  return getEnv("SITE_MAINTENANCE") !== "false";
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
