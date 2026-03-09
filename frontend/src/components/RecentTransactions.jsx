import React from "react";
import { getRecentTransations } from "@/actions/transaction-actions";
import RecentTransactionsEmpty from "./RecentTransactionsEmpty";
import { RecentTransactionsNotEmpty } from "./RecentTransactionsNotEmpty";

const RecentTransactions = async () => {
  const res = await getRecentTransations();
  //   {
  //     created_at: "2026-03-07T20:47:49.155624Z",
  //     total_amount: "2.52",
  //     created_by: "test-1",
  //   },
  //   {
  //     created_at: "2026-03-07T18:23:11.000000Z",
  //     total_amount: "14.99",
  //     created_by: "alex-2",
  //   },
  //   {
  //     created_at: "2026-03-07T15:10:05.000000Z",
  //     total_amount: "340.00",
  //     created_by: "sarah-k",
  //   },
  //   {
  //     created_at: "2026-03-06T22:55:30.000000Z",
  //     total_amount: "7.80",
  //     created_by: "test-1",
  //   },
  //   {
  //     created_at: "2026-03-06T14:32:19.000000Z",
  //     total_amount: "99.99",
  //     created_by: "mike-j",
  //   },
  //   {
  //     created_at: "2026-03-05T09:14:02.000000Z",
  //     total_amount: "0.50",
  //     created_by: "alex-2",
  //   },
  //   {
  //     created_at: "2026-03-05T08:01:44.000000Z",
  //     total_amount: "250.00",
  //     created_by: "sarah-k",
  //   },
  //   {
  //     created_at: "2026-03-04T19:48:57.000000Z",
  //     total_amount: "18.75",
  //     created_by: "test-1",
  //   },
  //   {
  //     created_at: "2026-03-03T11:22:33.000000Z",
  //     total_amount: "5.00",
  //     created_by: "mike-j",
  //   },
  //   {
  //     created_at: "2026-03-02T07:59:11.000000Z",
  //     total_amount: "1200.00",
  //     created_by: "sarah-k",
  //   },
  // ];

  return (
    <div className="h-full w-full card pb-8  font-poppins overflow-hidden relative">
      <div className="flex h-full w-full flex-col pt-8 px-7 gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest text-textPrimary/30"
              style={{ letterSpacing: "0.15em" }}
            >
              Activity
            </p>
            <h1 className="text-lg font-semibold mt-0.5 text-textPrimary/90">
              Recent Transactions
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-outline" />

        {/* Empty state */}

        {res ? (
          <RecentTransactionsNotEmpty transactions={res.transactions} />
        ) : (
          <RecentTransactionsEmpty />
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
