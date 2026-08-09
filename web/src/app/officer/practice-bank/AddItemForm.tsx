"use client";

import { useActionState } from "react";
import { addPracticeBankItem } from "@/app/actions/practiceBank";
import type { EventOption } from "@/lib/data/practiceBank";

const TYPES = [
  { value: "role_play_scenario", label: "Role-Play Scenario" },
  { value: "exam_resource", label: "Exam Resource" },
  { value: "study_guide", label: "Study Guide" },
];

const CLUSTERS = [
  "Marketing",
  "Finance",
  "Hospitality and Tourism",
  "Entrepreneurship",
  "Business Management",
];

export function AddItemForm({ eventOptions }: { eventOptions: EventOption[] }) {
  const [state, formAction, pending] = useActionState(
    addPracticeBankItem,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="bg-paper border border-silver-light p-8 mb-10 grid gap-4"
    >
      <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver">
        Add a Catalog Entry
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Type
          </label>
          <select
            name="itemType"
            required
            defaultValue="role_play_scenario"
            className="w-full border border-silver-light px-3 py-2 font-body bg-paper focus:outline-none focus:border-blue"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Cluster (optional)
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
            Event (optional)
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

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          Drive Link
        </label>
        <input
          name="driveUrl"
          type="url"
          required
          placeholder="https://drive.google.com/..."
          className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
        />
      </div>

      <div>
        <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
          Notes (optional)
        </label>
        <input
          name="notes"
          type="text"
          placeholder="What it is / when to use it"
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
        {pending ? "Saving..." : "Add Entry"}
      </button>
    </form>
  );
}
