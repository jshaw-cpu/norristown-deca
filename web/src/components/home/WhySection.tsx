const REASONS = [
  {
    num: "01",
    title: "Build Your Resume",
    description:
      "Stand out to major universities and future employers with experience that proves you perform under pressure.",
  },
  {
    num: "02",
    title: "Travel And Compete",
    description:
      "Test your skills against the best students across Pennsylvania, the nation, and the world stage at ICDC.",
  },
  {
    num: "03",
    title: "Network Worldwide",
    description:
      "Connect with corporate mentors, alumni executives, and a community of over 260,000 ambitious peers.",
  },
];

export function WhySection() {
  return (
    <section id="why" className="bg-mist px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Why Norristown DECA
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night leading-tight mb-8">
            More than a club.
            <br />A launchpad.
          </h2>
          <div className="grid gap-6">
            {REASONS.map((reason) => (
              <div key={reason.num} className="flex gap-4">
                <span className="font-head font-black text-2xl text-blue">
                  {reason.num}
                </span>
                <div>
                  <h3 className="font-head font-bold text-blue-night mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-silver text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-night text-white p-10">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-silver-light mb-4">
            Our Mission
          </p>
          <p className="font-head font-black uppercase text-2xl leading-snug mb-6">
            To prepare students with the occupational competencies,
            leadership characteristics, and ethical standards needed to
            take their proper place in the business world.
          </p>
          <p className="text-silver-light">
            We don&rsquo;t produce participants. We develop industry
            consultants&mdash;and the chapter other chapters study.
          </p>
        </div>
      </div>
    </section>
  );
}
