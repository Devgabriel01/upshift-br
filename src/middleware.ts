import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isHubRoute = req.nextUrl.pathname.startsWith("/hub");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isHubRoute && !token) {
      return NextResponse.redirect(new URL("/hub/login", req.url));
    }

    if (isAdminRoute && token?.role !== "ADMIN") {
      if (isHubRoute) return NextResponse.next();
      return NextResponse.redirect(new URL("/hub/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/hub/dashboard") ||
            req.nextUrl.pathname.startsWith("/hub/projects") ||
            req.nextUrl.pathname.startsWith("/hub/notifications")) {
          return !!token;
        }
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/hub/:path*", "/admin/:path*"],
};
