"use client";

import React, { useState } from "react";
import DropdownToggle from "./DropdownToggle";
import CreateFlatForm from "./CreateFlatForm";
import JoinFlatForm from "./JoinFlatForm";

const FlatForm = () => {
  const [form, setForm] = useState("Join Flat");
  return (
    <div className="w-full h-full flex-col flex items-center gap-10 md:gap-14">
      <div className="self-end w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] relative">
        <DropdownToggle form={form} setForm={setForm} />
      </div>
      {form == "Join Flat" ? <JoinFlatForm /> : <CreateFlatForm />}
    </div>
  );
};

export default FlatForm;
