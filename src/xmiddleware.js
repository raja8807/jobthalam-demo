import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();
  console.log("Middleware is running:");

  res.headers.set("Access-Control-Allow-Origin", "*"); // Change "*" to your domain if needed
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  return res;
}

export const config = {
  matcher: "/api/:path*", // Apply middleware only to API routes
};

