import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/adminAuth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("dvt_admin_session")?.value;
    const isAuthenticated = await verifyAdminToken(sessionCookie);

    // If accessing login page while already authenticated, go straight to enquiries
    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/enquiries", request.url));
      }
      return NextResponse.next();
    }

    // For all other /admin routes, require authentication
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      // Optional: keep original destination to redirect after login
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
