import React from "react";
import { verifyAuth } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

const SessionHandler = async ({ children }) => {
  const res = await verifyAuth();
  //   console.log(res);
  if (!res.isAuthenticated) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default SessionHandler;
