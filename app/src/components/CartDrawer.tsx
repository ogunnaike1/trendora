"use client";
import Link from "next/link";
import { useEffect } from "react";
import Placeholder from "./Placeholder";
import { useStore, useCartTotals, FREE_SHIPPING_THRESHOLD } from "@/store/useStore";
import { effectivePrice, fmt, getProduct } from "@/data/products";

export function CartLines() {
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeLine);
  if (!cart.length) return <p className="py-10 text-center text-mist">Your bag is empty.</p>;
  return (
    <ul className="divide-y divide-slate/15">
      {cart.map((l) => {
        const p = getProduct(l.productId);
        if (!p) return null;
        return (
          <li key={l.productId + l.color} className="flex gap-4 py-5">
            <Link href={`/products/${p.slug}`} className="block h-[84px] w-[84px] shrink-0 overflow-hidden">
              <Placeholder tone={p.images[0]} label={p.name} />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <span className="serif text-xl leading-tight">{p.name}</span>
                <span className="text-sm">{fmt(effectivePrice(p) * l.qty)}</span>
              </div>
              <span className="label text-mist">{l.color}</span>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center border border-slate/30">
                  <button className="size-8" aria-label="Decrease quantity" onClick={() => setQty(l.productId, l.color, l.qty - 1)}>−</button>
                  <span className="w-6 text-center text-sm">{l.qty}</span>
                  <button className="size-8" aria-label="Increase quantity" onClick={() => setQty(l.productId, l.color, l.qty + 1)}>+</button>
                </div>
                <button className="label underline underline-offset-4 hover:text-mist" onClick={() => remove(l.productId, l.color)}>Remove</button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function CartSummary({ cta }: { cta?: React.ReactNode }) {
  const { subtotal, shipping, total } = useCartTotals();
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
      <div className="flex justify-between"><span>Delivery</span><span>{subtotal === 0 ? "—" : shipping === 0 ? "Complimentary" : fmt(shipping)}</span></div>
      {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
        <p className="label text-mist">Add {fmt(FREE_SHIPPING_THRESHOLD - subtotal)} for complimentary delivery</p>
      )}
      <div className="serif flex justify-between pt-3 text-2xl"><span>Total</span><span>{fmt(total)}</span></div>
      {cta}
    </div>
  );
}

export default function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const { count } = useCartTotals();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, setOpen]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[70]"
        style={{ background: "rgba(64,91,112,.45)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .7s var(--ease)" }}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-y-0 right-0 z-[71] flex w-full flex-col md:w-[440px]"
        style={{
          background: "rgba(255,255,255,.72)",
          backdropFilter: "blur(18px) saturate(1.3)",
          WebkitBackdropFilter: "blur(18px) saturate(1.3)",
          transform: open ? "none" : "translateX(100%)",
          transition: "transform .7s var(--ease)",
        }}
      >
        <div className="flex items-center justify-between border-b border-slate/20 px-6 py-5">
          <h2 className="serif text-3xl">Your bag ({count})</h2>
          <button className="label hover:text-mist" onClick={() => setOpen(false)}>Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6"><CartLines /></div>
        <div className="border-t border-slate/20 p-6">
          <CartSummary
            cta={
              <Link href="/cart" onClick={() => setOpen(false)} className="btn mt-4 w-full">Checkout</Link>
            }
          />
        </div>
      </aside>
    </>
  );
}
