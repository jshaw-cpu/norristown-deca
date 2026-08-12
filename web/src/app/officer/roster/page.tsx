import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { listSeasonRoster } from "@/lib/data/roster";
import { listEventOptions } from "@/lib/data/practiceBank";
import { deleteRosterMember } from "@/app/actions/roster";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";
import { DeleteButton } from "@/components/DeleteButton";
import { RosterForm } from "./RosterForm";

export default async function RosterPage() {
  await requireRole("officer");
  const [roster, eventOptions] = await Promise.all([
    listSeasonRoster(),
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
          Season Roster
        </h1>
        <p className="text-silver font-body mb-10">
          {CURRENT_SEASON} — this is what Permission Slips&rsquo; member
          dropdown and members&rsquo; own Personal Progress page both read
          from.
        </p>

        <RosterForm eventOptions={eventOptions} />

        {roster.length === 0 ? (
          <div className="bg-paper border border-silver-light p-6">
            <p className="text-ink text-sm">No members on the roster yet.</p>
          </div>
        ) : (
          <div className="bg-paper border border-silver-light">
            <ul className="divide-y divide-silver-light">
              {roster.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-wrap items-start justify-between gap-3 p-6"
                >
                  <div>
                    <p className="font-head font-bold text-blue-night">
                      {member.memberName}{" "}
                      <span className="text-silver text-xs font-body">
                        ({member.memberId})
                      </span>
                    </p>
                    <p className="text-silver text-xs mt-1">
                      {[
                        member.eventName,
                        member.cluster,
                        member.tier,
                        member.grade != null ? `Grade ${member.grade}` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "No details set"}
                    </p>
                  </div>
                  <DeleteButton
                    action={deleteRosterMember.bind(null, member.id)}
                    confirmMessage={`Remove ${member.memberName} from the roster?`}
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
