"use client";

import React, { useEffect } from "react";
import { userStore } from "@/zustand/store";

const AppInitializer = ({ user, children }) => {
  useEffect(() => {
    userStore.getState().loginUser(user);
  }, [user]);

  return <>{children}</>;
};

export default AppInitializer;
