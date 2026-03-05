import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { verifyAuth } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

const page = async () => {
  const result = await verifyAuth();
  if (result.isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-10 md:px-8 lg:px-20 xl:px-48">
      <RegisterForm />
    </div>
  );
};

export default page;
