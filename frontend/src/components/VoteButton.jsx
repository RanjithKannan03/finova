import React from "react";

import { castVote } from "@/actions/request-actions";

const VoteButton = ({
  label,
  color,
  bg,
  border,
  icon,
  choice,
  disabled,
  id,
}) => {
  async function onClick() {
    await castVote(id, choice);
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex items-center cursor-pointer justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium
               transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border"
      style={{ color, background: bg, borderColor: border }}
    >
      {icon}
      {label}
    </button>
  );
};

export default VoteButton;
