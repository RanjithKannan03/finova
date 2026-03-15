"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { editProfilePic } from "@/actions/user-actions";
import { useUserStore } from "@/zustand/store";
import { LuUpload } from "react-icons/lu";

const ProfilePicForm_v2 = () => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const updateProfilePicStore = useUserStore((state) => state.updateProfilePic);

  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await editProfilePic(prev, formData);

      if (res?.success) {
        updateProfilePicStore(res.profile_pic);
      }

      return res;
    },
    { error: null },
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="relative card px-6 py-7 flex flex-col gap-5 overflow-hidden font-poppins">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/60">
          Profile
        </p>
        <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
          Update Picture
        </h2>
      </div>

      <div className="w-full h-px bg-outline/50" />

      <form action={formAction} className="flex flex-col items-center gap-6">
        {/* Avatar Upload */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative group shrink-0 cursor-pointer"
        >
          <div className="w-28 h-28 rounded-full border-2 border-outline overflow-hidden bg-white/4 flex items-center justify-center transition-all duration-150 group-hover:border-white/30">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <LuUpload className="text-2xl" />
          </div>
        </button>

        {/* Hint text */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-xs text-textPrimary/60">
            Click to {preview ? "change" : "upload"} photo
          </p>
          <p className="text-xs text-textPrimary/60">
            Best results with a 1:1 ratio (square image)
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          name="profile_pic"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Optional messages */}
        {state?.error && (
          <p className="text-xs text-red-400/80">{state.error}</p>
        )}

        {state?.success && (
          <p className="text-xs text-emerald-400/80">
            Profile picture updated.
          </p>
        )}

        <div className="w-full">
          <SubmitButton
            isPending={isPending}
            text="Save Picture"
            disabled={!preview}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePicForm_v2;
