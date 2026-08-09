import Link from "next/link";
import { requireMemberTier } from "@/lib/auth/dal";
import { getMemberProgress } from "@/lib/data/progress";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", DATE_FORMAT);
}

export default async function MemberProgressPage() {
  const session = await requireMemberTier();
  const progress = await getMemberProgress(session.memberId);

  return (
    <main className="min-h-screen bg-mist px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/member"
          className="font-head font-bold text-xs uppercase tracking-wide text-blue hover:text-blue-deep transition"
        >
          &larr; Back to Member Portal
        </Link>
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mt-4 mb-2">
          My Progress
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-10">
          {session.fullName ?? "Your"} Season So Far
        </h1>

        {!progress.hasMemberId ? (
          <div className="bg-paper border border-silver-light p-6">
            <p className="text-ink text-sm">
              Your account isn&rsquo;t linked to a Member ID yet, so there&rsquo;s
              no result history to show. Ask an officer to add your Member
              ID to your profile — it&rsquo;s the same ID used in the
              Competitive Intelligence workbook.
            </p>
          </div>
        ) : (
          <>
            <section className="bg-paper border border-silver-light p-8 mb-6">
              <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
                This Season
              </p>
              {progress.seasonSnapshot ? (
                <div>
                  <p className="font-head font-black text-xl text-blue-night">
                    {progress.seasonSnapshot.eventName ?? progress.seasonSnapshot.eventCode ?? "Event not set"}
                  </p>
                  <p className="text-silver text-sm mt-1">
                    {[progress.seasonSnapshot.cluster, progress.seasonSnapshot.tier]
                      .filter(Boolean)
                      .join(" · ") || "Cluster/tier not set"}
                  </p>
                  {progress.seasonSnapshot.baselineExamSept != null && (
                    <p className="text-ink text-sm mt-3">
                      Baseline exam (Sept): {progress.seasonSnapshot.baselineExamSept}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-ink text-sm">
                  Not on the {" "}
                  <span className="font-head font-bold">current</span> season
                  roster yet.
                </p>
              )}
            </section>

            <section className="mb-6">
              <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
                Mock Results
              </p>
              {progress.mockResults.length === 0 ? (
                <div className="bg-paper border border-silver-light p-6">
                  <p className="text-ink text-sm">
                    No mock results logged yet. These fill in as your
                    practice sessions get scored.
                  </p>
                </div>
              ) : (
                <div className="bg-paper border border-silver-light">
                  <ul className="divide-y divide-silver-light">
                    {progress.mockResults.map((entry) => (
                      <li key={entry.id} className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-head font-bold text-blue-night">
                            {entry.eventName ?? "Event"}
                          </p>
                          <span className="font-head font-black text-sm text-blue">
                            {entry.total != null ? `${entry.total} pts` : "—"}
                          </span>
                        </div>
                        <p className="text-silver text-xs mt-1">
                          {formatDate(entry.performanceDate)}
                          {entry.judge && ` · Judge: ${entry.judge}`}
                        </p>
                        {entry.oneChangeAssigned && (
                          <p className="text-ink text-sm mt-2">
                            One change before next run: {entry.oneChangeAssigned}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section>
              <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
                Conference Results
              </p>
              {progress.conferenceResults.length === 0 ? (
                <div className="bg-paper border border-silver-light p-6">
                  <p className="text-ink text-sm">
                    No conference results yet — these post after Districts,
                    States, or ICDC.
                  </p>
                </div>
              ) : (
                <div className="bg-paper border border-silver-light">
                  <ul className="divide-y divide-silver-light">
                    {progress.conferenceResults.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex flex-wrap items-center justify-between gap-2 p-6"
                      >
                        <div>
                          <p className="font-head font-bold text-blue-night">
                            {entry.eventName ?? "Event"}
                          </p>
                          <p className="text-silver text-xs mt-1">
                            {entry.level} &middot; {entry.season}
                            {entry.advanced && " · Advanced"}
                          </p>
                        </div>
                        <span className="font-head font-black text-sm uppercase text-blue">
                          {entry.placement ?? (entry.total != null ? `${entry.total} pts` : "—")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
