import { getRecentRequests } from "@/actions/request-actions";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

const RecentRequests = async () => {
  const requests = await getRecentRequests();
  const STATUS_MAP = {
    PEN: {
      label: "Pending",
      color: "rgba(251,191,36,0.9)",
      bg: "rgba(251,191,36,0.08)",
    },
    ACC: {
      label: "Accepted",
      color: "rgba(52,211,153,0.9)",
      bg: "rgba(52,211,153,0.08)",
    },
    REJ: {
      label: "Rejected",
      color: "rgba(239,68,68,0.9)",
      bg: "rgba(239,68,68,0.08)",
    },
  };

  //     {
  //       request_id: "1",
  //       created_by: { username: "test-1" },
  //       created_on: "2026-03-09T13:02:58Z",
  //       name: "Test Request 1",
  //       status: "PEN",
  //     },
  //     {
  //       request_id: "2",
  //       created_by: { username: "alex-2" },
  //       created_on: "2026-03-08T10:00:00Z",
  //       name: "Grocery Run",
  //       status: "ACC",
  //     },
  //     {
  //       request_id: "3",
  //       created_by: { username: "sarah-k" },
  //       created_on: "2026-03-07T08:30:00Z",
  //       name: "Cleaning Stuff",
  //       status: "REJ",
  //     },
  //     {
  //       request_id: "4",
  //       created_by: { username: "mike-j" },
  //       created_on: "2026-03-06T15:45:00Z",
  //       name: "New Mop",
  //       status: "PEN",
  //     },
  //     {
  //       request_id: "5",
  //       created_by: { username: "test-1" },
  //       created_on: "2026-03-05T09:00:00Z",
  //       name: "Dish Soap x3",
  //       status: "ACC",
  //     },
  //   ];

  const visible = requests.slice(0, 5);
  const slots = Array.from({ length: 5 });
  return (
    <div className="relative w-full md:w-1/2 xl:w-full card font-poppins px-6 py-6 flex flex-col gap-4 flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
            Overview
          </p>
          <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
            Requests
          </h2>
        </div>
      </div>

      <div className="w-full h-px bg-outline/50" />

      {/* Rows */}
      <div className="flex flex-col flex-1 justify-between gap-1.5">
        {slots.map((_, i) => {
          const req = visible[i];
          if (!req)
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  borderColor: "rgba(57,57,63,0.3)",
                }}
              >
                <div className="w-6 h-6 rounded-lg border border-dashed border-outline/40 flex items-center justify-center shrink-0">
                  <TiPlus className="text-textPrimary/30 text-xs" />
                </div>
                <span className="text-xs text-textPrimary/30">Empty slot</span>
              </div>
            );

          const status = STATUS_MAP[req.status] || STATUS_MAP.PEN;
          const d = new Date(req.created_on);

          return (
            <Link
              href={`/requests/${req.request_id}`}
              key={req.request_id}
              className="relative cursor-pointer flex items-center gap-3 px-3 py-2 rounded-xl overflow-hidden border group transition-colors duration-150"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(57,57,63,0.8)",
              }}
            >
              {/* Avatar */}
              <div className="w-6 aspect-square relative rounded-lg bg-white/[0.07] border border-outline flex items-center justify-center shrink-0">
                {/* <span className="text-[10px] font-semibold text-textPrimary/60 uppercase">
                  {req.created_by.username[0]}
                </span> */}
                <Image
                  src={req.created_by.profile_pic}
                  fill
                  className="object-contain rounded-lg"
                  sizes="100"
                  alt="avatar"
                />
              </div>

              {/* Name + user */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-textPrimary/80 truncate">
                  {req.name}
                </span>
                <span className="text-xs text-textPrimary/60 truncate">
                  @{req.created_by.username}
                </span>
              </div>

              {/* Status pill */}
              <div
                className="shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-semibold"
                style={{
                  color: status.color,
                  background: status.bg,
                  borderColor: status.color.replace("0.9", "0.2"),
                  boxShadow: `0 0 6px ${status.color.replace("0.9", "0.15")}`,
                }}
              >
                {status.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentRequests;
