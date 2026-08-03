import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getNewAccessToken } from "./services/refreshToken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/payment/success",
  "/payment/cancel",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  // 🔁 Refresh token logic
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result?.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      );
    }
  }

  let userRole: string | null = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  } else if (decodedAccessToken?.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // 🔁 Prevent logged-in users from accessing auth pages
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    } else if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // 🔐 Protect private routes
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 RBAC

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  /**
   * 🚨 IMPORTANT FIX:
   * ❌ Removed strict role check for payment success/cancel
   *
   * কারণ:
   * Stripe redirect-এ user authenticated নাও থাকতে পারে
   * তাই এই route public রাখতে হবে
   */

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};