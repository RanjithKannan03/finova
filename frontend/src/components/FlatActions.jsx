"use client";

import React, { useState, useEffect } from "react";
import NoFlat from "./NoFlat";
import { flatStore } from "@/zustand/store";
import { redirect } from "next/navigation";

const FlatActions = () => {
  useEffect(() => {
    const f = flatStore.getState().flat;
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
