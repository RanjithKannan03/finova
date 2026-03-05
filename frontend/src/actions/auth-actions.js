"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
      error: "Email and password fields cannot be empty.",
    };
  }
  if (!password || password.trim().length === 0) {
    return {
      error: "Email and password fields cannot be empty.",
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

// export async function verifyAuth() {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("access_token");
//   const refreshToken = cookieStore.get("refresh_token");

//   const csrfToken = cookieStore.get("csrftoken")?.value;

//   let res = await fetch(`${BACKEND_URL}/user/me/`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken.value}`,
//       Cookie: `access_token=${accessToken.value}; csrftoken=${csrfToken}`,
//       "X-CSRFToken": csrfToken,
//     },
//     cache: "no-store",
//   });

//   if (res.status === 200) {
//     let data = await res.json();
//     return { isAuthenticated: data.isAuthenticated, user: data.user };
//   }

//   if (res.status === 401 && accessToken) {
//     let res = await fetch(`${BACKEND_URL}/user/refresh/`, {
//       method: "POST",
//       headers: {
//         Cookie: `refresh_token=${refreshToken.value}`,
//         "X-CSRFToken": csrfToken,
//       },
//     });

//     if (res.status === 200) {
//       setAuthCookies(res.headers);
//       const newAccessToken = (await cookies()).get("access_token")?.value;
//       const retryResponse = await fetch(`${BACKEND_URL}/me/`, {
//         headers: { Authorization: `Bearer ${newAccessToken}` },
//       });
//       if (retryResponse.status === 200) {
//         let data = await retryResponse.json();
//         return { isAuthenticated: data.isAuthenticated, user: data.user };
//       }
//     }
//   }

//   return { isAuthenticated: false, user: null };
// }

export async function verifyAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BACKEND_URL}/user/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    return { isAuthenticated: data.isAuthenticated, user: data.user };
  }

  return { isAuthenticated: false, user: null };
}

export async function register(prevState, formData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");

  if (!email || email.trim().length === 0) {
    return {
      error: "Email field cannot be empty.",
    };
  }
  if (!password || password.trim().length === 0) {
    return {
      error: "Password field cannot be empty.",
    };
  }
  if (!isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password != formData.get("confirmPassword")) {
    return {
      error: "The passwords you entered do not match. Please try again.",
    };
  }

  if (!username || username.trim().length === 0) {
    return {
      error: "Username field cannot be empty.",
    };
  }
  if (!firstName || firstName.trim().length === 0) {
    return {
      error: "First name field cannot be empty.",
    };
  }

  if (!lastName || lastName.trim().length === 0) {
    return {
      error: "Last name field cannot be empty.",
    };
  }

  const payload = {
    email: email,
    password: password,
    username: username,
    firstName: firstName,
    lastName: lastName,
  };
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const res = await fetch(`${BACKEND_URL}/user/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
      Cookie: `csrftoken=${csrfToken || ""}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 400) {
    data = await res.json();
    return { error: data.error };
  } else {
    await syncCookies(res.headers);
    return redirect("/");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("csrftoken")?.value;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const res = await fetch(`${BACKEND_URL}/user/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
      Cookie: `csrftoken=${csrfToken || ""}; access_token=${accessToken || ""}; refresh_token=${refreshToken || ""}`,
      Authorization: `Bearer ${accessToken || ""}`,
    },
    body: JSON.stringify(payload),
  });

  await clearAuthCookies();
  return redirect("/");
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function setAuthCookies(headers) {
  "use server";
  await syncCookies(headers);
}
