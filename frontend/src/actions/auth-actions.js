"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

async function syncCookies(headers) {
  const cookieStore = await cookies();
  const setCookieHeaders = headers.getSetCookie();

  setCookieHeaders.forEach((cookieString) => {
    const [nameValue, ...rest] = cookieString.split(";");
    const eqIndex = nameValue.indexOf("="); // ✅ find first = only
    const name = nameValue.substring(0, eqIndex).trim();
    const value = nameValue.substring(eqIndex + 1).trim(); // ✅ everything after first =

    cookieStore.set(name, value, {
      httpOnly: name !== "csrftoken",
      secure: process.env.ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  });
}

export async function login(prevState, formData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || email.trim().length === 0) {
    return {
      error:
        "Email and password fields cannot be empty. Please enter your credentials.",
    };
  }
  if (!password || password.trim().length === 0) {
    return {
      error:
        "Email and password fields cannot be empty. Please enter your credentials.",
    };
  }

  const payload = {
    email: email,
    password: password,
  };

  const csrfToken = cookieStore.get("csrftoken")?.value;

  const res = await fetch(`${BACKEND_URL}/user/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
      Cookie: `csrftoken=${csrfToken || ""}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (res.status === 400) {
    return {
      error: data.error || "Login Failed",
    };
  } else {
    await syncCookies(res.headers);
    return redirect("/");
  }
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const refreshToken = cookieStore.get("refresh_token");

  const csrfToken = cookieStore.get("csrftoken")?.value;

  let res = await fetch(`${BACKEND_URL}/user/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      Cookie: `access_token=${accessToken.value}; csrftoken=${csrfToken}`,
      "X-CSRFToken": csrfToken,
    },
    cache: "no-store",
  });

  if (res.status === 200) {
    let data = await res.json();
    return { isAuthenticated: data.isAuthenticated, user: data.user };
  }

  if (res.status === 401 && accessToken) {
    let res = await fetch(`${BACKEND_URL}/user/refresh/`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken.value}`,
        "X-CSRFToken": csrfToken,
      },
    });

    if (res.status === 200) {
      await syncCookies(res.headers);
      const newAccessToken = (await cookies()).get("access_token")?.value;
      const retryResponse = await fetch(`${API_URL}/me/`, {
        headers: { Authorization: `Bearer ${newAccessToken}` },
      });
      if (retryResponse.status === 200) {
        let data = await retryResponse.json();
        return { isAuthenticated: data.isAuthenticated, user: data.user };
      }
    }
  }

  return { isAuthenticated: false, user: null };
}

export async function clearAuthCookies() {
  "use server"; // explicit, just to be safe
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
