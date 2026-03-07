"use client";

import React, { useEffect, useState } from "react";
import { userStore, flatStore } from "@/zustand/store";
import { useRouter, usePathname } from "next/navigation";

const AppInitializer = ({ user, flat, children }) => {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    userStore.getState().loginUser(user);
    flatStore.getState().setFlat(flat);

    if (!flat && path !== "/flat-action") {
      router.replace("/flat-action");
      return;
    }

    setReady(true);
  }, [user, flat, path, router]);

  if (!ready) return null;

  return <>{children}</>;
};

export default AppInitializer;
