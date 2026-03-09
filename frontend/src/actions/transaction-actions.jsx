"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    // cache: "no-store",
    next: { revalidate: 900 },
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

export async function createTransaction(prevState, formData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const items = [];
  let i = 0;
  while (formData.get(`items[${i}][name]`)) {
    items.push({
      category: formData.get(`items[${i}][category]`),
      name: formData.get(`items[${i}][name]`),
      price: parseFloat(formData.get(`items[${i}][price]`)),
      units: parseInt(formData.get(`items[${i}][units]`)),
    });
    i++;
  }

  const payload = {
    items: items,
  };

  const res = await fetch(`${BACKEND_URL}/transaction/create-transaction/`, {
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

  revalidatePath("/");

  return redirect("/");
}
