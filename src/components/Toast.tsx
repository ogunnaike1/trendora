"use client";
import { useStore } from "@/store/useStore";

export default function Toast() {
  const toast = useStore((s) => s.toast);
  const visible = !!toast?.visible;
  return (
    <div
      role="status"
      aria-live="polite"
      className="glass label fixed bottom-8 left-1/2 z-[80] px-6 py-4 text-white"
      style={{
        background: "rgba(64,91,112,.85)",
        transform: `translate(-50%, ${visible ? 0 : 24}px)`,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        transition: "all .6s var(--ease)",
      }}
    >
      {toast?.message}
    </div>
  );
}
