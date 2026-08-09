"use client";

import { useActionState, useState } from "react";
import { upsertPermissionSlip } from "@/app/actions/permissionSlips";
import { CONFERENCES } from "@/lib/data/permissionSlipTypes";

type RosterOption = { memberId: string; memberName: string };

const STATUSES = [
  { value: "not_submitted", label: "Not Submitted" },
  { value: "submitted", label: "Submitted" },
  { value: "approved", label: "Approved" },
];

export function UpdateStatusForm({ roster }: { roster: RosterOption[] }) {
  const [state, formAction, pending] = useActionState(
    upsertPermissionSlip,
    undefined,
  );
  const [memberName, setMemberName] = useState("");

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Update a Status
      </p>

      <input type="hidden" name="memberName" value={memberName} />

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Member
          </label>
          <select
            name="memberId"
            required
            defaultValue=""
            onChange={(e) => {
              const option = e.target.selectedOptions[0];
              setMemberName(option?.dataset.name ?? "");
            }}
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            <option value="" disabled>
              Select a member
            </option>
            {roster.map((r) => (
              <option key={r.memberId} value={r.memberId} data-name={r.memberName}>
                {r.memberName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Conference
          </label>
          <select
            name="conference"
            required
            defaultValue="District"
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            {CONFERENCES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Status
          </label>
          <select
            name="status"
            required
            defaultValue="submitted"
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-skew justify-self-start bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-3 disabled:opacity-60 hover:bg-blue-deep transition"
      >
        {pending ? "Saving..." : "Save Status"}
      </button>
    </form>
  );
}
