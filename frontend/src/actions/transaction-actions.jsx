"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getRecentTransations() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BACKEND_URL}/transaction/recent-transactions/`, {
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
  return data;
}
