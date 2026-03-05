import React from "react";
import { verifyAuth } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import AppInitializer from "./AppInitializer";

const SessionHandler = async ({ children }) => {
  const res = await verifyAuth();
  console.log(res.user);
  if (!res.isAuthenticated) {
    redirect("/login");
  }

  return <AppInitializer user={res.user}>{children}</AppInitializer>;
  // return <>{children}</>;
};

export default SessionHandler;
