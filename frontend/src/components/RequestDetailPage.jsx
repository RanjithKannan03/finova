"use client";

import React, { useEffect, useState } from "react";
import VoteRow from "./VoteRow";
import { fmt, timeLeft } from "@/lib/date-helpers";
import ActionButton from "./ActionButton";
import { flatStore, userStore } from "@/zustand/store";

const STATUS_MAP = {
  PEN: {
    label: "Pending",
    color: "rgba(251,191,36,0.9)",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
  ACC: {
    label: "Accepted",
    color: "rgba(52,211,153,0.9)",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  REJ: {
    label: "Rejected",
    color: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
};

const VOTE_MAP = {
  ACC: { label: "Accepted", color: "rgba(52,211,153,0.9)" },
  REJ: { label: "Rejected", color: "rgba(239,68,68,0.9)" },
};

const RequestDetailPage = ({ data }) => {
  const { request, votesClosed } = data;
  const status = STATUS_MAP[request.status] ?? STATUS_MAP.PEN;

  // ── Replace these with real auth logic later ──────────────────────────────
  const [currentUsername, setCurrentUsername] = useState(null); // swap with real user
  const [isAdmin, setIsAdmin] = useState(true); // swap with real auth check
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const u = userStore.getState().user;
    setCurrentUsername(u.username);

    const f = flatStore.getState().flat;

    setIsAdmin(f.admin === u.email);

    const unsubUser = userStore.subscribe((state) =>
      setCurrentUsername(state.user?.username),
    );
    const unsubFlat = flatStore.subscribe((state) => {
      setIsAdmin(state.flat?.admin === u.email);
    });

    return () => {
      unsubUser();
      unsubFlat();
    };
  }, []);

  const hasVoted = request.votes.some(
    (v) => v.cast_by.username === currentUsername,
  );
  const canVote = !votesClosed && !hasVoted;

  const accVotes = request.votes.filter((v) => v.choice === "ACC").length;
  const rejVotes = request.votes.filter((v) => v.choice === "REJ").length;
  const total = request.votes.length;

  const accPct = total > 0 ? (accVotes / total) * 100 : 0;

  return (
    <div className="w-full flex flex-col gap-6 font-poppins lg:flex-row lg:items-start">
      {/* ── Left — main detail ── */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        {/* Header card */}
        <div className="card px-6 py-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          {/* Status + title */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1.5 min-w-0">
              <div
                className="self-start px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  color: status.color,
                  background: status.bg,
                  borderColor: status.border,
                }}
              >
                {status.label}
              </div>
              <h1 className="text-xl font-semibold text-textPrimary/90 leading-snug">
                {request.name}
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-textPrimary/55 leading-relaxed mb-5">
            {request.description}
          </p>

          <div className="w-full h-px bg-outline/50 mb-4" />

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Created by", value: `@${request.created_by.username}` },
              { label: "Created on", value: fmt(request.created_on) },
              { label: "Expires", value: fmt(request.expiry_date) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 px-3 py-2 rounded-xl bg-white/3 border border-outline/60"
              >
                <p className="text-xs uppercase tracking-wider text-textPrimary/30">
                  {label}
                </p>
                <p className="text-xs font-medium text-textPrimary/75">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Votes card */}
        <div className="card px-6 py-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
                Votes
              </p>
              <h2 className="text-base font-semibold text-textPrimary/90 mt-0.5">
                {total} vote{total !== 1 ? "s" : ""} cast
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-textPrimary/30">
              <span className="text-emerald-400/70 font-medium">
                {accVotes} ACC
              </span>
              <span>·</span>
              <span className="text-red-400/70 font-medium">
                {rejVotes} REJ
              </span>
            </div>
          </div>

          {/* Vote bar */}
          {total > 0 && (
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${accPct}%`,
                  background: "rgba(52,211,153,0.85)",
                  boxShadow: "0 0 8px rgba(52,211,153,0.4)",
                }}
              />
            </div>
          )}

          <div className="w-full h-px bg-outline/50 mb-3" />

          {/* Vote list */}
          {request.votes.length === 0 ? (
            <p className="text-xs text-textPrimary/30 py-4 text-center">
              No votes yet
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {request.votes.map((vote) => (
                <VoteRow VOTE_MAP={VOTE_MAP} key={vote.vote_id} vote={vote} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right — actions ── */}
      <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">
        {/* Expiry card */}
        <div className="card px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-textPrimary/30">
              Time Remaining
            </p>
            <p className="text-sm font-semibold text-textPrimary/80 mt-0.5">
              {timeLeft(request.expiry_date)}
            </p>
          </div>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: votesClosed
                ? "rgba(239,68,68,0.8)"
                : "rgba(52,211,153,0.8)",
              boxShadow: votesClosed
                ? "0 0 6px rgba(239,68,68,0.4)"
                : "0 0 6px rgba(52,211,153,0.4)",
            }}
          />
        </div>

        {/* Cast vote */}
        {canVote && (
          <div className="card px-5 py-5 flex flex-col gap-3 relative overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
                Cast Vote
              </p>
              <p className="text-xs text-textPrimary/40 mt-0.5">
                Your vote on this request
              </p>
            </div>
            <div className="w-full h-px bg-outline/50" />
            <ActionButton
              label="Vote Accept"
              color="rgba(52,211,153,0.9)"
              bg="rgba(52,211,153,0.08)"
              border="rgba(52,211,153,0.2)"
              onClick={() => console.log("vote ACC")}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              }
            />
            <ActionButton
              label="Vote Reject"
              color="rgba(239,68,68,0.9)"
              bg="rgba(239,68,68,0.08)"
              border="rgba(239,68,68,0.2)"
              onClick={() => console.log("vote REJ")}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              }
            />
          </div>
        )}

        {/* Already voted */}
        {!canVote && !votesClosed && hasVoted && (
          <div className="card px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-textPrimary/30 mb-1">
              Your Vote
            </p>
            {(() => {
              const myVote = request.votes.find(
                (v) => v.cast_by.username === currentUsername,
              );
              const meta = VOTE_MAP[myVote?.choice];
              return (
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: meta?.color }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: meta?.color }}
                  >
                    {meta?.label}
                  </span>
                </div>
              );
            })()}
          </div>
        )}

        {/* Votes closed */}
        {votesClosed && (
          <div className="card px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-textPrimary/30 mb-1">
              Voting
            </p>
            <p className="text-xs text-textPrimary/40 mt-1">
              Voting is closed for this request.
            </p>
          </div>
        )}

        {/* Admin actions */}
        {isAdmin && (
          <div className="card px-5 py-5 flex flex-col gap-3 relative overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
                Admin
              </p>
              <p className="text-xs text-textPrimary/40 mt-0.5">
                Override request status
              </p>
            </div>
            <div className="w-full h-px bg-outline/50" />
            <ActionButton
              label="Accept Request"
              color="rgba(52,211,153,0.9)"
              bg="rgba(52,211,153,0.08)"
              border="rgba(52,211,153,0.2)"
              onClick={() => console.log("admin ACC")}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              }
            />
            <ActionButton
              label="Reject Request"
              color="rgba(239,68,68,0.9)"
              bg="rgba(239,68,68,0.08)"
              border="rgba(239,68,68,0.2)"
              onClick={() => console.log("admin REJ")}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailPage;
