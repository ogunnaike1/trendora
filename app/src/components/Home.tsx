"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import ProductCard from "./ProductCard";
import Placeholder from "./Placeholder";
import { products } from "@/data/products";
import { useReducedMotion } from "@/lib/hooks";
import { useStore } from "@/store/useStore";

const CATS = [
  { name: "Lighting", n: 8, col: "1 / span 5", ratio: "4/5", mt: 0, tone: 0.42 },
  { name: "Vases", n: 12, col: "6 / span 3", ratio: "3/4", mt: 90, tone: 0.7 },
  { name: "Textiles", n: 14, col: "9 / span 4", ratio: "4/5", mt: 30, tone: 0.55 },
  { name: "Candles", n: 9, col: "2 / span 4", ratio: "1/1", mt: 0, tone: 0.62 },
  { name: "Tableware", n: 16, col: "7 / span 5", ratio: "5/4", mt: -60, tone: 0.48 },
];
const ROOMS = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Bathroom"];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduced) return setV(to);
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduced]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function SectionHead({ title, link }: { title: React.ReactNode; link?: [string, string] }) {
  return (
    <div className="hairline reveal mb-12 flex items-end justify-between gap-6 pb-6">
      <h2 className="text-[clamp(34px,4.5vw,64px)] leading-none">{title}</h2>
      {link && <Link href={link[1]} className="link-arrow">{link[0]} →</Link>}
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const roomWrap = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const showToast = useStore((s) => s.showToast);

  // Scroll-driven: horizontal pin, parallax, background crossfade
  useEffect(() => {
    const stoneSections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg='stone']"));
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const wrap = roomWrap.current, track = trackRef.current;
      if (wrap && track && !reduced) {
        const r = wrap.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        track.style.transform = `translate3d(${-p * (track.scrollWidth - window.innerWidth + 80)}px,0,0)`;
      }
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        if (reduced) return;
        const r = el.parentElement!.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax!);
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * speed}px,0)`;
      });
      const mid = vh / 2;
      const inStone = stoneSections.some((s) => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; });
      document.body.dataset.bg = inStone ? "stone" : "white";
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [reduced]);

  const bestsellers = products.filter((p) => p.featured).slice(0, 4);
  const arrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      <HeroCarousel />

      {/* Marquee */}
      <div className="label overflow-hidden bg-stone py-4" aria-hidden>
        <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-10 pr-10">
              {["Complimentary delivery", "Handpicked pieces", "Easy 30-day returns", "Made in small batches"].map((t) => (
                <span key={t} className="whitespace-nowrap">{t} •</span>
              ))}
              {["Complimentary delivery", "Handpicked pieces", "Easy 30-day returns", "Made in small batches"].map((t) => (
                <span key={t + "2"} className="whitespace-nowrap">{t} •</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="section gutter">
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(44px,7vw,104px)] leading-[0.95]">Shop by <em>category</em></h2>
          <p className="max-w-[300px] text-[15px]">Five edits of the objects that quietly make a house feel like a home.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          {CATS.map((c, n) => (
            <Link
              key={c.name}
              href={`/shop?category=${c.name}`}
              className="reveal group block md:[grid-column:var(--col)] md:[margin-top:var(--mt)]"
              style={{ ["--col" as string]: c.col, ["--mt" as string]: `${c.mt}px`, ["--i" as string]: n }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: c.ratio }}>
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-105"><Placeholder tone={c.tone} /></div>
                <span className="glass label absolute bottom-4 left-4 px-3 py-1 text-white">Collection</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-b border-slate pb-2">
                <span className="serif text-[28px]">{c.name}</span>
                <span className="label">{c.n} pieces →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="gutter pb-[var(--section-y)]">
        <SectionHead title={<>The considered <em>edit</em></>} link={["View all", "/shop"]} />
        <div className="grid gap-x-5 gap-y-10 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {bestsellers.map((p, n) => <ProductCard key={p.id} product={p} index={n} />)}
        </div>
      </section>

      {/* Brand story */}
      <section id="story" data-bg="stone" className="section gutter bg-stone/0">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="relative md:col-span-6">
            <div className="mask-reveal aspect-[4/5] overflow-hidden"><Placeholder tone={0.66} label="Studio interior" /></div>
            <div className="absolute -bottom-10 right-0 w-[46%] border-[10px] border-stone">
              <div data-parallax="-0.14" className="aspect-square will-change-transform"><Placeholder tone={0.5} /></div>
            </div>
          </div>
          <div className="glass reveal p-8 md:col-span-6 md:-ml-[6%] md:p-14" style={{ background: "rgba(255,255,255,.5)", color: "var(--slate)" }}>
            <p className="label mb-6 text-mist">Our philosophy</p>
            <h2 className="text-[clamp(34px,4.5vw,64px)] leading-none">Objects that make a space feel like <em>yours.</em></h2>
            <p className="mt-6 max-w-[520px] text-[16px]">We work with small studios to bring you pieces that are honest in material and quiet in form — made to be lived with, not just looked at.</p>
            <div className="mt-10 flex gap-14">
              <div><p className="serif text-6xl"><CountUp to={42} /></p><p className="label">Partner studios</p></div>
              <div><p className="serif text-6xl"><CountUp to={100} suffix="%" /></p><p className="label">Natural materials</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by room — pinned horizontal scroll */}
      <section ref={roomWrap} className="relative bg-slate text-white" style={{ height: reduced ? "auto" : "340vh" }}>
        <div className={reduced ? "py-20" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"}>
          <h2 className="gutter mb-10 text-[clamp(44px,7vw,104px)] leading-[0.95]">Shop by <em>room</em></h2>
          <div ref={trackRef} className={`flex gap-6 gutter will-change-transform ${reduced ? "overflow-x-auto" : ""}`}>
            {ROOMS.map((r, n) => (
              <Link key={r} href="/shop" className="group relative shrink-0 aspect-[3/4] w-[clamp(220px,24vw,360px)]" style={{ marginTop: n % 2 ? 60 : 0 }}>
                <div className="absolute inset-0 overflow-hidden"><div className="h-full transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-105"><Placeholder tone={0.3 + (n % 3) * 0.08} /></div></div>
                <span className="glass label absolute bottom-4 left-4 px-3 py-2">{String(n + 1).padStart(2, "0")} / {r}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="section gutter">
        <SectionHead title={<>New <em>arrivals</em></>} link={["See all new", "/shop?new=1"]} />
        <div className="grid gap-x-5 gap-y-10 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {arrivals.map((p, n) => <ProductCard key={p.id} product={{ ...p, badge: "New" }} index={n} />)}
        </div>
      </section>

      {/* Feature banner */}
      <section className="relative grid h-[90vh] max-h-[780px] place-items-center overflow-hidden">
        <div data-parallax="0.22" className="absolute -inset-[15%] will-change-transform"><Placeholder tone={0.44} /></div>
        <div className="glass reveal relative mx-[var(--gutter)] max-w-[620px] p-8 text-center text-white md:p-14">
          <p className="label mb-4">The Autumn Collection</p>
          <h2 className="text-[clamp(34px,4.5vw,64px)] leading-none">The art of a <em className="!text-white/80">considered</em> home.</h2>
          <Link href="/shop" className="btn btn-white mt-8">Explore the collection</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section gutter">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["The Arca vase is even lovelier in person — it's changed how our hallway feels.", "Imogen R.", "London"],
            ["Beautifully packed, beautifully made. The Nube throw lives on our sofa now.", "Daniel K.", "Berlin"],
            ["Everything I've bought has felt quietly special. Trendora has become my first stop.", "Sofia M.", "Lisbon"],
          ].map(([q, n, c], i) => (
            <figure key={n} className="reveal border-t border-slate pt-6 md:[margin-top:var(--mt)]" style={{ ["--mt" as string]: i === 1 ? "40px" : "0", ["--i" as string]: i }}>
              <blockquote className="serif text-[26px] leading-snug">“{q}”</blockquote>
              <figcaption className="label mt-6">{n} — {c}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section data-bg="stone" className="section gutter">
        <div className="reveal grid items-end gap-10 md:grid-cols-2">
          <h2 className="text-[clamp(44px,7vw,104px)] leading-[0.95]">A little inspiration for your space.</h2>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (/^\S+@\S+\.\S+$/.test(email)) { showToast("Thank you — welcome to Trendora"); setEmail(""); }
              else showToast("Please enter a valid email");
            }}
            className="flex items-end gap-4 border-b border-slate pb-2"
          >
            <label className="sr-only" htmlFor="nl">Email address</label>
            <input id="nl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 bg-transparent py-2 text-lg outline-none placeholder:text-mist" />
            <button className="label hover:text-mist">Subscribe →</button>
          </form>
        </div>
      </section>

      {/* Social grid */}
      <section className="section gutter">
        <div className="hairline reveal mb-10 flex items-end justify-between pb-6">
          <h2 className="text-[clamp(34px,4.5vw,64px)] leading-none">@trendora.home</h2>
          <a href="#" className="link-arrow">Follow →</a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {Array.from({ length: 6 }, (_, n) => (
            <div key={n} className="reveal aspect-square overflow-hidden" style={{ ["--i" as string]: n }}><Placeholder tone={0.4 + (n % 4) * 0.1} /></div>
          ))}
        </div>
      </section>
    </>
  );
}
