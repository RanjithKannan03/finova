"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { editProfilePic } from "@/actions/user-actions";
import { useuseUserStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const ProfilePicForm = () => {
  const [preview, setPreview] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const updateProfilePicStore = useuseUserStore(
    (state) => state.updateProfilePic,
  );

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(formRef.current);
    const res = await editProfilePic(null, formData);

    if (res?.success) {
      updateProfilePicStore(res.profile_pic);
    } else {
      setError(res?.error ?? "Something went wrong.");
    }

    setPending(false);
  }

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

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-6"
      >
        {/* Preview / Upload trigger */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative group shrink-0 cursor-pointer"
        >
          {/* Avatar */}
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

          {/* Overlay on hover */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
        </button>

        {/* Hint */}
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

        {/* {state.error && (
          <p className="text-xs text-red-400/80">{state.error}</p>
        )}

        {state.success && (
          <p className="text-xs text-emerald-400/80">
            Profile picture updated.
          </p>
        )} */}

        <div className="w-full">
          <div className="w-full p-3 text-white cursor-pointer text-xl transition-all card hover:highlight border-white/40 rounded-md shadow-2xl drop-shadow-2xl">
            {pending ? (
              <div className="relative w-full">
                <span className="opacity-0">Save</span>
                <Loading />
              </div>
            ) : (
              <button id="login-bth" className="w-full cursor-pointer">
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePicForm;
