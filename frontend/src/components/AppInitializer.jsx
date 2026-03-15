"use client";

import React, { useEffect, useState } from "react";
import { useUserStore, useFlatStore } from "@/zustand/store";
import { useRouter, usePathname } from "next/navigation";

const AppInitializer = ({ user, flat, children }) => {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const path = usePathname();

  // const loginUser = useUserStore((state) => state.loginUser);
  // const setFlat = useFlatStore((state) => state.setFlat);

  // loginUser(user);
  // setFlat(flat);

  useEffect(() => {
    useUserStore.getState().loginUser(user);
    useFlatStore.getState().setFlat(flat);

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
