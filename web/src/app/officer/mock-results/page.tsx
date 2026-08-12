import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { listMockResults } from "@/lib/data/mockResults";
import { listRosterOptions } from "@/lib/data/permissionSlips";
import { listEventOptions } from "@/lib/data/practiceBank";
import { deleteMockResult } from "@/app/actions/mockResults";
import { DeleteButton } from "@/components/DeleteButton";
import { AddMockResultForm } from "./AddMockResultForm";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export default async function MockResultsPage() {
  await requireRole("officer");
  const [results, roster, eventOptions] = await Promise.all([
    listMockResults(),
    listRosterOptions(),
    listEventOptions(),
  ]);

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
          Officer Tools
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Mock Results
        </h1>
        <p className="text-silver font-body mb-10">
          Feeds the Weekly Executive Brief&rsquo;s Chapter Pulse and each
          member&rsquo;s own Personal Progress page.
        </p>

        <AddMockResultForm roster={roster} eventOptions={eventOptions} />

        {results.length === 0 ? (
          <div className="bg-paper border border-silver-light p-6">
            <p className="text-ink text-sm">No mock results logged yet.</p>
          </div>
        ) : (
          <div className="bg-paper border border-silver-light">
            <ul className="divide-y divide-silver-light">
              {results.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-start justify-between gap-3 p-6"
                >
                  <div>
                    <p className="font-head font-bold text-blue-night">
                      {entry.memberName}{" "}
                      <span className="text-silver text-xs font-body">
                        &middot; {entry.eventName ?? "Event TBD"}
                      </span>
                    </p>
                    <p className="text-silver text-xs mt-1">
                      {new Date(`${entry.performanceDate}T00:00:00`).toLocaleDateString(
                        "en-US",
                        DATE_FORMAT,
                      )}
                      {entry.judge && ` · Judge: ${entry.judge}`}
                      {entry.total != null && ` · ${entry.total} pts`}
                    </p>
                    {entry.oneChangeAssigned && (
                      <p className="text-ink text-sm mt-2">
                        One change: {entry.oneChangeAssigned}
                      </p>
                    )}
                  </div>
                  <DeleteButton
                    action={deleteMockResult.bind(null, entry.id)}
                    confirmMessage={`Delete this mock result for ${entry.memberName}?`}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
