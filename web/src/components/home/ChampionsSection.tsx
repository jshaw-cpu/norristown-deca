import Image from "next/image";

const FEATURED = {
  placement: "2nd",
  event: "Virtual Business Challenge: Retailing",
  names: "Jack Casey & Andrew Wolenter",
  year: "ICDC 2006",
  photo: "/champions/jack-andrew-2006.png",
};

const CHAMPIONS = [
  {
    num: "01",
    placement: "2nd",
    event: "Food Marketing",
    detail: "Dave Wrigley — Triple Medallion",
    year: "ICDC 2004",
    photo: "/champions/dave-wrigley-2004.jpg" as string | null,
  },
  {
    num: "02",
    placement: "2nd",
    event: "Virtual Business Challenge — Retailing",
    detail: "Jack Casey & Andrew Wolenter",
    year: "ICDC 2006",
    photo: null as string | null,
  },
  {
    num: "03",
    placement: "Top 10",
    event: "Business Law & Ethics",
    detail: "Chrissy Kratz & Lynne Kolodinsky — 5th Overall & Test Medallion",
    year: "ICDC 2006",
    photo: null as string | null,
  },
  {
    num: "04",
    placement: "Top 10",
    event: "E-Commerce Business Plan",
    detail: "Duong / Wrigley / Piazza — 5th Overall",
    year: "ICDC 2005",
    photo: null as string | null,
  },
  {
    num: "05",
    placement: "5th",
    event: "Hotel & Lodging Management",
    detail: "Amanda Assenmacher — Exam Medallion",
    year: "ICDC 2012",
    photo: null as string | null,
  },
  {
    num: "06",
    placement: "4th",
    event: "DECA Quiz Bowl",
    detail: "Jason VanBuskirk",
    year: "ICDC 2002",
    photo: null as string | null,
  },
];

const ROLL = [
  { event: "Food Marketing AL", names: "Dave Wrigley", result: "Finalist", year: "2003" },
  { event: "Business Services Marketing", names: "Jackie Maher", result: "Finalist", year: "2005 & 2006" },
  { event: "Business Services Marketing", names: "Jackie Lannutti", result: "Finalist", year: "2004" },
  { event: "Apparel & Accessories", names: "Paul Perry", result: "Finalist", year: "2001 & 2002" },
  { event: "Business Law & Ethics", names: "Kratz & Kolodinsky", result: "Finalist", year: "2007" },
  { event: "Entrepreneurship Written", names: "Catania / Haring / Maher", result: "Finalist — 16th", year: "2003" },
  { event: "Food Marketing ML", names: "Edward J. Yorgey", result: "Top Ten", year: "2005" },
  { event: "Retail Merchandising AL", names: "Rachel Semigran", result: "Top Ten", year: "2005" },
  { event: "Retail Merchandising AL", names: "Tinuke Oyefule", result: "Finalist", year: "2005" },
  { event: "Public Relations Project", names: "Ellick & Fox", result: "Finalist", year: "2013" },
  { event: "VB Challenge — Retailing", names: "Casey & Wolenter", result: "5th Place", year: "2007" },
  { event: "VB Challenge — Sports", names: "Nguyen / Marcinek / DeCarlo", result: "4th Place", year: "2007" },
];

const SCHOLARSHIPS = [
  { name: "Marques Stewart", year: "ICDC — 2004" },
  { name: "Lili Hernandez", year: "ICDC — 2025" },
  { name: "Dayanis Morales", year: "ICDC — 2026" },
];

export function ChampionsSection() {
  return (
    <section id="champions" className="bg-blue-night text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-[#4aa3e8] mb-3">
            ICDC Hall of Champions
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight">
            Eagles who competed on the world stage.
          </h2>
          <p className="text-silver-light text-lg mt-6">
            Our members have stood on the ICDC floor and delivered. These
            are the results that define what the Norristown standard looks
            like in practice.
          </p>
        </div>

        <div className="bg-white/10 border border-white/15 p-8 mb-12 grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <Image
            src={FEATURED.photo}
            alt={FEATURED.names}
            width={220}
            height={280}
            className="w-full max-w-[220px] h-auto mx-auto border border-white/20"
          />
          <div className="text-center md:text-left">
            <p className="font-head font-black text-3xl uppercase mb-1">
              {FEATURED.placement} Place, {FEATURED.year}
            </p>
            <p className="font-head font-bold text-[#8fc4ee] uppercase tracking-wide text-sm mb-2">
              {FEATURED.event}
            </p>
            <p className="text-silver-light">{FEATURED.names}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {CHAMPIONS.map((c) => (
            <div key={c.num} className="bg-white/5 border border-white/10 p-6">
              {c.photo && (
                <Image
                  src={c.photo}
                  alt={c.detail}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover mb-4 border border-white/10"
                />
              )}
              <p className="font-head font-black text-xs text-white/40 mb-2">{c.num}</p>
              <p className="font-head font-black text-2xl text-[#4aa3e8] mb-1">{c.placement}</p>
              <p className="font-head font-bold uppercase text-sm mb-2">{c.event}</p>
              <p className="text-silver-light text-sm">{c.detail}</p>
              <p className="text-white/40 text-xs mt-2">&#9674; {c.year}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 mb-14">
          <ul className="divide-y divide-white/10">
            {ROLL.map((r, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 px-6 py-4"
              >
                <div>
                  <p className="font-head font-bold text-sm">{r.event}</p>
                  <p className="text-silver-light text-xs">{r.names}</p>
                </div>
                <span className="font-head font-black text-xs uppercase text-[#4aa3e8]">
                  {r.result} &middot; {r.year}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-[#4aa3e8] mb-6">
            ICDC Scholarship Recipients
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {SCHOLARSHIPS.map((s) => (
              <div key={s.name}>
                <p className="font-head font-black text-lg">{s.name}</p>
                <p className="text-silver-light text-xs">&#9674; DECA Scholarship &middot; {s.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
