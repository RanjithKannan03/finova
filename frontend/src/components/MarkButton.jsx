import React from "react";
import { markRequest } from "@/actions/request-actions";

const MarkButton = ({ label, id, color, bg, border, icon, disabled }) => {
  async function onClick() {
    await markRequest(id);
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center cursor-pointer justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium
               transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border"
      style={{ color, background: bg, borderColor: border }}
    >
      {icon}
      {label}
    </button>
  );
};

export default MarkButton;
