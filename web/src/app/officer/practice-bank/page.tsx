import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { listPracticeBankItems, listEventOptions } from "@/lib/data/practiceBank";
import { deletePracticeBankItem } from "@/app/actions/practiceBank";
import { PracticeBankGroups } from "@/components/practice-bank/PracticeBankGroups";
import { AddItemForm } from "./AddItemForm";

export default async function PracticeBankPage() {
  await requireRole("officer");
  const [groups, eventOptions] = await Promise.all([
    listPracticeBankItems(),
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
          Role-Play &amp; Test Bank
        </h1>
        <p className="text-silver font-body mb-10">
          A catalog of what&rsquo;s in Drive, not a copy of it — Google Drive
          stays the system of record (Playbook Section 8.1). Add a link here
          so the whole officer team can find it.
        </p>

        <AddItemForm eventOptions={eventOptions} />

        <PracticeBankGroups
          groups={groups}
          renderItemActions={(itemId) => (
            <form action={deletePracticeBankItem.bind(null, itemId)}>
              <button
                type="submit"
                className="font-head font-bold text-xs uppercase tracking-wide text-silver hover:text-red-600 transition"
              >
                Delete
              </button>
            </form>
          )}
        />
      </div>
    </main>
  );
}
