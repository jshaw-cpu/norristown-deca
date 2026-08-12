import Image from "next/image";

export function AdvisorSection() {
  return (
    <section id="advisor" className="bg-paper px-6 py-24">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div className="bg-blue-night text-white p-8">
          <Image
            src="/gallery/mr-shaw.png"
            alt="Mr. John Shaw"
            width={400}
            height={400}
            className="w-full max-w-[220px] h-auto mx-auto mb-6 border border-white/20"
          />
          <h3 className="font-head font-black text-xl uppercase mb-1">
            Mr. John Shaw
          </h3>
          <p className="text-silver-light text-sm mb-4">
            Chapter Advisor &middot; Business Dept. Chair
            <br />
            Marketing Teacher and Co-op Coordinator
          </p>
          <a
            href="mailto:jshaw@nasd.k12.pa.us"
            className="block text-sm text-[#8fc4ee] hover:text-white transition"
          >
            jshaw@nasd.k12.pa.us
          </a>
          <p className="text-sm text-silver-light">610.630.5090</p>
        </div>

        <div>
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Guided By Experience
          </p>
          <h2 className="font-head font-black uppercase text-3xl md:text-4xl tracking-tight text-blue-night leading-tight mb-6">
            Coaching the next generation of industry leaders.
          </h2>
          <p className="text-silver mb-6">
            With nearly three decades in marketing education, Mr. Shaw
            directs classroom integrated, project-based activities that
            apply high-level business knowledge to real industry
            situations&mdash;pushing every Eagle from test-taker to
            industry consultant.
          </p>
          <blockquote className="border-l-4 border-blue pl-5 font-head font-bold italic text-blue-night">
            &ldquo;The mediocre teacher tells. The good teacher explains.
            The superior teacher demonstrates. The great teacher
            inspires.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
