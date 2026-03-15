"use client";

import React from "react";
import { useBear } from "@/zustand/store";

const Bear = () => {
  const bears = useBear((state) => state.bears);
  const increasePopulation = useBear((state) => state.increasePopulation);
  return (
    <>
      <h1>{bears} bears around here...</h1>
      <button onClick={increasePopulation}>one up</button>
    </>
  );
};

export default Bear;
