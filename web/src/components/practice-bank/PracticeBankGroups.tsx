import type { ReactNode } from "react";
import { PRACTICE_BANK_TYPE_LABEL } from "@/lib/data/practiceBank";
import type { PracticeBankGroup } from "@/lib/data/practiceBank";

// Shared read-only rendering for both /officer/practice-bank (with a
// delete action per item) and /member/practice-bank (browse-only).
// Keeping this in one place means the two pages can't drift on layout.
export function PracticeBankGroups({
  groups,
  renderItemActions,
}: {
  groups: PracticeBankGroup[];
  renderItemActions?: (itemId: string) => ReactNode;
}) {
  return (
    <>
      {groups.map((group) => (
        <section key={group.itemType} className="mb-8">
          <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
            {PRACTICE_BANK_TYPE_LABEL[group.itemType]}
          </p>
          {group.items.length === 0 ? (
            <div className="bg-paper border border-silver-light p-6">
              <p className="text-ink text-sm">Nothing catalogued yet.</p>
            </div>
          ) : (
            <div className="bg-paper border border-silver-light">
              <ul className="divide-y divide-silver-light">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-start justify-between gap-3 p-6"
                  >
                    <div>
                      <a
                        href={item.driveUrl}
                        target="_blank"
                        rel="noopener"
                        className="font-head font-bold text-blue-night hover:text-blue transition"
                      >
                        {item.title} &#8599;
                      </a>
                      <p className="text-silver text-xs mt-1">
                        {[item.cluster, item.eventCode].filter(Boolean).join(" · ") || "Unspecified"}
                      </p>
                      {item.notes && (
                        <p className="text-ink text-sm mt-1">{item.notes}</p>
                      )}
                    </div>
                    {renderItemActions?.(item.id)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
