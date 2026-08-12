import { requireRole } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";
import { HARD_DEADLINES, daysBetween } from "@/lib/data/season-calendar";
import { listSlipsForMember } from "@/lib/data/permissionSlips";
import type { SlipStatus } from "@/lib/data/permissionSlips";

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

const STATUS_LABEL: Record<SlipStatus, string> = {
  not_submitted: "Not Submitted",
  submitted: "Submitted",
  approved: "Approved",
};

const STATUS_COLOR: Record<SlipStatus, string> = {
  not_submitted: "text-silver",
  submitted: "text-blue",
  approved: "text-blue-night",
};

export default async function ParentDashboard() {
  const session = await requireRole("parent");

  const now = new Date();
  const schedule = HARD_DEADLINES
    .filter((d) => !PARENT_RELEVANT_LABELS.has(d.label))
    .map((d) => ({ ...d, daysUntil: daysBetween(now, new Date(d.date)) }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const slips = await listSlipsForMember(session.childMemberId);

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
          Role: {session.role}
        </p>

        <section className="bg-paper border border-silver-light p-8 mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Volunteer Sign-Ups
          </p>
          <p className="text-ink text-sm mb-4">
            Chaperones, event-day help, and fundraiser shifts — sign up
            through the form below.
          </p>
          <a
            href="https://forms.gle/REPLACE-WITH-VOLUNTEER-SIGNUP-FORM"
            target="_blank"
            rel="noopener"
            className="btn-skew inline-block bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-3 hover:bg-blue-deep transition"
          >
            Sign Up to Volunteer &rarr;
          </a>
        </section>

        <section className="bg-paper border border-silver-light p-8 mb-6">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            Permission Slips
          </p>
          {slips === null ? (
            <p className="text-ink text-sm">
              Your account isn&rsquo;t linked to a student yet. Ask an
              officer to add your child&rsquo;s Member ID to your profile.
            </p>
          ) : (
            <ul className="divide-y divide-silver-light">
              {slips.map((slip) => (
                <li
                  key={slip.conference}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <p className="font-head font-bold text-sm text-blue-night">
                    {slip.conference}
                  </p>
                  <span
                    className={`font-head font-black text-sm uppercase ${STATUS_COLOR[slip.status]}`}
                  >
                    {STATUS_LABEL[slip.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

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
