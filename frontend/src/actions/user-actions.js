"use server";

import { cookies } from "next/headers";
import { useuseUserStore } from "@/zustand/store";

const BACKEND_URL = process.env.BACKEND_URL;

export async function editProfilePic(prev, formData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const csrfToken = cookieStore.get("csrftoken")?.value;

  const res = await fetch(`${BACKEND_URL}/user/update-profile-pic/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken || "",
      Cookie: `access_token=${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    return { error: "Failed to update profile picture." };
  }

  const data = await res.json();
  return { success: true, profile_pic: data.profile_pic };
}
