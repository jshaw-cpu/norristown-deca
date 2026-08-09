import { requireRole } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";
import { HARD_DEADLINES, daysBetween } from "@/lib/data/season-calendar";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

// Officer-internal items (like the incoming-officer shadow period) don't
// belong on a parent-facing schedule — everything else here affects a
// competitor's eligibility or travel, which is exactly what a parent
// needs to plan around.
const PARENT_RELEVANT_LABELS = new Set(
  ["Six-Week Officer Shadow Start"].map((l) => l),
);

export default async function ParentDashboard() {
  const session = await requireRole("parent");

  const now = new Date();
  const schedule = HARD_DEADLINES
    .filter((d) => !PARENT_RELEVANT_LABELS.has(d.label))
    .map((d) => ({ ...d, daysUntil: daysBetween(now, new Date(d.date)) }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <main className="min-h-screen bg-mist px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-2">
          Parent Portal
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Welcome, {session.fullName ?? session.email}
        </h1>
        <p className="text-silver font-body mb-10">
          Permission slip status and volunteer sign-ups land here next in
          Phase 3.
        </p>

        <section className="bg-paper border border-silver-light p-8">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Competition Schedule
          </p>
          <ul className="divide-y divide-silver-light">
            {schedule.map((d) => {
              const isPast = d.daysUntil < 0;
              return (
                <li key={d.label} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p
                      className={`font-head font-bold text-sm ${isPast ? "text-silver line-through" : "text-blue-night"}`}
                    >
                      {d.label}
                    </p>
                    <span className={`text-xs font-head font-semibold ${isPast ? "text-silver" : "text-blue"}`}>
                      {isPast
                        ? "Passed"
                        : d.daysUntil === 0
                          ? "Today"
                          : `${d.daysUntil} day${d.daysUntil === 1 ? "" : "s"} away`}
                    </span>
                  </div>
                  <p className="text-silver text-xs mt-1">
                    {new Date(d.date).toLocaleDateString("en-US", DATE_FORMAT)}
                  </p>
                  <p className="text-ink text-sm mt-2">{d.note}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <form action={logout} className="mt-10">
          <button className="font-head font-bold text-sm text-blue hover:text-blue-deep transition">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
