const STATS = [
  { value: "55+", label: "Years Strong" },
  { value: "4", label: "Career Clusters" },
  { value: "15", label: "Student Officers" },
  { value: "ICDC", label: "Our Standard" },
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative bg-blue-night text-white overflow-hidden px-6 pt-24 pb-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-silver-light mb-5">
          Norristown Area High School &middot; Pennsylvania DECA
        </p>
        <h1 className="font-head font-black uppercase leading-[0.95] text-5xl md:text-7xl tracking-tight">
          Own Your
          <br />
          <span className="text-blue">Future.</span> Lead The Pack.
        </h1>
        <p className="font-body text-silver-light text-lg max-w-xl mx-auto mt-8">
          This is not a club. It is the launchpad for the next generation of
          emerging leaders and entrepreneurs in marketing, finance,
          hospitality, and management.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="https://forms.gle/xpHnSD8nEW9cNB5M9"
            target="_blank"
            rel="noopener"
            className="btn-skew inline-flex items-center gap-2 bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-4 hover:bg-blue-deep transition"
          >
            Apply for Membership &rarr;
          </a>
          <a
            href="#results"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-head font-extrabold uppercase text-sm px-8 py-4 hover:border-white transition"
          >
            See How We Win
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <b className="block font-head font-black text-4xl text-white">
                {stat.value}
              </b>
              <span className="font-head font-semibold text-[0.72rem] uppercase tracking-[0.16em] text-silver-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
