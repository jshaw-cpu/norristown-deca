const RUNGS = [
  {
    big: "01",
    level: "Level One",
    title: "Districts",
    description:
      "Your first proving ground. Master the performance indicators and learn what it takes to advance.",
  },
  {
    big: "02",
    level: "Level Two",
    title: "States",
    description:
      "Pennsylvania DECA. Compete for state titles, leadership roles, and a qualifying spot on the national roster.",
  },
  {
    big: "03",
    level: "Level Three",
    title: "ICDC",
    description:
      "The International Career Development Conference. Where elite chapters cement a world class legacy.",
  },
];

export function CompeteLadder() {
  return (
    <section id="compete" className="bg-paper px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            The Competitive Ladder
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Classroom to international stage.
          </h2>
          <p className="text-silver text-lg mt-6">
            Members climb a proven pathway, polished through role play
            mastery, written event coaching, and the judge&rsquo;s lens of
            executive presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {RUNGS.map((rung) => (
            <div key={rung.big} className="bg-mist p-8 border-t-4 border-blue">
              <p className="font-head font-black text-4xl text-[#dde6ef] mb-2">
                {rung.big}
              </p>
              <p className="font-head font-bold text-xs uppercase tracking-[0.14em] text-blue mb-1">
                {rung.level}
              </p>
              <h3 className="font-head font-black text-xl uppercase text-blue-night mb-3">
                {rung.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed">
                {rung.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://www.deca.org"
            target="_blank"
            rel="noopener"
            className="font-head font-bold text-sm text-blue hover:text-blue-deep transition"
          >
            Explore Competitive Events &rarr;
          </a>
          <a
            href="https://www.mypadeca.org/"
            target="_blank"
            rel="noopener"
            className="font-head font-bold text-sm text-blue hover:text-blue-deep transition"
          >
            Pennsylvania DECA Portal &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
