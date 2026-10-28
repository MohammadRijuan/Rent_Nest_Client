import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';
import { JwtPayload } from 'jsonwebtoken';


const AUTH_ROUTES = ["/login","/register"]
const PUBLIC_ROUTES = ["/","/contact","/privacy-policy","/terms_and_conditions"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
     
     const pathname = request.nextUrl.pathname;

     const cookieStore = await cookies();

     let accessToken = request.cookies.get("accessToken")?.value;
     let refreshToken = request.cookies.get("refreshToken")?.value;

     let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
     let decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_ACCESS_SECRET as string) : null


     if(!decodedAccessToken?.success && decodedRefreshToken?.success){

        const result = await getNewAccessToken();

        if(result.success){
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly : true,
                maxAge: 60 * 60 *24,
                sameSite :"lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string)


        }
     }

     let userRole = null;

     if(!decodedAccessToken?.success){
        // token has expired or is invalid
        cookieStore.delete("accessToken");

     }

     if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role
     }

     //user is logged in and trying to access login or register page, redirect to dashboard or root home page
    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === "TENANT"){
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }else if(userRole === "LANDLORD"){
            return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        }else{
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));


    // Authenticated Pages Protection : Authorization is not handled yet
    if(!accessToken && !isPublicRoute && !isAuthRoute){
        const loginUrl = new URL('/login', request.url)

        loginUrl.searchParams.set("redirectTo", pathname)

        return NextResponse.redirect(loginUrl);
    }


    // Authorization : Role based access control
    if(pathname.startsWith("/dashboard") && userRole !== "USER"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }





}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
         '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
  ]
}