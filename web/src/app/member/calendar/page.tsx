import Link from "next/link";
import { requireMemberTier } from "@/lib/auth/dal";
import {
  HARD_DEADLINES,
  TRAINING_MONTHS,
  WEEKLY_CADENCE,
  daysBetween,
  getActiveTaperWindow,
  getCurrentTrainingMonth,
} from "@/lib/data/season-calendar";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

export default async function MemberCalendarPage() {
  await requireMemberTier();

  const now = new Date();
  const taperWindow = getActiveTaperWindow(now);
  const currentMonth = getCurrentTrainingMonth(now);
  const deadlines = HARD_DEADLINES
    .map((d) => ({ ...d, daysUntil: daysBetween(now, new Date(d.date)) }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

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
          Training Calendar
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-10">
          The Season, Month By Month
        </h1>

        {taperWindow && (
          <div className="bg-blue-night border border-blue-deep p-5 mb-6">
            <p className="font-head font-black text-sm uppercase tracking-wide text-white">
              Taper Window — {taperWindow.label}
            </p>
            <p className="text-sm text-silver-light mt-1">
              No new commitments right now. Competitors are peaking and the
              chapter protects that.
            </p>
          </div>
        )}

        <section className="bg-paper border border-silver-light p-8 mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Weekly Practice
          </p>
          <ul className="divide-y divide-silver-light">
            {WEEKLY_CADENCE.map((item) => (
              <li
                key={item.item}
                className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
              >
                <p className="font-head font-bold text-sm text-blue-night">{item.item}</p>
                <span className="text-silver text-xs font-head font-semibold">
                  {item.cadence}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-paper border border-silver-light p-8 mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Key Dates
          </p>
          <ul className="divide-y divide-silver-light">
            {deadlines.map((d) => {
              const isPast = d.daysUntil < 0;
              return (
                <li key={d.label} className="py-3 first:pt-0 last:pb-0">
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
                </li>
              );
            })}
          </ul>
        </section>

        <section className="bg-paper border border-silver-light p-8">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Season Roadmap
          </p>
          <ul className="divide-y divide-silver-light">
            {TRAINING_MONTHS.map((month) => {
              const isCurrent = currentMonth?.label === month.label;
              return (
                <li
                  key={month.label}
                  className={`py-4 first:pt-0 last:pb-0 ${isCurrent ? "bg-mist -mx-8 px-8" : ""}`}
                >
                  <p className="font-head font-bold text-sm text-blue-night">
                    {month.label}
                    {isCurrent && (
                      <span className="ml-2 text-blue text-[0.65rem] uppercase tracking-wide">
                        Now
                      </span>
                    )}
                  </p>
                  <p className="text-ink text-sm mt-1">{month.focus}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
