import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";
import { getChapterPulse } from "@/lib/data/brief";
import {
  CURRENT_SEASON,
  WEEKLY_CADENCE,
  getActiveTaperWindow,
  getNextDeadline,
} from "@/lib/data/season-calendar";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday as the start of the week
  d.setDate(d.getDate() + diff);
  return d;
}

export default async function OfficerDashboard() {
  const session = await requireRole("officer");
  const pulse = await getChapterPulse();

  const now = new Date();
  const weekStart = startOfWeek(now);
  const nextDeadline = getNextDeadline(now);
  const taperWindow = getActiveTaperWindow(now);

  return (
    <main className="min-h-screen bg-mist px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-2">
          Weekly Executive Brief
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Week of {weekStart.toLocaleDateString("en-US", DATE_FORMAT)}
        </h1>
        <p className="text-silver font-body mb-10">
          Welcome, {session.fullName ?? session.email}
        </p>

        {taperWindow && (
          <div className="bg-blue-night border border-blue-deep p-5 mb-6">
            <p className="font-head font-black text-sm uppercase tracking-wide text-white">
              Taper Window — {taperWindow.label}
            </p>
            <p className="text-sm text-silver-light mt-1">
              No new commitments. Competitors are peaking and the chapter
              protects that.
            </p>
          </div>
        )}

        <section className="bg-paper border border-silver-light p-8 mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Non-Negotiables
          </p>
          {nextDeadline ? (
            <div>
              <p className="font-head font-black text-xl text-blue-night">
                {nextDeadline.label}
              </p>
              <p className="text-silver text-sm mt-1">
                {new Date(nextDeadline.date).toLocaleDateString("en-US", DATE_FORMAT)}{" "}
                &middot;{" "}
                {nextDeadline.daysUntil === 0
                  ? "Today"
                  : `${nextDeadline.daysUntil} day${nextDeadline.daysUntil === 1 ? "" : "s"} away`}
              </p>
              <p className="text-ink text-sm mt-3">{nextDeadline.note}</p>
            </div>
          ) : (
            <p className="text-ink text-sm">
              No remaining hard deadlines on the calendar this season.
            </p>
          )}
        </section>

        <section className="mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Chapter Pulse
          </p>
          {pulse.hasAnyData ? (
            <div className="grid grid-cols-3 gap-4">
              <PulseTile value={pulse.mockResultsThisWeek} label="Mock Results This Week" />
              <PulseTile value={pulse.conferenceResultsThisSeason} label="Conference Results This Season" />
              <PulseTile value={pulse.rosterSize} label="Members On Roster" />
            </div>
          ) : (
            <div className="bg-paper border border-silver-light p-6">
              <p className="text-ink text-sm">
                No mock results, conference results, or roster entries logged
                for the {CURRENT_SEASON} season yet. This fills in as
                officers enter data through the season.
              </p>
            </div>
          )}
        </section>

        <section className="bg-paper border border-silver-light p-8 mb-10">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            This Week&rsquo;s Cadence
          </p>
          <ul className="divide-y divide-silver-light">
            {WEEKLY_CADENCE.map((item) => (
              <li
                key={item.item}
                className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-head font-bold text-sm text-blue-night">{item.item}</p>
                  <p className="text-silver text-xs">{item.cadence}</p>
                </div>
                <span className="text-blue text-xs font-head font-semibold uppercase tracking-wide">
                  {item.owner}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {session.isAdvisor && (
          <Link
            href="/officer/accountability"
            className="inline-block font-head font-bold text-sm text-blue hover:text-blue-deep transition mb-10"
          >
            Review Queue &rarr;
          </Link>
        )}

        <form action={logout}>
          <button className="font-head font-bold text-sm text-blue hover:text-blue-deep transition">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}

function PulseTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-paper border border-silver-light p-6 text-center">
      <b className="block font-head font-black text-3xl text-blue-night">{value}</b>
      <span className="font-head font-semibold text-[0.66rem] uppercase tracking-[0.14em] text-silver">
        {label}
      </span>
    </div>
  );
}
