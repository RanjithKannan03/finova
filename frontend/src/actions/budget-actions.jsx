"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getCurrentMonthBudget() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(
    `${BACKEND_URL}/budgets/list-budgets/?filterBydate=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `access_token=${accessToken}`,
      },
      // cache: "no-store",
      next: { revalidate: 900 },
    },
  );

  const data = await res.json();
  return data.budgets[0];
}

export async function fetchBudgets({ month, year }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const start = `${year}-${String(month)}`;
  const end = `${year}-${String(month)}`;

  const res = await fetch(
    `${BACKEND_URL}/budgets/list-budgets/?filterByDate=true&start_date=${start}&end_date=${end}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `access_token=${accessToken}`,
      },
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data;
}
