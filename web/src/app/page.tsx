import Link from "next/link";

// Phase 1 placeholder home page. The full recruitment site content
// (hero, results showcase, alumni, awards, join CTA) migrates from the
// static index.html in Phase 2 — this page just proves the app boots
// and is on-brand in the meantime.
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center bg-blue-night text-white text-center px-6">
        <div>
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-silver-light mb-4">
            Norristown Area High School
          </p>
          <h1 className="font-head font-black text-5xl uppercase tracking-tight mb-6">
            DECA
          </h1>
          <p className="text-silver-light font-body max-w-md mx-auto mb-10">
            The new chapter platform is under construction. The public
            recruitment site remains live in the meantime.
          </p>
          <Link
            href="/login"
            className="btn-skew inline-block bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-4 hover:bg-blue-deep transition"
          >
            Member Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
