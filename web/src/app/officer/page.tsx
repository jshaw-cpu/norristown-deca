import { requireRole } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";

export default async function OfficerDashboard() {
  const session = await requireRole("officer");

  return (
    <main className="min-h-screen bg-blue-night px-6 py-16 text-white">
      <div className="max-w-3xl mx-auto">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-silver-light mb-2">
          Officer Portal
        </p>
        <h1 className="font-head font-black text-3xl uppercase mb-1">
          Welcome, {session.fullName ?? session.email}
        </h1>
        <p className="text-silver-light font-body mb-10">
          Executive Director briefs and officer-accountability findings
          surface here in Phase 3.
        </p>

        <div className="bg-white/10 border border-white/20 p-8">
          <p className="font-body">
            This is the officer dashboard placeholder — Level 1/2/3 review
            queue, the Weekly Executive Brief, and content-management tools
            for the role-play/test bank land here.
          </p>
        </div>

        <form action={logout} className="mt-8">
          <button className="font-head font-bold text-sm text-white/80 hover:text-white transition">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
