"use client";
import Link from "next/link";
import Photo from "./Photo";
import { effectivePrice, fmt, type Product } from "@/data/products";
import { useStore } from "@/store/useStore";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wished = useStore((s) => s.wishlist.includes(product.id));
  const toggle = useStore((s) => s.toggleWishlist);
  const add = useStore((s) => s.addToCart);
  const href = `/products/${product.slug}`;

  return (
    <article className="group reveal" style={{ ["--i" as string]: index % 4 }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Link href={href} aria-label={product.name} className="absolute inset-0 block">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-105">
            <Photo src={product.images[0]} alt={product.name} sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <Photo src={product.images[1]} sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
        </Link>
        {product.badge && <span className="glass label absolute left-3 top-3 px-3 py-1 text-white">{product.badge}</span>}
        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wished}
          className="glass absolute right-3 top-3 grid size-9 place-items-center text-white"
        >
          {wished ? "♥" : "♡"}
        </button>
        <button
          onClick={() => add(product.id, product.colors[0].name)}
          className="glass label absolute inset-x-3 bottom-3 translate-y-[calc(100%+12px)] py-3 text-center text-white transition-transform duration-[600ms] ease-[var(--ease)] focus-visible:translate-y-0 group-hover:translate-y-0"
          style={{ background: "rgba(64,91,112,.55)" }}
        >
          Quick add
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link href={href} className="serif text-[22px] leading-tight">{product.name}</Link>
          <p className="label mt-1 text-mist">{product.category}</p>
        </div>
        <p className="text-sm">
          {product.salePrice && <s className="mr-2 text-mist">{fmt(product.price)}</s>}
          {fmt(effectivePrice(product))}
        </p>
      </div>
    </article>
  );
}
