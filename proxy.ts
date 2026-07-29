import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {




    
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/landlord-dashboard/:path*", "/tenant-dashboard/:path*"],
};