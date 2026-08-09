import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-blue-night text-white/72 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-10 pb-10 border-b border-white/10">
          <div>
            <p className="font-head font-black text-lg uppercase text-white mb-2">
              NAHS DECA
            </p>
            <p className="text-sm text-white/60 max-w-xs">
              Norristown Area High School &middot; Pennsylvania DECA
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm font-head font-bold">
            <a href="#results" className="hover:text-white transition">
              Results
            </a>
            <a href="#alumni" className="hover:text-white transition">
              Alumni
            </a>
            <a href="#awards" className="hover:text-white transition">
              Awards
            </a>
            <a href="#join" className="hover:text-white transition">
              Join
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm font-head font-bold">
            <a
              href="mailto:jshaw@nasd.k12.pa.us"
              className="hover:text-white transition"
            >
              Email Mr. Shaw
            </a>
            <a
              href="https://www.deca.org"
              target="_blank"
              rel="noopener"
              className="hover:text-white transition"
            >
              DECA Inc.
            </a>
            <Link href="/login" className="hover:text-white transition">
              Member Sign In
            </Link>
          </div>
        </div>

        <p className="text-xs text-white/40 pt-6">
          &copy; {new Date().getFullYear()} Norristown Area High School DECA.
        </p>
      </div>
    </footer>
  );
}
