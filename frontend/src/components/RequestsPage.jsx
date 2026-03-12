"use client";

import React, { useState } from "react";

import RequestRow from "./RequestRow";
import RequestDropdown from "./RequestDropdown";
import RequestsEmptyState from "./RequestsEmptyState";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

const STATUS_MAP = {
  PEN: {
    label: "Pending",
    color: "rgba(251,191,36,0.9)",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
  ACC: {
    label: "Accepted",
    color: "rgba(52,211,153,0.9)",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  REJ: {
    label: "Rejected",
    color: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
};

const FILTER_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PEN", label: "Pending" },
  { value: "ACC", label: "Accepted" },
  { value: "REJ", label: "Rejected" },
];

const RequestsPage = ({ requests = [] }) => {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on),
  );

  // count per status for the summary pills
  const counts = requests.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full flex flex-col gap-6 font-poppins">
      {/* ── Header card ── */}

      <div className="w-full flex justify-end">
        <Link href={"/requests/new-request"}>
          <div className="flex card p-2 items-center gap-2 hover:highlight text-textPrimary/60 text-xs md:text-sm">
            <TiPlus />
            <span>Request</span>
          </div>
        </Link>
      </div>

      <div className="card px-6 py-5 relative overflow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
              Overview
            </p>
            <h1 className="text-xl font-semibold text-textPrimary/90 mt-0.5">
              Requests
            </h1>
          </div>
          <RequestDropdown
            value={filter}
            options={FILTER_OPTIONS}
            onChange={setFilter}
          />
        </div>

        {/* Status summary */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {Object.entries(STATUS_MAP).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? "ALL" : key)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150"
              style={{
                color: meta.color,
                background: filter === key ? meta.bg : "rgba(255,255,255,0.03)",
                borderColor:
                  filter === key ? meta.border : "rgba(57,57,63,0.5)",
              }}
            >
              <span>{meta.label}</span>
              <span className="opacity-60">{counts[key] ?? 0}</span>
            </button>
          ))}
          <span className="text-xs text-textPrimary/60 ml-auto">
            {requests.length} total
          </span>
        </div>
      </div>

      {/* ── List ── */}
      <div className="card px-6 py-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/60">
            {filter === "ALL"
              ? "All Requests"
              : `${STATUS_MAP[filter]?.label} Requests`}
          </p>
          <span className="text-xs text-textPrimary/60">
            {sorted.length} shown
          </span>
        </div>

        <div className="w-full h-px bg-outline/50 mb-4" />

        {sorted.length === 0 ? (
          <RequestsEmptyState STATUS_MAP={STATUS_MAP} filter={filter} />
        ) : (
          <div className="flex flex-col gap-2">
            {sorted.map((request) => (
              <RequestRow
                STATUS_MAP={STATUS_MAP}
                key={request.request_id}
                request={request}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
