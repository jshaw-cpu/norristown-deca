"use client";

import { useActionState, useState } from "react";
import { addMockResult } from "@/app/actions/mockResults";

type RosterOption = { memberId: string; memberName: string };
type EventOption = { eventCode: string; eventName: string };

const RUBRIC_FIELDS = [
  { name: "opening", label: "Opening" },
  { name: "diagnosis", label: "Diagnosis" },
  { name: "perfIndicators", label: "Perf. Indicators" },
  { name: "specificity", label: "Specificity" },
  { name: "quantification", label: "Quantification" },
  { name: "followUp", label: "Follow-Up" },
  { name: "presence", label: "Presence" },
  { name: "close", label: "Close" },
];

export function AddMockResultForm({
  roster,
  eventOptions,
}: {
  roster: RosterOption[];
  eventOptions: EventOption[];
}) {
  const [state, formAction, pending] = useActionState(addMockResult, undefined);
  const [memberName, setMemberName] = useState("");

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Log a Mock Result
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
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Date
          </label>
          <input
            name="performanceDate"
            type="date"
            required
            defaultValue={new Date().toISOString().slice(0, 10)}
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
      </div>

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
          Scenario
        </label>
        <input
          name="scenario"
          type="text"
          className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
        />
      </div>

      <div>
        <p className="text-xs font-head font-bold uppercase tracking-wide text-silver mb-2">
          Rubric Scores
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RUBRIC_FIELDS.map((field) => (
            <div key={field.name}>
              <label className="block text-[0.65rem] font-head font-semibold uppercase tracking-wide text-silver mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type="number"
                min="0"
                className="w-full border border-silver-light px-2 py-1.5 font-body text-sm focus:outline-none focus:border-blue"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          One Change Before Next Run
        </label>
        <input
          name="oneChangeAssigned"
          type="text"
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
        {pending ? "Saving..." : "Log Mock Result"}
      </button>
    </form>
  );
}
