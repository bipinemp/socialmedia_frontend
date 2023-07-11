import { NextResponse } from "next/server";
import { verifyJwtToken } from "./app/libs/auth";

export async function middleware(req) {
  const token = req.cookies.get("jwt")?.value;
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((err) => {
      console.log(err);
    }));

  if (isPublicPath && token && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isPublicPath && (!token || !verifiedToken)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/register", "/"],
};
