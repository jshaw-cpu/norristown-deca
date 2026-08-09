import { getResultsShowcase } from "@/lib/data/results";

const LEGACY_HIGHLIGHTS = [
  { value: "55+", label: "Years of DECA Excellence" },
  { value: "20+", label: "ICDC Finalists & Placers" },
  { value: "3", label: "ICDC Scholarship Recipients" },
  { value: "#1", label: "Largest Chapter in PA" },
];

export async function ResultsShowcase() {
  const results = await getResultsShowcase();

  return (
    <section id="results" className="bg-mist px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Live From The Season
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Results, as they happen.
          </h2>
        </div>

        {results.hasData ? (
          <ResultsData results={results} />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div>
      <div className="bg-white border border-[#dde6ef] rounded-lg p-10 text-center max-w-2xl mx-auto mb-14">
        <p className="font-head font-bold text-sm uppercase tracking-wide text-blue-night mb-2">
          This season&rsquo;s results are still being written.
        </p>
        <p className="text-silver">
          As districts, states, and ICDC results come in, they&rsquo;ll post
          here in real time &mdash; placements, advancements, and score
          trends across the chapter.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {LEGACY_HIGHLIGHTS.map((stat) => (
          <div key={stat.label} className="bg-white border-t-4 border-blue p-6 text-center">
            <b className="block font-head font-black text-3xl text-blue-night">
              {stat.value}
            </b>
            <span className="font-head font-semibold text-[0.68rem] uppercase tracking-[0.14em] text-silver">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-silver mt-4">
        Chapter highlights from past seasons &mdash; live per-conference data
        appears above once entered.
      </p>
    </div>
  );
}

function ResultsData({
  results,
}: {
  results: Awaited<ReturnType<typeof getResultsShowcase>>;
}) {
  const maxAvg = Math.max(...results.bySeason.map((s) => s.avgTotal), 1);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <StatTile value={results.totalResults} label="Recorded Results" />
        <StatTile value={results.advancedCount} label="Advanced To Next Level" />
        <StatTile value={results.seasonCount} label="Seasons Tracked" />
      </div>

      {results.bySeason.length > 1 && (
        <div className="bg-white border border-[#dde6ef] p-8 mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-6">
            Average Score By Season
          </p>
          <div className="flex items-end gap-6 h-40">
            {results.bySeason.map((season) => (
              <div key={season.season} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue"
                  style={{
                    height: `${Math.max((season.avgTotal / maxAvg) * 100, 4)}%`,
                  }}
                />
                <span className="font-head font-bold text-[0.7rem] text-silver">
                  {season.season}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-[#dde6ef]">
        <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver px-8 pt-8">
          Recent Results
        </p>
        <ul>
          {results.recent.map((result, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 px-8 py-4 border-t border-[#dde6ef] first:border-t-0"
            >
              <div>
                <p className="font-head font-bold text-blue-night">
                  {result.memberName}
                </p>
                <p className="text-sm text-silver">
                  {result.eventName ?? "Event TBD"} &middot; {result.level} &middot; {result.season}
                </p>
              </div>
              <span className="font-head font-black text-sm uppercase text-blue">
                {result.placement ?? (result.total != null ? `${result.total} pts` : "—")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white border-t-4 border-blue p-8 text-center">
      <b className="block font-head font-black text-4xl text-blue-night">
        {value}
      </b>
      <span className="font-head font-semibold text-[0.7rem] uppercase tracking-[0.16em] text-silver">
        {label}
      </span>
    </div>
  );
}
