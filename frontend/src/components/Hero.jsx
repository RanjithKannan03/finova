import React from "react";
// import { useFlatStore } from "@/zustand/store";
// import { redirect } from "next/navigation";
import RecentTransactions from "./RecentTransactions";
import FlatInfoCard from "./FlatInfoCard";
import BudgetOverviewCard from "./BudgetOverviewcard";
import BudgetDonut from "./BudgetDonut";
import RecentRequests from "./RecentRequests";

const Hero = () => {
  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-full pb-10 items-center gap-5">
      <div className="h-full w-1/3 hidden xl:flex">
        <RecentTransactions />
      </div>
      <div className="xl:w-1/3 w-full xl:h-full flex flex-col md:flex-row xl:flex-col gap-5">
        <FlatInfoCard />
        <BudgetOverviewCard />
      </div>
      <div className="xl:w-1/3 w-full xl:h-full flex flex-col md:flex-row xl:flex-col gap-5">
        <BudgetDonut />
        <RecentRequests />
      </div>
      <div className="w-full xl:hidden">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Hero;
