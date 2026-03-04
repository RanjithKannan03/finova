import LoginForm from "@/components/LoginForm";
import React from "react";

const page = async () => {
  // const result = await verifyAuth();
  // if (result.user) {
  //     redirect('/');
  // }
  return (
    <div className="flex items-center justify-center w-screen h-screen px-4 py-10 md:px-8 lg:px-20 xl:px-48">
      <LoginForm />
    </div>
  );
};

export default page;
