"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { effectivePrice, getProduct } from "@/data/products";

export interface CartLine {
  productId: string;
  color: string;
  qty: number;
}

interface State {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  toast: { id: number; message: string; visible: boolean } | null;
  addToCart: (productId: string, color: string, qty?: number) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  removeLine: (productId: string, color: string) => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  showToast: (message: string) => void;
}

export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_FEE = 12;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      cartOpen: false,
      toast: null,
      addToCart: (productId, color, qty = 1) => {
        set((s) => {
          const existing = s.cart.find((l) => l.productId === productId && l.color === color);
          return {
            cart: existing
              ? s.cart.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l))
              : [...s.cart, { productId, color, qty }],
          };
        });
        get().showToast("Added to bag");
      },
      setQty: (productId, color, qty) =>
        set((s) => ({
          cart: s.cart
            .map((l) => (l.productId === productId && l.color === color ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      removeLine: (productId, color) =>
        set((s) => ({ cart: s.cart.filter((l) => !(l.productId === productId && l.color === color)) })),
      toggleWishlist: (id) => {
        const has = get().wishlist.includes(id);
        set((s) => ({ wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] }));
        get().showToast(has ? "Removed from wishlist" : "Saved to wishlist");
      },
      setCartOpen: (cartOpen) => set({ cartOpen }),
      showToast: (message) => {
        const id = Date.now();
        set({ toast: { id, message, visible: true } });
        setTimeout(() => {
          const t = get().toast;
          if (t && t.id === id) set({ toast: { ...t, visible: false } });
        }, 2200);
      },
    }),
    {
      name: "trendora-store",
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist }),
      skipHydration: true, // rehydrated in <Providers/> to avoid SSR mismatch
    },
  ),
);

/** Derived totals */
export function useCartTotals() {
  const cart = useStore((s) => s.cart);
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => {
    const p = getProduct(l.productId);
    return n + (p ? effectivePrice(p) * l.qty : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { count, subtotal, shipping, total: subtotal + shipping };
}
