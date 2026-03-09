import AddTransactionForm from "@/components/AddTransactionForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32 pt-5 md:pt-8 lg:pt-10 xl:pt-16">
      <AddTransactionForm />
    </div>
  );
};

export default page;
