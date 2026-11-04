"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Adds `.in` to any `.reveal` / `.mask-reveal` element once visible. Re-runs on `dep` change. */
export function useRevealOnScroll(dep?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in), .mask-reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

export function useScrollY() {
  const [y, setY] = useState(0);
  const last = useRef(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = window.scrollY;
        if (Math.abs(v - last.current) > 4) setDir(v > last.current ? "down" : "up");
        last.current = v;
        setY(v);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return { y, dir };
}
