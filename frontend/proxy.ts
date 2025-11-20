import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { STRAPI_BASE_URL } from "./lib/strapi";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "/signup"];

export async function proxy(request: NextRequest) {
  const jwt = await getAuthenticatedUser();

  // Redirect authenticated users away from auth pages
  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (jwt) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check if the request is for a protected route
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // Check if the user is authenticated
    if (!jwt) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    const userResponse = await response.json();
    if (!response.ok || !userResponse) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

const getAuthenticatedUser = async () => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("strapi-jwt")?.value;
    return jwt;
  } catch (error) {
    console.error("User authentication check failed", error);
    return null;
  }
};

//Proxy configuration - used for both protected routes and auth routes
export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
