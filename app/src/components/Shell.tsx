"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Providers from "./Providers";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import Toast from "./Toast";
import { useRevealOnScroll } from "@/lib/hooks";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useRevealOnScroll(pathname);
  // Reset section background on navigation
  useEffect(() => { document.body.dataset.bg = "white"; window.scrollTo(0, 0); }, [pathname]);

  return (
    <Providers>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </Providers>
  );
}
