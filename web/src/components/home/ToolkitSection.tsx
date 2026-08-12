const TOOLKIT = [
  {
    num: "01",
    title: "The 3-Step Role-Play System",
    items: [
      { label: "Read & Identify", detail: "Find the Performance Indicators. Know them cold by event category." },
      { label: "Build the Framework", detail: "Situation analysis → recommendation → implementation plan → measurable metrics." },
      { label: "Executive Presence", detail: "Confident posture, professional vocabulary, controlled pacing. The judge's lens is always on." },
    ],
  },
  {
    num: "02",
    title: "Written Event Blueprint",
    items: [
      { label: "Executive Summary", detail: "One tight page — your entire case in 5 sentences." },
      { label: "Situational Analysis", detail: "Data-driven. Generic analysis doesn't win." },
      { label: "SWOT", detail: "Be specific to the scenario — judges can spot filler." },
      { label: "Financial Plan", detail: "Show ROI. Numbers = credibility." },
      { label: "Appendix", detail: "Every source cited, every claim backed up." },
    ],
  },
  {
    num: "03",
    title: "Performance Indicators By Cluster",
    items: [
      { label: "Marketing", detail: "Product/Service Mgmt, Promotion, Selling, Market Research." },
      { label: "Finance", detail: "Financial Analysis, Risk Mgmt, Accounting, Economics." },
      { label: "Hospitality", detail: "Customer Relations, Operations, Event Planning, Lodging." },
      { label: "Management", detail: "Business Law, HR Management, Operations, Entrepreneurship." },
    ],
  },
];

export function ToolkitSection() {
  return (
    <section id="toolkit" className="bg-mist px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Member Toolkit
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Everything you need to compete.
          </h2>
          <p className="text-silver text-lg mt-6">
            Competition frameworks organized so you spend less time
            searching and more time winning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {TOOLKIT.map((card) => (
            <div key={card.num} className="bg-paper border border-silver-light p-8">
              <p className="font-head font-black text-3xl text-[#dde6ef] mb-2">
                {card.num}
              </p>
              <h3 className="font-head font-black text-lg uppercase text-blue-night mb-4">
                {card.title}
              </h3>
              <ul className="grid gap-3">
                {card.items.map((item) => (
                  <li key={item.label}>
                    <p className="font-head font-bold text-sm text-blue">
                      {item.label}
                    </p>
                    <p className="text-silver text-sm leading-snug">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
