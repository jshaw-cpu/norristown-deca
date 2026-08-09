"use client";

import { useActionState } from "react";
import { logAccountabilityEntry } from "@/app/actions/accountability";

const LEVELS = [
  { value: "verbal", label: "Verbal Warning" },
  { value: "written", label: "Written Warning" },
  { value: "suspension", label: "Suspension / Removal" },
];

export function LogEntryForm() {
  const [state, formAction, pending] = useActionState(
    logAccountabilityEntry,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Log a New Entry
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Officer Name
          </label>
          <input
            name="officerName"
            type="text"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Level
          </label>
          <select
            name="level"
            required
            defaultValue="verbal"
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            {LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          Incident Date
        </label>
        <input
          name="incidentDate"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
        />
      </div>

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          Reason
        </label>
        <textarea
          name="reason"
          required
          rows={3}
          className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
        />
      </div>

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          Timeline / Agreed Next Step (optional)
        </label>
        <input
          name="timelineNote"
          type="text"
          placeholder="e.g. show progress within two weeks"
          className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-skew justify-self-start bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-3 disabled:opacity-60 hover:bg-blue-deep transition"
      >
        {pending ? "Saving..." : "Log Entry"}
      </button>
    </form>
  );
}
