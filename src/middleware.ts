import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSession, sessionSecret } from "@/lib/desk/session";

/* Everything under /desk needs Mark's session, except the sign-in screen itself. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/desk/login") return NextResponse.next();
  const ok = await readSession(req.cookies.get(SESSION_COOKIE)?.value, sessionSecret());
  if (ok) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
  const url = req.nextUrl.clone();
  url.pathname = "/desk/login";
  url.search = pathname === "/desk" ? "" : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/desk", "/desk/:path*"] };
