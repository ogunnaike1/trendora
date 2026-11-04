export type Category =
  | "Lighting"
  | "Vases"
  | "Textiles"
  | "Wall Decor"
  | "Tableware"
  | "Candles";

export const CATEGORIES: Category[] = [
  "Lighting",
  "Vases",
  "Textiles",
  "Wall Decor",
  "Tableware",
  "Candles",
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  salePrice?: number;
  colors: { name: string; tone: number }[];
  materials: string;
  dimensions: string;
  description: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  /** Placeholder tones (oklch lightness). Replace with real image URLs for next/image. */
  images: number[];
  isNew: boolean;
  featured: boolean;
  createdAt: string;
}

const c = (name: string, tone: number) => ({ name, tone });

export const products: Product[] = [
  {
    id: "p1", slug: "arca-vase", name: "Arca Vase", category: "Vases", price: 89,
    colors: [c("Chalk", 0.8), c("Clay", 0.55), c("Slate", 0.35)],
    materials: "Hand-thrown stoneware, matte glaze", dimensions: "H 28 cm × Ø 14 cm",
    description: "A softly arched vase thrown by hand in small batches. Its quiet silhouette holds a single stem or a loose bunch of dried grasses.",
    rating: 4.8, reviewCount: 64, stock: 18, images: [0.78, 0.66, 0.52, 0.42], isNew: false, featured: true, createdAt: "2026-02-10",
  },
  {
    id: "p2", slug: "lumen-table-lamp", name: "Lumen Table Lamp", category: "Lighting", price: 189, badge: "New",
    colors: [c("Opal", 0.82), c("Smoke", 0.45)],
    materials: "Mouth-blown opal glass, brushed brass base", dimensions: "H 42 cm × Ø 22 cm",
    description: "A diffused globe of opal glass that gives off a warm, low glow — made for evening reading and slow dinners.",
    rating: 4.9, reviewCount: 41, stock: 9, images: [0.8, 0.7, 0.55, 0.4], isNew: true, featured: true, createdAt: "2026-10-12",
  },
  {
    id: "p3", slug: "soma-cushion", name: "Soma Cushion", category: "Textiles", price: 64,
    colors: [c("Oat", 0.78), c("Fog", 0.6), c("Ink", 0.32)],
    materials: "100% washed linen, feather insert", dimensions: "50 × 50 cm",
    description: "Stonewashed linen that softens with every wash. Generously filled, with a concealed zip.",
    rating: 4.7, reviewCount: 112, stock: 40, images: [0.72, 0.6, 0.5, 0.38], isNew: false, featured: true, createdAt: "2026-01-20",
  },
  {
    id: "p4", slug: "orbit-wall-mirror", name: "Orbit Wall Mirror", category: "Wall Decor", price: 245, badge: "New",
    colors: [c("Brass", 0.65), c("Black", 0.3)],
    materials: "Solid oak frame, bevelled glass", dimensions: "Ø 70 cm × D 3 cm",
    description: "A round mirror with a slim, hand-finished frame that brightens a hallway or bedroom wall.",
    rating: 4.6, reviewCount: 27, stock: 6, images: [0.76, 0.62, 0.48, 0.36], isNew: true, featured: true, createdAt: "2026-10-18",
  },
  {
    id: "p5", slug: "tala-candle", name: "Tala Candle", category: "Candles", price: 42,
    colors: [c("Fig", 0.7), c("Cedar", 0.5)],
    materials: "Soy wax, cotton wick, ceramic vessel", dimensions: "H 9 cm × Ø 8 cm · 220 g",
    description: "Poured by hand into a reusable ceramic vessel. Notes of fig leaf, cedar and warm musk; burns for 45 hours.",
    rating: 4.9, reviewCount: 203, stock: 75, images: [0.74, 0.58, 0.46, 0.34], isNew: false, featured: true, createdAt: "2026-03-02",
  },
  {
    id: "p6", slug: "mesa-serving-bowl", name: "Mesa Serving Bowl", category: "Tableware", price: 76, badge: "New",
    colors: [c("Bone", 0.84), c("Moss", 0.5)],
    materials: "Glazed stoneware", dimensions: "H 9 cm × Ø 26 cm",
    description: "A wide, shallow bowl made for sharing. Dishwasher and oven safe.",
    rating: 4.5, reviewCount: 33, stock: 22, images: [0.8, 0.64, 0.5, 0.4], isNew: true, featured: false, createdAt: "2026-10-05",
  },
  {
    id: "p7", slug: "fold-floor-lamp", name: "Fold Floor Lamp", category: "Lighting", price: 329,
    colors: [c("Sand", 0.72), c("Graphite", 0.3)],
    materials: "Powder-coated steel, pleated linen shade", dimensions: "H 156 cm × Ø 38 cm",
    description: "A sculptural floor lamp with a pleated linen shade that casts a soft, even light across the room.",
    rating: 4.8, reviewCount: 58, stock: 11, images: [0.7, 0.58, 0.46, 0.36], isNew: false, featured: true, createdAt: "2026-02-28",
  },
  {
    id: "p8", slug: "nube-throw", name: "Nube Throw", category: "Textiles", price: 148, badge: "New",
    colors: [c("Cloud", 0.86), c("Heather", 0.6), c("Midnight", 0.3)],
    materials: "70% merino wool, 30% alpaca", dimensions: "130 × 180 cm",
    description: "A cloud-soft throw woven in a loose herringbone. Made to be left over the arm of the sofa.",
    rating: 4.9, reviewCount: 88, stock: 14, images: [0.84, 0.68, 0.5, 0.38], isNew: true, featured: true, createdAt: "2026-10-22",
  },
  {
    id: "p9", slug: "duna-planter", name: "Duna Planter", category: "Vases", price: 58,
    colors: [c("Sand", 0.74), c("Terracotta", 0.5)],
    materials: "Unglazed terracotta, drainage hole + saucer", dimensions: "H 22 cm × Ø 20 cm",
    description: "A softly ribbed planter with a matching saucer. Terracotta breathes, keeping roots healthy.",
    rating: 4.6, reviewCount: 49, stock: 30, images: [0.7, 0.56, 0.44, 0.34], isNew: false, featured: false, createdAt: "2026-04-14",
  },
  {
    id: "p10", slug: "linea-print-set", name: "Linea Print Set", category: "Wall Decor", price: 95,
    colors: [c("Paper", 0.88), c("Stone", 0.66)],
    materials: "Giclée on 240gsm cotton rag paper", dimensions: "Set of 3 · 30 × 40 cm",
    description: "Three line-drawn studies printed on archival cotton paper. Frames sold separately.",
    rating: 4.4, reviewCount: 19, stock: 50, images: [0.86, 0.72, 0.58, 0.44], isNew: false, featured: false, createdAt: "2026-05-09",
  },
  {
    id: "p11", slug: "pilar-candlesticks", name: "Pilar Candlesticks", category: "Candles", price: 68,
    colors: [c("Brass", 0.64), c("Ebony", 0.28)],
    materials: "Solid cast brass, hand-polished", dimensions: "Set of 2 · H 12 cm & 18 cm",
    description: "A pair of weighty candlesticks in two heights. Pair with tapered dinner candles.",
    rating: 4.7, reviewCount: 36, stock: 20, images: [0.68, 0.54, 0.42, 0.32], isNew: false, featured: true, createdAt: "2026-06-01",
  },
  {
    id: "p12", slug: "oro-dinner-plates", name: "Oro Dinner Plates", category: "Tableware", price: 112,
    colors: [c("Ivory", 0.86), c("Slate", 0.4)],
    materials: "Reactive-glaze stoneware", dimensions: "Set of 4 · Ø 27 cm",
    description: "Four dinner plates with a gently pooled glaze — no two are quite alike.",
    rating: 4.8, reviewCount: 71, stock: 16, images: [0.82, 0.66, 0.5, 0.38], isNew: false, featured: true, createdAt: "2026-03-18",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
export const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
