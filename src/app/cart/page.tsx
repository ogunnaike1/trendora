"use client";
import Link from "next/link";
import { CartLines, CartSummary } from "@/components/CartDrawer";

export default function CartPage() {
  return (
    <div className="gutter pb-[var(--section-y)] pt-[150px]">
      <h1 className="hairline pb-6 text-[clamp(56px,10vw,128px)] leading-[0.92]">Your bag</h1>
      <div className="mt-10 grid gap-16 md:grid-cols-[1.6fr_1fr]">
        <CartLines />
        <div className="h-fit border border-slate/20 p-6">
          <CartSummary cta={<button className="btn mt-4 w-full" disabled title="Checkout is not built yet">Checkout</button>} />
          <Link href="/shop" className="link-arrow mt-6 inline-block">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
