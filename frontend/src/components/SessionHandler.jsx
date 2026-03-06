import React from "react";
import { verifyAuth } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import AppInitializer from "./AppInitializer";
import { getFlatInfo } from "@/actions/flat-actions";

const SessionHandler = async ({ children }) => {
  let res = await verifyAuth();
  if (!res.isAuthenticated) {
    redirect("/login");
  }

  const response = await getFlatInfo();

  return (
    <AppInitializer user={res.user} flat={response.flat}>
      {children}
    </AppInitializer>
  );
  // return <>{children}</>;
};

export default SessionHandler;
