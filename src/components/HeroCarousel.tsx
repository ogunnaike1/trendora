"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Photo from "./Photo";
import { IMG } from "@/data/images";
import { useReducedMotion } from "@/lib/hooks";

const SLIDES = [
  { label: "The Travel Kitchen", line: "Hot meals on the road.", sub: "The 24V 2.5L air fryer — oil-free cooking straight from your truck socket.", img: IMG.heroAirFryer, href: "/products/24v-electric-air-fryer-2-5l", cta: "Shop the air fryer", pos: "center" },
  { label: "Kettles & Coffee", line: "Boil anywhere.", sub: "12V and 24V kettles, coffee makers and espresso makers for the cab or camper.", img: IMG.heroKettle, href: "/shop?group=Kettles%20%26%20Coffee", cta: "Shop kettles & coffee", pos: "center" },
  { label: "Lunch Boxes", line: "Hot lunch, any lay-by.", sub: "Electric lunch boxes that warm your meal from a vehicle socket.", img: IMG.heroLunchbox, href: "/shop?group=Lunch%20Boxes", cta: "Shop lunch boxes", pos: "center" },
  { label: "Cookers & Pans", line: "Cook it your way.", sub: "Compact rice cookers, multi cookers and electric pans built for 12V and 24V.", img: IMG.heroPan, href: "/shop?group=Cookers%20%26%20Pans", cta: "Shop cookers & pans", pos: "center" },
];
const DURATION = 6500;

export default function HeroCarousel() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tick, setTick] = useState(0); // restarts progress animation
  const drag = useRef<number | null>(null);

  const go = useCallback((n: number) => { setI((n + SLIDES.length) % SLIDES.length); setTick((t) => t + 1); }, []);
  const paused = userPaused || hover || hidden || reduced;

  useEffect(() => {
    const v = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", v);
    return () => document.removeEventListener("visibilitychange", v);
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, tick, go]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [i, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative h-svh min-h-[640px] overflow-hidden bg-slate touch-pan-y select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={(e) => { drag.current = e.clientX; }}
      onPointerUp={(e) => {
        if (drag.current == null) return;
        const dx = e.clientX - drag.current; drag.current = null;
        if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
      }}
    >
      {SLIDES.map((s, n) => {
        const active = n === i;
        return (
          <div
            key={s.label}
            aria-hidden={!active}
            className="absolute inset-0"
            style={{
              clipPath: reduced ? undefined : active ? "inset(0)" : "inset(0 0 0 100%)",
              opacity: reduced ? (active ? 1 : 0) : 1,
              zIndex: active ? 2 : 1,
              transition: reduced ? "opacity .6s linear" : "clip-path 1.3s var(--ease)",
            }}
          >
            <div className="absolute inset-0" style={{ animation: active && !reduced ? "kenburns 9s linear forwards" : undefined }}>
              <Photo src={s.img} alt={s.label} sizes="100vw" priority={n === 0} position={s.pos} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="glass absolute bottom-28 left-[var(--gutter)] max-w-[min(640px,calc(100%-2*var(--gutter)))] p-6 text-white md:p-10" style={{ background: "rgba(46,66,82,.55)" }}>
              <p className="label mb-5">{String(n + 1).padStart(2, "0")} — {s.label}</p>
              <h1 className="text-[clamp(44px,6.5vw,104px)] leading-[0.95]">
                <span className="block overflow-hidden">
                  <span className="block" style={{ transform: active ? "none" : "translateY(110%)", transition: `transform 1.1s var(--ease) ${active ? 0.45 : 0}s` }}>
                    {s.line}
                  </span>
                </span>
              </h1>
              <p className="mt-5 max-w-[440px] text-[15px] md:text-[17px]" style={{ opacity: active ? 1 : 0, transition: `opacity 1s var(--ease) ${active ? 0.9 : 0}s` }}>{s.sub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={s.href} className="btn btn-white" tabIndex={active ? 0 : -1}>{s.cta}</Link>
                <a href="#story" className="btn btn-outline" tabIndex={active ? 0 : -1}>Explore</a>
              </div>
            </div>
          </div>
        );
      })}
      <div className="glass absolute inset-x-[var(--gutter)] bottom-6 z-10 flex items-center gap-4 p-3 text-white">
        <span className="label w-16 tabular-nums">{String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
        <div className="flex flex-1 gap-2">
          {SLIDES.map((s, n) => (
            <button key={s.label} aria-label={`Go to slide ${n + 1}`} onClick={() => go(n)} className="relative h-6 flex-1">
              <span className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
              {n === i && (
                <span
                  key={tick}
                  className="absolute inset-x-0 top-1/2 h-px origin-left bg-white"
                  style={{ animation: `fill ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                />
              )}
              {n < i && <span className="absolute inset-x-0 top-1/2 h-px bg-white" />}
            </button>
          ))}
        </div>
        <button className="label px-2" onClick={() => setUserPaused((p) => !p)}>{userPaused ? "Play" : "Pause"}</button>
        <button className="size-11 border border-white/40" aria-label="Previous slide" onClick={() => go(i - 1)}>←</button>
        <button className="size-11 border border-white/40" aria-label="Next slide" onClick={() => go(i + 1)}>→</button>
      </div>
    </section>
  );
}
