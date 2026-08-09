import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { listAllSlips, listRosterOptions, CONFERENCES } from "@/lib/data/permissionSlips";
import type { SlipStatus } from "@/lib/data/permissionSlips";
import { UpdateStatusForm } from "./UpdateStatusForm";

const STATUS_LABEL: Record<SlipStatus, string> = {
  not_submitted: "Not Submitted",
  submitted: "Submitted",
  approved: "Approved",
};

export default async function PermissionSlipsPage() {
  await requireRole("officer");
  const [grouped, roster] = await Promise.all([listAllSlips(), listRosterOptions()]);

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
          Permission Slips
        </h1>
        <p className="text-silver font-body mb-10">
          Parents see this status for their linked child. A member with no
          entry yet reads as &ldquo;Not Submitted&rdquo; on their end.
        </p>

        <UpdateStatusForm roster={roster} />

        {CONFERENCES.map((conference) => (
          <section key={conference} className="mb-8">
            <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
              {conference}
            </p>
            {grouped[conference].length === 0 ? (
              <div className="bg-paper border border-silver-light p-6">
                <p className="text-ink text-sm">No statuses recorded yet.</p>
              </div>
            ) : (
              <div className="bg-paper border border-silver-light">
                <ul className="divide-y divide-silver-light">
                  {grouped[conference].map((entry) => (
                    <li
                      key={entry.id}
                      className="flex flex-wrap items-center justify-between gap-2 p-6"
                    >
                      <p className="font-head font-bold text-blue-night">{entry.memberName}</p>
                      <span className="font-head font-black text-sm uppercase text-blue">
                        {STATUS_LABEL[entry.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
