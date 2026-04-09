const DEFAULT_CLIENTS = [
  "APPLE",
  "CARTIER",
  "HBO",
  "COCA-COLA",
  "FENDI",
  "GUCCI",
  "GRUBHUB",
  "CANADA GOOSE",
  "NETFLIX",
  "BOTTEGA VENETA",
  "VANS",
  "MOXY HOTEL",
  "MAISON VALENTINO",
  "MISGUIDED SPIRITS",
  "DIALOG CAFE",
];

interface ClientMarqueeProps {
  clients?: string[];
}

export default function ClientMarquee({ clients }: ClientMarqueeProps) {
  const list = clients && clients.length > 0 ? clients : DEFAULT_CLIENTS;
  const marqueeContent = list.map((c) => c.toUpperCase()).join("  \u2014  ");
  const doubled = `${marqueeContent}  \u2014  ${marqueeContent}  \u2014  `;

  return (
    <section className="py-8 md:py-10 overflow-hidden bg-rust">
      <div className="relative">
        <div className="animate-marquee whitespace-nowrap font-display text-sm md:text-base tracking-[0.1em] text-white/90 font-bold uppercase">
          <span>{doubled}</span>
        </div>
      </div>
    </section>
  );
}
