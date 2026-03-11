"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getRecentRequests() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BACKEND_URL}/requests/list-recent/?filter=false`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    // cache: "no-store",
    next: { revalidate: 900 },
  });

  if (res.status === 404) {
    return null;
  }
  const data = await res.json();
  if (data) {
    return data.requests;
  }
  return null;
}

export async function getRequests() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BACKEND_URL}/requests/list/?filter=false`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    // cache: "no-store",
    next: { revalidate: 900 },
  });
  if (res.status === 404) {
    return null;
  }
  const data = await res.json();
  if (data) {
    return data.requests;
  }
  return null;
}

export async function getRequest(id) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BACKEND_URL}/requests/get/?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });
  if (res.status === 404) {
    return null;
  }
  const data = await res.json();
  if (data) {
    return data;
  }
  return null;
}

export async function castVote(id, choice) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const payload = {
    id: id,
    choice: choice.toUpperCase(),
  };

  const res = await fetch(`${BACKEND_URL}/requests/cast/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 404) {
    redirect("/");
  }
  revalidatePath(`/requests/${id}`);
}

export async function markRequest(id) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const payload = {
    id: id,
  };

  const res = await fetch(`${BACKEND_URL}/requests/mark/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 404) {
    redirect("/");
  }
  revalidatePath(`/requests/${id}`);
  revalidatePath("/");
  revalidatePath("/requests");
}
