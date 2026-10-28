import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const AUTH_ROUTES = ["/login","/register"]
const PUBLIC_ROUTES = ["/"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
     
     const pathname = request.nextUrl.pathname;

     const cookieStore = await cookies();

     let accessToken = request.cookies.get("accessToken")?.value




}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: '/about/:path*',
}