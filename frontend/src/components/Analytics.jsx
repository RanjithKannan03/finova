"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Dropdown from "./Dropdown";
import { fetchBudgets } from "@/actions/budget-actions";
import { fetchTransactions } from "@/actions/transaction-actions";
import { flatStore } from "@/zustand/store";
import TransactionSkeleton from "./TransactionSkeleton";
import ChartSkeleton from "./ChartSkeleton";
import TransactionRow from "./TransactionRow";

const CATEGORIES = {
  GR: { label: "Groceries", color: "rgba(52,211,153,0.9)" },
  CS: { label: "Cleaning Supplies", color: "rgba(99,102,241,0.9)" },
  HE: { label: "Home Essentials", color: "rgba(251,191,36,0.9)" },
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl border border-outline bg-foreground font-poppins pointer-events-none">
      <p className="text-xs uppercase tracking-wider text-textPrimary/40 mb-1">
        {label}
      </p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: £{Number(p.value).toFixed(2)}
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  const today = new Date();

  const [dataType, setDataType] = useState("transactions");
  const [scope, setScope] = useState("combined");
  const [userEmail, setUserEmail] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const [budgetData, setBudgetData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [flatmates, setFlatmates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const flat = flatStore.getState().flat;
    if (flat?.flatmates) {
      setFlatmates(flat.flatmates);
      setUserEmail(flat.flatmates[0]?.email ?? null);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (dataType === "budgets") {
        const json = await fetchBudgets({ month, year });
        setBudgetData(json.budgets ?? []);
      } else if (viewMode === "category") {
        const results = await Promise.all(
          ["GR", "CS", "HE"].map((cat) =>
            fetchTransactions({ month, year, scope, userEmail, category: cat }),
          ),
        );
        const merged = results.flatMap((r) => r.transactions ?? []);
        const seen = new Set();
        setTransactionData(
          merged.filter((tx) => {
            if (seen.has(tx.transaction_id)) return false;
            seen.add(tx.transaction_id);
            return true;
          }),
        );
      } else {
        const json = await fetchTransactions({ month, year, scope, userEmail });
        setTransactionData(json.transactions ?? []);
      }
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [dataType, month, year, scope, userEmail, viewMode]);

  useEffect(() => {
    if (dataType === "transactions" && scope === "specific" && !userEmail)
      return;
    load();
  }, [load]);

  const activeTransactions =
    dataType === "budgets"
      ? (budgetData?.[0]?.transactions ?? [])
      : (transactionData ?? []);

  const sortedTransactions = [...activeTransactions].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const chartData = (() => {
    if (dataType === "budgets") {
      if (!budgetData?.length) return [];
      const b = budgetData[0];
      const catTotals = { GR: 0, CS: 0, HE: 0 };
      b.transactions.forEach((tx) =>
        tx.items.forEach((item) => {
          if (catTotals[item.category] !== undefined)
            catTotals[item.category] += parseFloat(item.price) * item.units;
        }),
      );
      return [
        ...Object.entries(catTotals).map(([cat, val]) => ({
          name: CATEGORIES[cat].label,
          Amount: parseFloat(val.toFixed(2)),
          color: CATEGORIES[cat].color,
        })),
        {
          name: "Unspent",
          Amount: parseFloat(b.unspent.toFixed(2)),
          color: "rgba(255,255,255,0.12)",
        },
      ];
    }

    if (viewMode === "category") {
      const totals = { GR: 0, CS: 0, HE: 0 };
      activeTransactions.forEach((tx) =>
        tx.items.forEach((item) => {
          if (totals[item.category] !== undefined)
            totals[item.category] += parseFloat(item.price) * item.units;
        }),
      );
      return Object.entries(totals).map(([cat, val]) => ({
        name: CATEGORIES[cat].label,
        Amount: parseFloat(val.toFixed(2)),
        color: CATEGORIES[cat].color,
      }));
    }

    const byDay = {};
    activeTransactions.forEach((tx) => {
      const d = new Date(tx.created_at);
      const key = `${d.getDate()} ${d.toLocaleString("en", { month: "short" })}`;
      byDay[key] = (byDay[key] || 0) + parseFloat(tx.total_amount);
    });
    return Object.entries(byDay)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([name, val]) => ({ name, Amount: parseFloat(val.toFixed(2)) }));
  })();

  const showBar = dataType === "budgets" || viewMode === "category";

  const isCurrentMonth =
    month === today.getMonth() + 1 && year === today.getFullYear();

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (isCurrentMonth) return;
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const monthLabel = new Date(year, month - 1).toLocaleString("en", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full flex flex-col gap-6 font-poppins pb-5">
      {/* ── Controls ── */}
      <div className="card px-5 py-4 flex flex-wrap items-center gap-3 relative">
        <Dropdown
          value={dataType}
          options={[
            { value: "transactions", label: "Transactions" },
            { value: "budgets", label: "Budgets" },
          ]}
          onChange={(v) => {
            setDataType(v);
            setScope("combined");
            setViewMode("all");
          }}
        />

        {dataType === "transactions" && (
          <Dropdown
            value={scope}
            options={[
              { value: "combined", label: "Combined" },
              { value: "specific", label: "Specific User" },
            ]}
            onChange={setScope}
          />
        )}

        {dataType === "transactions" && scope === "specific" && userEmail && (
          <Dropdown
            value={userEmail}
            options={flatmates.map((f) => ({
              value: f.email,
              label: `@${f.username}`,
            }))}
            onChange={setUserEmail}
          />
        )}

        {dataType === "transactions" && (
          <Dropdown
            value={viewMode}
            options={[
              { value: "all", label: "All" },
              { value: "category", label: "By Category" },
            ]}
            onChange={setViewMode}
          />
        )}

        <div className="flex-1" />

        {/* Month picker */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-outline
                       text-textPrimary/50 hover:bg-white/9 transition-all duration-150"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="text-xs font-medium text-textPrimary/60 min-w-25 text-center">
            {monthLabel}
          </span>
          <button
            onClick={nextMonth}
            disabled={isCurrentMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-outline
                       text-textPrimary/50 hover:bg-white/9 transition-all duration-150
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="card px-6 py-6 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
              {dataType === "budgets"
                ? "Breakdown"
                : viewMode === "category"
                  ? "By Category"
                  : "Over Time"}
            </p>
            <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
              {dataType === "budgets" ? "Budget Split" : "Spending"}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {loading && (
              <div className="w-3 h-3 rounded-full border border-textPrimary/20 border-t-textPrimary/60 animate-spin" />
            )}
            <span className="text-xs text-textPrimary/30">{monthLabel}</span>
          </div>
        </div>

        {/* Budget stat pills */}
        {dataType === "budgets" && budgetData?.[0] && !loading && (
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              {
                label: "Budget",
                value: `£${parseFloat(budgetData[0].amount).toFixed(2)}`,
                color: "text-textPrimary/70",
              },
              {
                label: "Spent",
                value: `£${budgetData[0].total_spent.toFixed(2)}`,
                color: "text-emerald-400/80",
              },
              {
                label: "Unspent",
                value: `£${budgetData[0].unspent.toFixed(2)}`,
                color: "text-indigo-400/80",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 px-3 py-2 rounded-xl bg-white/3 border border-outline/60"
              >
                <p className="text-xs uppercase tracking-wider text-textPrimary/30">
                  {label}
                </p>
                <p className={`text-sm font-semibold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-400/70 mb-4">{error}</p>}

        {loading ? (
          <ChartSkeleton />
        ) : (
          <div>
            <ResponsiveContainer width="100%" height={260}>
              {showBar ? (
                <BarChart
                  data={chartData}
                  barCategoryGap="35%"
                  margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,0.04)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 10,
                      fill: "rgba(255,255,255,0.3)",
                      fontFamily: "poppins",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "rgba(255,255,255,0.3)",
                      fontFamily: "poppins",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `£${v}`}
                    width={40}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    isAnimationActive={false}
                    wrapperStyle={{ transition: "none", outline: "none" }}
                  />
                  <Bar dataKey="Amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color || "rgba(99,102,241,0.85)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart
                  data={chartData}
                  margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
                >
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 10,
                      fill: "rgba(255,255,255,0.3)",
                      fontFamily: "poppins",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "rgba(255,255,255,0.3)",
                      fontFamily: "poppins",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `£${v}`}
                    width={40}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    isAnimationActive={false}
                    wrapperStyle={{ transition: "none", outline: "none" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Amount"
                    stroke="rgba(52,211,153,0.9)"
                    strokeWidth={2}
                    dot={{ fill: "rgba(52,211,153,0.9)", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ── Transaction list ── */}
      <div className="card px-6 py-6 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
              History
            </p>
            <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
              Transactions
            </h2>
          </div>
          <span className="text-xs text-textPrimary/30 mt-1">
            {sortedTransactions.length} total
          </span>
        </div>

        <div className="w-full h-px bg-outline/50 mb-4" />

        {loading ? (
          <TransactionSkeleton />
        ) : sortedTransactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <div className="w-10 h-10 rounded-xl bg-white/4 border border-outline flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              >
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <p className="text-xs text-textPrimary/40">
              No transactions for this period
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedTransactions.map((tx) => (
              <TransactionRow key={tx.transaction_id} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
