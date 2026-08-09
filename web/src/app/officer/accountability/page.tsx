import Link from "next/link";
import { requireAdvisor } from "@/lib/auth/dal";
import { listAccountabilityEntries } from "@/lib/data/accountability";
import type { AccountabilityLevel } from "@/lib/data/accountability";
import { LogEntryForm } from "./LogEntryForm";

const LEVEL_LABEL: Record<AccountabilityLevel, string> = {
  verbal: "Verbal Warning",
  written: "Written Warning",
  suspension: "Suspension / Removal",
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export default async function AccountabilityQueue() {
  await requireAdvisor();
  const groups = await listAccountabilityEntries();

  return (
    <main className="min-h-screen bg-mist px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/officer"
          className="font-head font-bold text-xs uppercase tracking-wide text-blue hover:text-blue-deep transition"
        >
          &larr; Back to Brief
        </Link>
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mt-4 mb-2">
          Advisor Only
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Accountability Review Queue
        </h1>
        <p className="text-silver font-body mb-10">
          Playbook Section 1: verbal warning &rarr; written warning &rarr;
          suspension/removal. Corrective, not punitive — each case is judged
          on its own facts.
        </p>

        <LogEntryForm />

        <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
          Current Records
        </p>

        {groups.length === 0 ? (
          <div className="bg-paper border border-silver-light p-6">
            <p className="text-ink text-sm">
              No accountability entries logged yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {groups.map((group) => (
              <div key={group.officerName} className="bg-paper border border-silver-light p-6">
                <p className="font-head font-black text-lg text-blue-night mb-3">
                  {group.officerName}
                </p>
                <ul className="divide-y divide-silver-light">
                  {group.entries.map((entry) => (
                    <li key={entry.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-head font-bold text-sm uppercase tracking-wide text-blue">
                          {LEVEL_LABEL[entry.level]}
                        </span>
                        <span className="text-silver text-xs font-head font-semibold">
                          {new Date(`${entry.incidentDate}T00:00:00`).toLocaleDateString(
                            "en-US",
                            DATE_FORMAT,
                          )}
                        </span>
                      </div>
                      <p className="text-ink text-sm mt-1">{entry.reason}</p>
                      {entry.timelineNote && (
                        <p className="text-silver text-xs mt-1">
                          Next step: {entry.timelineNote}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
