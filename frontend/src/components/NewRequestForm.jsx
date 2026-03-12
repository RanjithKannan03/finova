"use client";

import React, { useState, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createRequest } from "@/actions/request-actions";

const TYPES = [
  {
    value: "N",
    label: "General",
    desc: "A general flat request",
    color: "rgba(99,102,241,0.9)",
  },
  {
    value: "B",
    label: "Budget Change",
    desc: "Propose a new monthly budget",
    color: "rgba(251,191,36,0.9)",
  },
];

const NewRequestForm = () => {
  const [type, setType] = useState("N");

  const [state, formAction, isPending] = useActionState(createRequest, {
    error: null,
  });

  return (
    <div className="w-full  mx-auto flex flex-col gap-4 font-poppins pb-5">
      {/* Header */}
      <div className="card px-6 py-5 overflow-hidden">
        <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/50">
          New
        </p>
        <h1 className="text-xl font-semibold text-textPrimary/90 mt-0.5">
          Add Request
        </h1>
      </div>

      <form className="flex flex-col gap-4" action={formAction}>
        {/* Type selector */}
        <div className="card px-6 py-5 flex flex-col gap-4 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/60">
              Type
            </p>
            <p className="text-xs text-textPrimary/40 mt-0.5">
              Select the kind of request
            </p>
          </div>

          <div className="w-full h-px bg-outline/50" />

          <div className="grid grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className="flex cursor-pointer flex-col gap-1 px-4 py-3 rounded-xl border text-left transition-all duration-150"
                style={{
                  background:
                    type === t.value
                      ? `${t.color.replace("0.9", "0.08")}`
                      : "rgba(255,255,255,0.02)",
                  borderColor:
                    type === t.value
                      ? t.color.replace("0.9", "0.3")
                      : "rgba(57,57,63,0.6)",
                  boxShadow:
                    type === t.value
                      ? `0 0 12px ${t.color.replace("0.9", "0.1")}`
                      : "none",
                }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: type === t.value ? t.color : "rgba(255,255,255,0.5)",
                  }}
                >
                  {t.label}
                </span>
                <span className="text-xs text-textPrimary/30">{t.desc}</span>
              </button>
            ))}
          </div>

          {/* hidden input so formData gets type */}
          <input type="hidden" name="type" value={type} />
        </div>

        {/* Fields */}
        <div className="card px-6 py-5 flex flex-col gap-4 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/60">
              Details
            </p>
            <p className="text-xs text-textPrimary/40 mt-0.5">
              Describe your request
            </p>
          </div>

          <div className="w-full h-px bg-outline/50" />

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-textPrimary/60">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Request name"
              className="w-full bg-white/4 border border-outline rounded-xl
                         px-4 py-2.5 text-sm text-textPrimary/80
                         placeholder-textPrimary/20
                         focus:outline-none focus:border-white/60 focus:bg-white/[0.07]
                         focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]
                         transition-all duration-150"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-textPrimary/60">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the request in detail..."
              className="w-full bg-white/4 border border-outline rounded-xl
                         px-4 py-2.5 text-sm text-textPrimary/80
                         placeholder-textPrimary/20 resize-none
                         focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                         focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]
                         transition-all duration-150"
            />
          </div>

          {/* New budget — only if type B */}
          {type === "B" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-textPrimary/60">
                Proposed Budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-textPrimary/60 pointer-events-none">
                  £
                </span>
                <input
                  type="number"
                  name="new_budget"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-white/4 border border-outline rounded-xl
                             pl-8 pr-4 py-2.5 text-sm text-textPrimary/80
                             placeholder-textPrimary/20
                             focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                             focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]
                             transition-all duration-150"
                  style={{ borderColor: "rgba(251,191,36,0.3)" }}
                />
              </div>
            </div>
          )}

          {state.error && (
            <p className="text-xs text-red-400/80 text-center">{state.error}</p>
          )}

          <div className="pt-1">
            <SubmitButton isPending={isPending} text="Submit Request" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRequestForm;
