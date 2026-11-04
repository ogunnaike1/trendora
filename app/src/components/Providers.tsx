"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => { useStore.persist.rehydrate(); }, []);
  return <>{children}</>;
}
