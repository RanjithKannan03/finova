// middleware.js
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function proxy(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // No tokens at all — redirect to login
  if (!accessToken && !refreshToken) {
    return redirectToLogin(request);
  }

  // Verify access token
  const meRes = await fetch(`${BACKEND_URL}/user/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });

  if (meRes.ok) {
    return NextResponse.next(); // ✅ all good
  }

  // Access token failed — try refresh
  if (meRes.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${BACKEND_URL}/user/refresh/`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (refreshRes.ok) {
      // ✅ Write new cookies onto the response
      const response = NextResponse.next();
      refreshRes.headers.getSetCookie().forEach((cookieString) => {
        const [nameValue, ...rest] = cookieString.split(";");
        const [name, value] = nameValue.split("=");
        response.cookies.set(name.trim(), value.trim(), {
          httpOnly: name.trim() !== "csrftoken",
          secure: process.env.ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      });
      return response;
    }
  }

  // Both failed — clear cookies and redirect
  return redirectToLogin(request);
}

function redirectToLogin(request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  return response;
}

export const config = {
  // matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: "/",
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/"],
};
