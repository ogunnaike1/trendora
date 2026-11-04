"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useScrollY } from "@/lib/hooks";
import { useStore, useCartTotals } from "@/store/useStore";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?new=1", label: "New" },
  { href: "/#categories", label: "Collections" },
];

export default function Header() {
  const { y, dir } = useScrollY();
  const pathname = usePathname();
  const wishCount = useStore((s) => s.wishlist.length);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const { count } = useCartTotals();

  const onHero = pathname === "/" && y < 60;
  const hidden = y > 200 && dir === "down";
  const progress = typeof document !== "undefined" ? Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) : 0;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div className="h-full origin-left bg-mist" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header
        className="fixed inset-x-0 top-0 z-40 grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gutter"
        style={{
          transform: hidden ? "translateY(-110%)" : "none",
          transition: "transform .6s var(--ease), background-color .6s var(--ease), color .6s var(--ease)",
          background: onHero ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.62)",
          backdropFilter: "blur(18px) saturate(1.3)",
          WebkitBackdropFilter: "blur(18px) saturate(1.3)",
          color: onHero ? "#fff" : "var(--slate)",
          borderBottom: onHero ? "1px solid transparent" : "1px solid var(--slate)",
        }}
      >
        <Link href="/" aria-label="Trendora home"><Logo /></Link>
        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="label hover:text-mist">{n.label}</Link>
          ))}
        </nav>
        <div className="col-start-3 flex items-center justify-end gap-6 max-md:col-start-2">
          <Link href="/wishlist" className="label hover:text-mist">Wishlist ({wishCount})</Link>
          <button onClick={() => setCartOpen(true)} className="label hover:text-mist" aria-label={`Open bag, ${count} items`}>Bag ({count})</button>
        </div>
      </header>
    </>
  );
}
