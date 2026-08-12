const CLUSTERS = [
  {
    num: "01 / MKT",
    title: "Marketing",
    description:
      "Brand strategy, advertising, digital commerce, and the creative hooks that command a judge's attention.",
  },
  {
    num: "02 / FIN",
    title: "Finance",
    description:
      "Corporate investing, banking, and the return on investment analysis that separates consultants from test takers.",
  },
  {
    num: "03 / HOS",
    title: "Hospitality",
    description:
      "Tourism management, event planning, and the operational logistics behind world class experiences.",
  },
  {
    num: "04 / MGT",
    title: "Management",
    description:
      "Business operations, human resources, and the executive presence that defines real leadership.",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="bg-paper px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Explore The Field
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Four clusters. One edge.
          </h2>
          <p className="text-silver text-lg mt-6">
            Every member builds genuine expertise in the disciplines that
            drive the global economy, then proves it on the competition
            floor.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-7">
          {CLUSTERS.map((cluster) => (
            <div key={cluster.title} className="border-t-4 border-blue pt-6">
              <p className="font-head font-black text-sm text-blue mb-2">
                {cluster.num}
              </p>
              <h3 className="font-head font-black text-xl uppercase text-blue-night mb-3">
                {cluster.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed">
                {cluster.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
