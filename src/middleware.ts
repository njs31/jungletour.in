import { NextResponse, type NextRequest } from "next/server";

/** Set SITE_MAINTENANCE=true to show the maintenance page to visitors. */
function isMaintenanceEnabled() {
  return process.env.SITE_MAINTENANCE === "true";
}

function isAllowedDuringMaintenance(pathname: string) {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/api/admin")) return true;
  if (pathname === "/under-deployment") return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/icon.png" || pathname === "/apple-icon.png") return true;
  return false;
}

export function middleware(request: NextRequest) {
  if (!isMaintenanceEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isAllowedDuringMaintenance(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/under-deployment";
  url.search = "";

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
