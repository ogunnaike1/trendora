import { Suspense } from "react";
import type { Metadata } from "next";
import ShopView from "@/components/ShopView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return <Suspense><ShopView mode="wishlist" /></Suspense>;
}
