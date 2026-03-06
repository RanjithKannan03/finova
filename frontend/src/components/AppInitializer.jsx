"use client";

import React, { useEffect, useState } from "react";
import { userStore, flatStore } from "@/zustand/store";

const AppInitializer = ({ user, flat, children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    userStore.getState().loginUser(user);
    flatStore.getState().setFlat(flat);
    setReady(true);
  }, [user, flat]);

  if (!ready) return null;

  return <>{children}</>;
};

export default AppInitializer;
