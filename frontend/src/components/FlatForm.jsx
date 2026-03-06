"use client";

import React, { useState } from "react";
import DropdownToggle from "./DropdownToggle";
import CreateFlatForm from "./CreateFlatForm";
import JoinFlatForm from "./JoinFlatForm";

const FlatForm = () => {
  const [form, setForm] = useState("Join Flat");
  return (
    <div className="w-full h-full flex-col flex items-center gap-14">
      <div className="self-end w-[30%] relative">
        <DropdownToggle form={form} setForm={setForm} />
      </div>
      {form == "Join Flat" ? <JoinFlatForm /> : <CreateFlatForm />}
    </div>
  );
};

export default FlatForm;
