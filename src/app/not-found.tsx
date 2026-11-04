import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter grid min-h-[80vh] place-content-center text-center">
      <h1 className="text-[clamp(56px,10vw,150px)] leading-[0.92]">Not <span className="accent">found</span></h1>
      <p className="mt-4">The page you’re looking for has moved or never existed.</p>
      <Link href="/shop" className="btn mx-auto mt-8">Browse the shop</Link>
    </div>
  );
}
