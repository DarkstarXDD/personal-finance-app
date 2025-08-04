import { NextResponse, type NextRequest } from "next/server"

import { verifyToken } from "@/lib/session"

const publicRoutes = ["/login", "/signup"]

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const sessionCookie = req.cookies.get("session")
  const isPublic = publicRoutes.includes(pathname)

  if (!sessionCookie) {
    if (!isPublic) return NextResponse.redirect(new URL("/login", req.url))
    return NextResponse.next()
  }

  const session = await verifyToken(sessionCookie.value)

  if (!session) {
    if (!isPublic) return NextResponse.redirect(new URL("/login", req.url))
    return NextResponse.next()
  }

  if (isPublic) return NextResponse.redirect(new URL("/", req.url))
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:png|svg|jpeg|jpg|webp|gif)$).*)",
  ],
}
