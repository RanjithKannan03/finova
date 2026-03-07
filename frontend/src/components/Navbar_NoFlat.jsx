import React from "react";
import UserInfo from "./UserInfo";
import { logout } from "@/actions/auth-actions";

const Navbar_NoFlat = () => {
  return (
    <nav className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32">
      <div className="flex w-full justify-end items-end h-full text-textPrimary">
        <div className="flex py-3 gap-10 items-center">
          <UserInfo />

          <button
            onClick={logout}
            className="cursor-pointer px-4 py-2 border border-outline bg-foreground rounded-full hover:highlight transition-all"
          >
            <p>Logout</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_NoFlat;
