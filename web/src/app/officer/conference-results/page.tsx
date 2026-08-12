import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { listConferenceResults } from "@/lib/data/conferenceResults";
import { listRosterOptions } from "@/lib/data/permissionSlips";
import { listEventOptions } from "@/lib/data/practiceBank";
import { deleteConferenceResult } from "@/app/actions/conferenceResults";
import { DeleteButton } from "@/components/DeleteButton";
import { AddConferenceResultForm } from "./AddConferenceResultForm";

export default async function ConferenceResultsPage() {
  await requireRole("officer");
  const [results, roster, eventOptions] = await Promise.all([
    listConferenceResults(),
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
          Conference Results
        </h1>
        <p className="text-silver font-body mb-10">
          Feeds the public Results Showcase, the Weekly Executive Brief&rsquo;s
          Chapter Pulse, and each member&rsquo;s own Personal Progress page.
        </p>

        <AddConferenceResultForm roster={roster} eventOptions={eventOptions} />

        {results.length === 0 ? (
          <div className="bg-paper border border-silver-light p-6">
            <p className="text-ink text-sm">No conference results logged yet.</p>
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
                      {entry.level} &middot; {entry.season}
                      {entry.judge && ` · Judge: ${entry.judge}`}
                      {entry.advanced && " · Advanced"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-head font-black text-sm uppercase text-blue">
                      {entry.placement ?? (entry.total != null ? `${entry.total} pts` : "—")}
                    </span>
                    <DeleteButton
                      action={deleteConferenceResult.bind(null, entry.id)}
                      confirmMessage={`Delete this conference result for ${entry.memberName}?`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
