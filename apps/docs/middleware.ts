import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { getToken } from "next-auth/jwt";

export default async function(req:NextRequest){
const token= await getToken({req,secret:process.env.JWT_SECRET,cookieName:"zeus-auth.session-token"})
const url = req.nextUrl;
console.log("Token",token)
if(!token){
    return NextResponse.redirect(new URL("/signin", url.origin));
}
if (url.pathname.startsWith("/admin") && token.role === "USER") {
    return NextResponse.redirect(new URL("/unauthorized", url.origin));
  }


  return NextResponse.next()
}

export const config = {
    matcher: ["/user/:path*", "/admin/:path*"], // Apply middleware to these routes
  };