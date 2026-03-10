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

export async function fetchTransactions({
  month,
  year,
  scope,
  userEmail,
  category,
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-${new Date(year, month, 0).getDate()}`;

  let url;
  if (category) {
    url =
      scope === "specific"
        ? `${BACKEND_URL}/transaction/user-transactions-by-category?email=${encodeURIComponent(userEmail)}&category=${category}&filterByDate=true&start_date=${start}&end_date=${end}`
        : `${BACKEND_URL}/transaction/flat-active-member-transactions-by-category/?category=${category}&filterByDate=true&start_date=${start}&end_date=${end}`;
  } else {
    url =
      scope === "specific"
        ? `${BACKEND_URL}/transaction/user-transactions/?email=${encodeURIComponent(userEmail)}&filterByDate=true&start_date=${start}&end_date=${end}`
        : `${BACKEND_URL}/transaction/flat-active-member-transactions/?filterByDate=true&start_date=${start}&end_date=${end}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (data) {
    return data;
  }
  return null;
}
