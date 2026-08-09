const AWARDS = [
  {
    icon: "♦",
    label: "Senior Award",
    title: "Jerry DiGiovanni Memorial Award",
    description:
      "Presented to a graduating member who demonstrates academic preparedness, community orientation, professional responsibility, and exceptional leadership through DECA.",
    featured: false,
  },
  {
    icon: "◆",
    label: "Distinguished Honor",
    title: "DECA Diamond Award",
    description:
      "The chapter’s most distinguished recognition, reserved for members who demonstrate outstanding dedication to leadership and provide significant support to NAHS DECA and the broader community.",
    featured: true,
  },
  {
    icon: "△",
    label: "Underclassman Award",
    title: "DECA Emerging Leader Award",
    description:
      "Recognizes an active underclassman who is academically prepared, community-oriented, professionally responsible, and has demonstrated meaningful leadership potential.",
    featured: false,
  },
];

export function AwardsSection() {
  return (
    <section id="awards" className="bg-paper px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Chapter Recognition
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Awards that define a standard.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {AWARDS.map((award) => (
            <div
              key={award.title}
              className={`rounded-2xl p-10 border-t-4 border-blue transition hover:-translate-y-1.5 ${
                award.featured
                  ? "bg-blue-night text-white"
                  : "bg-white text-ink"
              }`}
            >
              <div
                className={`text-3xl mb-3 ${
                  award.featured ? "text-white/70" : "text-blue"
                }`}
              >
                {award.icon}
              </div>
              <p
                className={`font-head font-bold text-[0.7rem] uppercase tracking-[0.1em] mb-2 ${
                  award.featured ? "text-white/60" : "text-blue"
                }`}
              >
                {award.label}
              </p>
              <h3
                className={`font-head font-black text-xl leading-tight mb-3.5 ${
                  award.featured ? "text-white" : "text-blue-night"
                }`}
              >
                {award.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  award.featured ? "text-white/82" : "text-[#444]"
                }`}
              >
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
