/** Striped placeholder tile standing in for photography. Swap for next/image when real assets exist. */
export default function Placeholder({ tone = 0.6, label, className = "", style }: { tone?: number; label?: string; className?: string; style?: React.CSSProperties }) {
  const a = `oklch(${tone} 0.035 245)`;
  const b = `oklch(${Math.max(0, tone - 0.04)} 0.035 245)`;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`, ...style }}
      role="img"
      aria-label={label ?? "Image placeholder"}
    />
  );
}
