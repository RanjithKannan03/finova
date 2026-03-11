import Image from "next/image";
import React from "react";
import Link from "next/link";

const RequestRow = ({ request, STATUS_MAP }) => {
  const status = STATUS_MAP[request.status] ?? STATUS_MAP.PEN;
  const d = new Date(request.created_on);

  return (
    <Link
      href={`/requests/${request.request_id}`}
      className="relative flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border overflow-hidden group hover:highlight transition-colors duration-150"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(57,57,63,0.7)",
      }}
    >
      {/* Avatar */}
      <div className="w-8 aspect-square relative rounded-lg bg-white/6 border border-outline flex items-center justify-center shrink-0">
        {/* <span className="text-[10px] md:text-xs font-bold text-textPrimary/50 uppercase">
          {request.created_by.username[0]}
        </span> */}
        <Image
          src={request.created_by.profile_pic}
          fill
          alt="avatar"
          className="object-contain rounded-lg"
          sizes="100"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-textPrimary/85 truncate">
          {request.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] md:text-xs text-textPrimary/30">
            @{request.created_by.username}
          </span>
          <span className="text-[10px] md:text-xs text-textPrimary/15">·</span>
          <span className="text-[10px] md:text-xs text-textPrimary/30">
            {d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Status pill */}
      <div
        className="shrink-0 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold border"
        style={{
          color: status.color,
          background: status.bg,
          borderColor: status.border,
          boxShadow: `0 0 8px ${status.bg}`,
        }}
      >
        {status.label}
      </div>
    </Link>
  );
};

export default RequestRow;
