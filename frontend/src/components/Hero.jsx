import React, { Suspense } from "react";
import RecentTransactions from "./RecentTransactions";
import FlatInfoCard from "./FlatInfoCard";
import BudgetOverviewCard from "./BudgetOverviewcard";
import BudgetDonut from "./BudgetDonut";
import RecentRequests from "./RecentRequests";
import FlatInfoCardSkeleton from "./FlatInfoCardSkeleton";
import SkeletonBlock from "./SkeletonBlock";

const TransactionsSkeleton = () => (
  <div className="relative w-full card font-poppins px-6 py-6 flex flex-col gap-4 h-full">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-2.5 w-14" />
        <SkeletonBlock className="h-5 w-36" />
      </div>
    </div>
    <div className="w-full h-px bg-outline/50" />
    <div className="flex flex-col gap-2 flex-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 py-2 rounded-xl border"
          style={{ borderColor: "rgba(57,57,63,0.4)" }}
        >
          <SkeletonBlock className="w-6 h-6 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <SkeletonBlock className="h-2.5 w-20" />
            <SkeletonBlock className="h-2 w-14" />
          </div>
          <SkeletonBlock className="h-3 w-10" />
        </div>
      ))}
    </div>
  </div>
);

const BudgetOverviewSkeleton = () => (
  <div
    className="relative w-full card font-poppins px-6 py-6 flex flex-col gap-4"
    style={{ height: "33vh" }}
  >
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-2.5 w-14" />
        <SkeletonBlock className="h-5 w-28" />
      </div>
      <SkeletonBlock className="h-7 w-24 rounded-xl" />
    </div>
    <div className="w-full h-px bg-outline/50" />
    <div className="flex flex-col flex-1 justify-between">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <SkeletonBlock className="h-2.5 w-24" />
            <SkeletonBlock className="h-2.5 w-10" />
          </div>
          <SkeletonBlock className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const DonutSkeleton = () => (
  <div className="relative w-full card font-poppins px-6 py-6 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-2.5 w-16" />
        <SkeletonBlock className="h-5 w-28" />
      </div>
      <SkeletonBlock className="h-7 w-24 rounded-xl" />
    </div>
    <div className="w-full h-px bg-outline/50" />
    <div
      className="flex items-center justify-center"
      style={{ height: "180px" }}
    >
      <div className="w-36 h-36 rounded-full border-18 border-white/5 animate-pulse" />
    </div>
    <div className="w-full h-px bg-outline/50" />
    <div className="flex flex-col gap-2.5">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SkeletonBlock className="w-3 h-3 rounded-sm" />
            <SkeletonBlock className="h-2.5 w-28" />
          </div>
          <SkeletonBlock className="h-2.5 w-12" />
        </div>
      ))}
    </div>
  </div>
);

const RequestsSkeleton = () => (
  <div className="relative w-full card font-poppins px-6 py-6 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-2.5 w-16" />
        <SkeletonBlock className="h-5 w-24" />
      </div>
      <SkeletonBlock className="h-7 w-16 rounded-xl" />
    </div>
    <div className="w-full h-px bg-outline/50" />
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 py-2 rounded-xl border"
          style={{ borderColor: "rgba(57,57,63,0.4)" }}
        >
          <SkeletonBlock className="w-6 h-6 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <SkeletonBlock className="h-2.5 w-28" />
            <SkeletonBlock className="h-2 w-16" />
          </div>
          <SkeletonBlock className="h-5 w-14 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-full pb-10 items-center gap-5">
      {/* Col 1 — Recent Transactions (desktop only) */}
      <div className="h-full w-1/3 hidden xl:flex">
        <Suspense fallback={<TransactionsSkeleton />}>
          <RecentTransactions />
        </Suspense>
      </div>

      {/* Col 2 — Flat Info + Budget Overview */}
      <div className="xl:w-1/3 w-full xl:h-full flex flex-col md:flex-row xl:flex-col gap-5">
        <Suspense fallback={<FlatInfoCardSkeleton />}>
          <FlatInfoCard />
        </Suspense>
        <Suspense fallback={<BudgetOverviewSkeleton />}>
          <BudgetOverviewCard />
        </Suspense>
      </div>

      {/* Col 3 — Donut + Requests */}
      <div className="xl:w-1/3 w-full xl:h-full flex flex-col md:flex-row xl:flex-col gap-5">
        <Suspense fallback={<DonutSkeleton />}>
          <BudgetDonut />
        </Suspense>
        <Suspense fallback={<RequestsSkeleton />}>
          <RecentRequests />
        </Suspense>
      </div>

      {/* Recent Transactions (mobile) */}
      <div className="w-full xl:hidden">
        <Suspense fallback={<TransactionsSkeleton />}>
          <RecentTransactions />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
