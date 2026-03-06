"use client";

import React, { useEffect, useState } from "react";
import { userStore } from "@/zustand/store";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#profile-pic", {
      xPercent: 100,
      rotate: 360,
      ease: "power3.inOut",
      duration: 0.7,
      scale: 0.1,
      opacity: 0,
    });
  }, [user]);

  useEffect(() => {
    const u = userStore.getState().user;
    setUser(u);
  }, []);

  return (
    <div className="flex w-40 h-9 bg-foregorund border border-outline drop-shadow-2xl shadow-2xl rounded-full items-center justify-end px-2 relative">
      {user && (
        <div
          id="profile-pic"
          className="w-14 border border-outline aspect-square rounded-full absolute left-0 bg-gray-300"
        >
          <Image
            src={user.profilePic}
            fill
            className="object-fill border-4 border-outline rounded-full"
            alt="profile-pic"
          />
        </div>
      )}
      {user && (
        <p className="py-1 px-2 max-w-26 w-26 text-end font-poppins truncate">
          {user.username}
        </p>
      )}
    </div>
  );
};

export default UserInfo;
