"use client";

import { useActionState } from "react";
import { upsertRosterMember } from "@/app/actions/roster";

type EventOption = { eventCode: string; eventName: string };

const CLUSTERS = [
  "Marketing",
  "Finance",
  "Hospitality and Tourism",
  "Entrepreneurship",
  "Business Management",
];

export function RosterForm({ eventOptions }: { eventOptions: EventOption[] }) {
  const [state, formAction, pending] = useActionState(
    upsertRosterMember,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Add / Update a Roster Entry
      </p>
      <p className="text-silver text-xs -mt-2">
        Re-submitting the same Member ID updates that member&rsquo;s row
        instead of creating a duplicate.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Member ID
          </label>
          <input
            name="memberId"
            type="text"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Member Name
          </label>
          <input
            name="memberName"
            type="text"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Grade
          </label>
          <input
            name="grade"
            type="number"
            min="9"
            max="12"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Years in Chapter
          </label>
          <input
            name="yearsInChapter"
            type="number"
            min="0"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Baseline Exam (Sept)
          </label>
          <input
            name="baselineExamSept"
            type="number"
            min="0"
            max="100"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Event
          </label>
          <select
            name="eventCode"
            defaultValue=""
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            <option value="">Unassigned</option>
            {eventOptions.map((e) => (
              <option key={e.eventCode} value={e.eventCode}>
                {e.eventName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Cluster
          </label>
          <select
            name="cluster"
            defaultValue=""
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            <option value="">Unspecified</option>
            {CLUSTERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Tier
          </label>
          <input
            name="tier"
            type="text"
            placeholder="e.g. Competitor"
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
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
        {pending ? "Saving..." : "Save Roster Entry"}
      </button>
    </form>
  );
}
