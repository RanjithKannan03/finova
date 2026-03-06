"use client";

import React, { useEffect, useState } from "react";
import { flatStore } from "@/zustand/store";
import { redirect } from "next/navigation";

const Hero = () => {
  //   const flat = flatStore((state) => state.flat);

  const [flat, setFlat] = useState(null);

  useEffect(() => {
    const f = flatStore.getState().flat;
    if (!f) {
      redirect("/flat-action");
    }
    setFlat(f);
  }, []);
  return <div className="w-full h-fll">{flat && flat.name}</div>;
};

export default Hero;
