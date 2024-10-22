import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const res = NextResponse.next();

    res.headers.append("Access-Control-Allow-Origin", "*");
    res.headers.append("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.headers.append("access-control-allow-headers", "authorization,token");
    res.headers.append("vary", "Access-Control-Request-Headers");
    res.headers.append("Content-Length", "0");

    return res;
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|login|setup).*)",
};
