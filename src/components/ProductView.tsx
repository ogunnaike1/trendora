"use client";
import Link from "next/link";
import { useState } from "react";
import Photo from "./Photo";
import ProductCard from "./ProductCard";
import { effectivePrice, fmt, products, type Product } from "@/data/products";
import { useStore } from "@/store/useStore";

export default function ProductView({ product: p }: { product: Product }) {
  const [color, setColor] = useState(p.colors[0].name);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const add = useStore((s) => s.addToCart);
  const wished = useStore((s) => s.wishlist.includes(p.id));
  const toggle = useStore((s) => s.toggleWishlist);
  const related = products.filter((x) => x.id !== p.id && x.category === p.category).concat(products.filter((x) => x.id !== p.id && x.category !== p.category)).slice(0, 4);

  const accordions = [
    ["Details", p.description],
    ["Materials & dimensions", `${p.materials}. ${p.dimensions}.`],
    ["Shipping & returns", "Complimentary delivery over $150, otherwise $12. Easy returns within 30 days of delivery."],
  ];

  return (
    <div className="gutter pb-[var(--section-y)] pt-[150px]">
      <nav aria-label="Breadcrumb" className="label mb-8 text-mist">
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <Link href={`/shop?category=${p.category}`}>{p.category}</Link> / <span className="text-slate">{p.name}</span>
      </nav>
      <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] lg:gap-20">
        <div className="flex gap-4">
          <div className="flex w-[72px] shrink-0 flex-col gap-3">
            {p.images.map((t, n) => (
              <button key={n} onClick={() => setImg(n)} aria-label={`Image ${n + 1}`} aria-current={n === img} className={`aspect-square overflow-hidden transition-opacity ${n === img ? "outline outline-1 outline-offset-2 outline-slate" : "opacity-70 hover:opacity-100"}`}>
                <Photo src={t} sizes="72px" />
              </button>
            ))}
          </div>
          <div className="aspect-[4/5] flex-1 overflow-hidden"><Photo src={p.images[img]} alt={`${p.name} image ${img + 1}`} sizes="(min-width: 1024px) 45vw, 100vw" priority /></div>
        </div>

        <div className="max-w-[520px]">
          <p className="label text-mist">{p.category}</p>
          <h1 className="mt-2 text-[clamp(44px,5vw,72px)] leading-none">{p.name}</h1>
          <p className="mt-4 flex items-center gap-4 text-lg">
            <span>{p.salePrice && <s className="mr-2 text-mist">{fmt(p.price)}</s>}{fmt(effectivePrice(p))}</span>
            <span className="text-sm text-mist">★ {p.rating} ({p.reviewCount})</span>
          </p>
          <p className="mt-6">{p.description}</p>

          <fieldset className="mt-8">
            <legend className="label mb-3">Colour — {color}</legend>
            <div className="flex gap-3">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  aria-pressed={c.name === color}
                  onClick={() => setColor(c.name)}
                  className="size-[34px] rounded-full"
                  style={{ background: `oklch(${c.tone} 0.035 245)`, outline: c.name === color ? "1px solid var(--slate)" : "none", outlineOffset: 3 }}
                />
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-slate/40">
              <button className="size-[52px]" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="size-[52px]" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(p.stock, q + 1))}>+</button>
            </div>
            <button className="btn flex-1" onClick={() => add(p.id, color, qty)}>Add to bag — {fmt(effectivePrice(p) * qty)}</button>
            <button className="grid size-[52px] place-items-center border border-slate/40 text-xl" aria-label={wished ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={wished} onClick={() => toggle(p.id)}>{wished ? "♥" : "♡"}</button>
          </div>
          <p className="label mt-4 text-mist">{p.stock > 10 ? "In stock" : `Only ${p.stock} left`}</p>

          <div className="mt-10 border-t border-slate/25">
            {accordions.map(([t, body], n) => (
              <div key={t} className="border-b border-slate/25">
                <button className="label flex w-full items-center justify-between py-5" aria-expanded={open === n} onClick={() => setOpen(open === n ? null : n)}>
                  {t}<span>{open === n ? "−" : "+"}</span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-[600ms] ease-[var(--ease)]" style={{ gridTemplateRows: open === n ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden"><p className="pb-5 text-[15px]">{body}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-[var(--section-y)]">
        <h2 className="hairline mb-10 pb-6 text-[clamp(34px,4.5vw,64px)] leading-none">You may also <span className="accent">like</span></h2>
        <div className="grid gap-x-5 gap-y-10 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {related.map((r, n) => <ProductCard key={r.id} product={r} index={n} />)}
        </div>
      </section>
    </div>
  );
}
