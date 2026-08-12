"use client";

import { useActionState, useState } from "react";
import { addConferenceResult } from "@/app/actions/conferenceResults";
import { CONFERENCES } from "@/lib/data/permissionSlipTypes";

type RosterOption = { memberId: string; memberName: string };
type EventOption = { eventCode: string; eventName: string };

export function AddConferenceResultForm({
  roster,
  eventOptions,
}: {
  roster: RosterOption[];
  eventOptions: EventOption[];
}) {
  const [state, formAction, pending] = useActionState(addConferenceResult, undefined);
  const [memberName, setMemberName] = useState("");

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Log a Conference Result
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
            onChange={(e) => setMemberName(e.target.selectedOptions[0]?.dataset.name ?? "")}
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
            Level
          </label>
          <select
            name="level"
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
            Event
          </label>
          <select
            name="eventCode"
            defaultValue=""
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            <option value="">Unspecified</option>
            {eventOptions.map((e) => (
              <option key={e.eventCode} value={e.eventCode}>
                {e.eventName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Exam <span className="text-silver-light">/ 100</span>
          </label>
          <input
            name="examScore"
            type="number"
            min="0"
            max="100"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Performance <span className="text-silver-light">/ 100</span>
          </label>
          <input
            name="performanceScore"
            type="number"
            min="0"
            max="100"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Written <span className="text-silver-light">/ 100</span>
          </label>
          <input
            name="writtenScore"
            type="number"
            min="0"
            max="100"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Judge
          </label>
          <input
            name="judge"
            type="text"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Placement
          </label>
          <input
            name="placement"
            type="text"
            placeholder="e.g. 3rd Place"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-body text-ink">
        <input name="advanced" type="checkbox" className="h-4 w-4" />
        Advanced to the next level
      </label>

      {state?.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-skew justify-self-start bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-3 disabled:opacity-60 hover:bg-blue-deep transition"
      >
        {pending ? "Saving..." : "Log Conference Result"}
      </button>
    </form>
  );
}
