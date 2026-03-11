"use server";

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
