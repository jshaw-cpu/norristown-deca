import Link from "next/link";
import { requireMemberTier } from "@/lib/auth/dal";
import { listPracticeBankItems } from "@/lib/data/practiceBank";
import { PracticeBankGroups } from "@/components/practice-bank/PracticeBankGroups";

export default async function MemberPracticeBankPage() {
  await requireMemberTier();
  const groups = await listPracticeBankItems();

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
          Practice Bank
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Role-Plays &amp; Study Resources
        </h1>
        <p className="text-silver font-body mb-10">
          Everything the officer team has catalogued for practice, linked
          straight to Drive.
        </p>

        <PracticeBankGroups groups={groups} />
      </div>
    </main>
  );
}
