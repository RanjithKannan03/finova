import React from "react";

const ActionButton = ({
  label,
  onClick,
  color,
  bg,
  border,
  icon,
  disabled,
}) => (
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

export default ActionButton;
