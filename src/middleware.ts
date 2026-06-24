import { NextResponse, type NextRequest } from "next/server";

function isUnderDeployment() {
  return process.env.SITE_UNDER_DEPLOYMENT === "true";
}

function isAllowedDuringDeployment(pathname: string) {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/api/admin")) return true;
  if (pathname === "/under-deployment") return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/icon.png" || pathname === "/apple-icon.png") return true;
  return false;
}

export function middleware(request: NextRequest) {
  if (!isUnderDeployment()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isAllowedDuringDeployment(pathname)) {
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
