import Image from "next/image";

/** Fills its (relatively-positioned) parent. Use `sizes` to match rendered width. */
export default function Photo({ src, alt = "", sizes = "(min-width: 768px) 33vw, 100vw", priority = false, className = "" }: { src: string; alt?: string; sizes?: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-stone ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
