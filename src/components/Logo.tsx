/** Trendora mark: an open arch (a doorway / vase silhouette) holding a quiet "T". Uses currentColor. */
export function LogoMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg {...(size ? { width: size, height: size } : {})} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" aria-hidden className={className}>
      <path d="M9 44V23a15 15 0 0 1 30 0v21" />
      <path d="M17 21h14M24 21v15" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="serif text-[30px] leading-none tracking-[0.14em]">TRENDORA</span>
    </span>
  );
}
