import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';
import { JwtPayload } from 'jsonwebtoken';


const AUTH_ROUTES = ["/login","/register"]
const PUBLIC_ROUTES = ["/","/properties","/contact","/privacy-policy","/terms_and_conditions"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
     
     const pathname = request.nextUrl.pathname;

     const cookieStore = await cookies();

     let accessToken = request.cookies.get("accessToken")?.value;
     const refreshToken = request.cookies.get("refreshToken")?.value;

     let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null
     const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null


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
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        }else if(userRole === "LANDLORD"){
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
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


    // Keep users on the dashboard that matches their role if they follow a stale link.
    const roleDashboards: Record<string, string> = {
        TENANT: "/dashboard/tenant",
        ADMIN: "/dashboard/admin",
        LANDLORD: "/dashboard/landlord",
    };
    const requestedDashboard = Object.keys(roleDashboards).find((role) => {
        const dashboardPath = roleDashboards[role];
        return pathname === dashboardPath || pathname.startsWith(`${dashboardPath}/`);
    });

    if (requestedDashboard && userRole !== requestedDashboard) {
        const destination =
            typeof userRole === "string" ? roleDashboards[userRole] : undefined;
        return NextResponse.redirect(
            new URL(destination ?? "/not-found", request.url)
        );
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico|_next/image|\\.well-known|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico)$).*)',
  ]
}