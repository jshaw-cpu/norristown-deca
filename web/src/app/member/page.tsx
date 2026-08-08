import { requireMemberTier } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";

export default async function MemberDashboard() {
  const session = await requireMemberTier();

  return (
    <main className="min-h-screen bg-mist px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-2">
          Member Portal
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-1">
          Welcome, {session.fullName ?? session.email}
        </h1>
        <p className="text-silver font-body mb-10">
          Role: {session.role}
          {session.role === "officer" && " (member-tier access granted)"}
        </p>

        <div className="bg-paper border border-silver-light p-8">
          <p className="font-body text-ink">
            This is the member dashboard placeholder. Phase 3 wires in the
            real practice bank (role-plays and tests already confirmed in
            Drive), personal progress from Conference Results, and the
            training calendar.
          </p>
        </div>

        <form action={logout} className="mt-8">
          <button className="font-head font-bold text-sm text-blue hover:text-blue-deep transition">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
