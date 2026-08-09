export function JoinCta() {
  return (
    <section id="join" className="bg-blue text-white px-6 py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-white/70 mb-3">
          Take The First Step
        </p>
        <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight leading-tight">
          Your future starts with one decision.
        </h2>
        <p className="text-white/88 text-lg mt-6">
          Ready to claim your spot? Fill out the membership form below. An
          officer will follow up with meeting details and next steps.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="https://forms.gle/xpHnSD8nEW9cNB5M9"
            target="_blank"
            rel="noopener"
            className="btn-skew inline-block bg-white text-blue font-head font-extrabold uppercase text-sm px-8 py-4 hover:bg-blue-night hover:text-white transition"
          >
            Apply for Membership Today &rarr;
          </a>
          <a
            href="mailto:jshaw@nasd.k12.pa.us"
            className="inline-block border-2 border-white/40 text-white font-head font-extrabold uppercase text-sm px-8 py-4 hover:border-white transition"
          >
            Email Mr. Shaw
          </a>
        </div>
        <p className="text-sm text-white/78 mt-6">
          Applications are reviewed by the officer team. Membership is open
          to all NAHS students enrolled in a business or marketing course.
        </p>
      </div>
    </section>
  );
}
