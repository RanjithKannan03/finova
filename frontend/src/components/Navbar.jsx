import React from "react";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import { logout } from "@/actions/auth-actions";
import { IoMdLogOut } from "react-icons/io";
import NavbarMobile from "./NavbarMobile";

const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "New Expense",
    url: "/add",
  },
  {
    name: "Analytics",
    url: "/analytics",
  },
  {
    name: "Requests",
    url: "/requests",
  },
];

const Navbar = () => {
  return (
    <nav className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32">
      <div className="flex w-full justify-between items-center xl:items-end h-full text-textPrimary">
        <NavLinks navLinks={navLinks} />
        <NavbarMobile navLinks={navLinks} />

        <div className="flex py-3 gap-2 lg:gap-10 items-center">
          <UserInfo />

          <button
            onClick={logout}
            className="cursor-pointer p-2 lg:px-4 lg:py-2 border border-outline bg-foreground rounded-full hover:highlight transition-all"
          >
            <p className="hidden xl:flex">Logout</p>
            <IoMdLogOut className="text-2xl xl:hidden" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
