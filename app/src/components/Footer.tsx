import Link from "next/link";

const COLS = [
  { title: "Shop", links: [["All objects", "/shop"], ["New arrivals", "/shop?new=1"], ["Lighting", "/shop?category=Lighting"], ["Vases", "/shop?category=Vases"], ["Textiles", "/shop?category=Textiles"]] },
  { title: "Service", links: [["Shipping", "/cart"], ["Returns", "/cart"], ["Contact", "/cart"], ["FAQ", "/cart"]] },
  { title: "Trendora", links: [["Our philosophy", "/#story"], ["Journal", "/"], ["Stockists", "/"], ["Careers", "/"]] },
];

export default function Footer() {
  return (
    <footer className="bg-slate text-stone gutter pt-24 pb-8">
      <p className="serif text-[clamp(56px,16vw,240px)] leading-[0.85] tracking-[0.06em]">TRENDORA</p>
      <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <p className="max-w-sm text-[15px] opacity-80">Considered objects for a calmer home — handpicked from small studios and made in small batches.</p>
        {COLS.map((c) => (
          <div key={c.title}>
            <h3 className="label mb-4 !font-sans !tracking-[0.2em] text-mist">{c.title}</h3>
            <ul className="space-y-2 text-[15px]">
              {c.links.map(([l, h]) => <li key={l}><Link href={h} className="hover:text-mist">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="label mt-20 flex flex-wrap justify-between gap-4 border-t border-stone/20 pt-6 opacity-70">
        <span>© 2026 Trendora</span>
        <span>Visa · Mastercard · Amex · Apple Pay · PayPal</span>
      </div>
    </footer>
  );
}
