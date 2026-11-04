"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIES, effectivePrice, products } from "@/data/products";
import { useStore } from "@/store/useStore";

export default function ShopView({ mode }: { mode: "shop" | "wishlist" }) {
  const sp = useSearchParams();
  const router = useRouter();
  const wishlist = useStore((s) => s.wishlist);
  const [sort, setSort] = useState("featured");
  const category = sp.get("category");
  const group = sp.get("group");
  const onlyNew = sp.get("new") === "1";

  const list = useMemo(() => {
    let l = mode === "wishlist" ? products.filter((p) => wishlist.includes(p.id)) : products;
    if (category) l = l.filter((p) => p.category === category);
    if (group) l = l.filter((p) => p.group === group);
    if (onlyNew) l = l.filter((p) => p.isNew);
    if (sort === "low") l = [...l].sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "high") l = [...l].sort((a, b) => effectivePrice(b) - effectivePrice(a));
    return l;
  }, [mode, wishlist, category, group, onlyNew, sort]);

  const title = mode === "wishlist" ? "Wishlist" : onlyNew ? "New arrivals" : group ?? category ?? "All objects";
  const setCat = (c: string | null) => router.push(c ? `/shop?category=${encodeURIComponent(c)}` : "/shop");

  return (
    <div className="gutter pb-[var(--section-y)] pt-[150px]">
      <div className="hairline flex flex-wrap items-end justify-between gap-4 pb-6">
        <h1 className="text-[clamp(56px,10vw,128px)] leading-[0.92]">{title}</h1>
        <p className="label">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
      </div>

      {mode === "shop" && (
        <div className="my-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {[null, ...CATEGORIES].map((c) => {
              const active = !onlyNew && !group && (c ?? null) === category;
              return (
                <button
                  key={c ?? "all"}
                  onClick={() => setCat(c)}
                  aria-pressed={active}
                  className={`label border border-slate px-4 py-2 transition-colors duration-500 ${active ? "bg-slate text-white" : "hover:bg-stone"}`}
                >
                  {c ?? "All"}
                </button>
              );
            })}
          </div>
          <label className="label flex items-center gap-3">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-slate bg-transparent px-3 py-2 normal-case tracking-normal">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      )}

      {list.length ? (
        <div className="mt-10 grid gap-x-5 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
          {list.map((p, n) => <ProductCard key={p.id} product={p} index={n} />)}
        </div>
      ) : (
        <p className="py-24 text-center text-lg">
          Nothing here yet. <Link href="/shop" className="underline underline-offset-4">Browse the shop.</Link>
        </p>
      )}
    </div>
  );
}
