import { JwtPayload } from "jsonwebtoken";
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
  const response = NextResponse.next();

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

      // ✅ Middleware-এ Cookie সেট করার সঠিক নিয়ম
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken as string,
        process.env.JWT_ACCESS_SECRET as string
      );
    }
  }

  let userRole: string | null = null;

  if (decodedAccessToken?.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // 1️⃣ Prevent logged-in users from accessing auth pages
  if (accessToken && userRole && AUTH_ROUTES.includes(pathname)) {
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

  // ✅ 2️⃣ Public Route Matching Logic (একদম নির্ভুল নিয়ম)
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(route + "/");
  });

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // 3️⃣ Protect private routes
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4️⃣ RBAC Check
  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};



// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function proxy(request: NextRequest) {
//   // ১. বর্তমান URL-এর পাথনাম নেওয়া
//   const pathname = request.nextUrl.pathname;

//   // ২. রিকোয়েস্ট রেসপন্স তৈরি করা
//   const response = NextResponse.next();

//   // --------------------------------------------------
//   // আপনার কাস্টম লজিক (Header, Cookie বা Logger ইত্যাদি)
//   // --------------------------------------------------

//   // উদাহরণ: কাস্টম হেডার পাস করা (যদি লাগে)
//   response.headers.set("x-current-path", pathname);

//   return response;
// }

// // ৩. ম্যাচিং কনফিগারেশন (static Assets বাদ দিয়ে বাকি সব রুটে চলবে)
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
