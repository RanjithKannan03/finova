"use client";

import React, { useState, useEffect } from "react";
import NoFlat from "./NoFlat";
import { useFlatStore } from "@/zustand/store";
import { redirect } from "next/navigation";

const FlatActions = () => {
  useEffect(() => {
    const f = useFlatStore.getState().flat;
    if (f) {
      redirect("/");
    }
  }, []);
  return (
    <div className="w-full h-full">
      <NoFlat />
    </div>
  );
};

export default FlatActions;
