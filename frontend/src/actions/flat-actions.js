"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getFlatInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BACKEND_URL}/flat/getFlatInfo/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });

  if (res.status == 400) {
    return { flat: null };
  }
  const data = await res.json();
  return { flat: data.flat };
}

export async function createFlat(prevState, formData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const name = formData.get("flatName");
  const budget = Number(formData.get("budget") ?? 0);

  const payload = {
    flatName: name,
    budget: budget,
  };

  const res = await fetch(`${BACKEND_URL}/flat/createFlat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (res.status === 400) {
    return {
      error: data.error,
    };
  }
  return {
    success: true,
    flat: data.flat,
  };
  // return redirect("/");
}

export async function joinFlat(prevState, formData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const codes = [1, 2, 3, 4].map((i) => formData.get(`code-${i}`));
  const joinCode = codes.join("").toUpperCase();

  const payload = {
    code: joinCode,
  };

  const res = await fetch(`${BACKEND_URL}/flat/joinFlat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (res.status === 400) {
    return {
      error: data.error,
    };
  }
  return {
    success: true,
    flat: data.flat,
  };
}
