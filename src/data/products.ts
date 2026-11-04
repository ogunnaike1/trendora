import { CATEGORY_SETS, IMG } from "./images";

export type Category =
  | "Lighting"
  | "Vases"
  | "Textiles"
  | "Wall Decor"
  | "Tableware"
  | "Candles"
  | "Kitchen";

export const CATEGORIES: Category[] = [
  "Lighting",
  "Vases",
  "Textiles",
  "Wall Decor",
  "Tableware",
  "Candles",
  "Kitchen",
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
  images: string[];
  isNew: boolean;
  featured: boolean;
  createdAt: string;
}

const c = (name: string, tone: number) => ({ name, tone });

export const products: Product[] = [
  // ── Travel & truck kitchen ───────────────────────────────────────────
  {
    id: "p13", slug: "24v-electric-air-fryer-2-5l", name: "200W 24V 2.5L Electric Air Fryer", category: "Kitchen", price: 261.99, salePrice: 235.79, badge: "11.11 Sale",
    colors: [c("Black", 0.25)],
    materials: "Non-stick coated basket, ABS housing, brushed-effect handle", dimensions: "2.5 L capacity · 200 W · 24 V DC with cigarette-lighter plug",
    description: "Oil-free cooking on the road. This compact 2.5L air fryer runs from a 24V truck socket, so you can cook hot meals while camping, travelling or on long hauls. Simple mechanical timer dial and a pull-out basket.",
    rating: 4.6, reviewCount: 60, stock: 25, images: [IMG.airFryer, IMG.kitchen, IMG.dining, IMG.livingSun], isNew: true, featured: true, createdAt: "2026-11-01",
  },
  {
    id: "p14", slug: "24v-air-fryer-4l", name: "24V 4L Air Fryer, 250W", category: "Kitchen", price: 199,
    colors: [c("Black", 0.25)],
    materials: "Non-stick basket, ABS housing", dimensions: "4 L capacity · 250 W · 24 V DC",
    description: "A larger-capacity travel air fryer with timer and temperature control — enough for a full meal from the cab or campsite.",
    rating: 4.5, reviewCount: 38, stock: 18, images: [IMG.kitchenAirFryer, IMG.kitchenAppliances], isNew: true, featured: false, createdAt: "2026-10-28",
  },
  {
    id: "p15", slug: "12v-24v-car-air-fryer-3l", name: "12V/24V Portable Air Fryer, 3L", category: "Kitchen", price: 179,
    colors: [c("Black", 0.25), c("Grey", 0.55)],
    materials: "Non-stick basket, ABS housing", dimensions: "3 L capacity · 250 W · 12 V / 24 V DC",
    description: "Dual-voltage so it works in cars, vans and trucks alike. Compact enough to store in a cupboard between trips.",
    rating: 4.4, reviewCount: 27, stock: 20, images: [IMG.kitchenAppliances, IMG.kitchenAirFryer], isNew: true, featured: false, createdAt: "2026-10-26",
  },
  {
    id: "p16", slug: "12v-24v-travel-rice-cooker-2l", name: "12V/24V Travel Rice Cooker, 2L", category: "Kitchen", price: 84,
    colors: [c("Steel", 0.7)],
    materials: "Stainless-steel body, non-stick inner pot", dimensions: "2 L capacity · 12 V / 24 V DC",
    description: "Rice, soup, noodles and porridge from a vehicle socket. Mechanical timer with automatic shut-off.",
    rating: 4.3, reviewCount: 45, stock: 32, images: [IMG.riceCooker, IMG.riceCookerWindow], isNew: false, featured: false, createdAt: "2026-09-12",
  },
  {
    id: "p17", slug: "24v-car-electric-kettle-1-2l", name: "24V Car Electric Kettle, 1.2L", category: "Kitchen", price: 46,
    colors: [c("Steel", 0.7), c("Black", 0.25)],
    materials: "Food-grade stainless steel, cigarette-lighter plug", dimensions: "1.2 L capacity · 200 W · 24 V DC",
    description: "Boil water for tea, coffee or instant meals on the move. Heats from a 24V truck socket.",
    rating: 4.4, reviewCount: 52, stock: 40, images: [IMG.kettleGlass, IMG.kettleSteel, IMG.kettleShelf], isNew: false, featured: false, createdAt: "2026-08-20",
  },
  {
    id: "p18", slug: "12v-24v-electric-lunch-box", name: "12V/24V Electric Lunch Box, 80W", category: "Kitchen", price: 39,
    colors: [c("Grey", 0.55)],
    materials: "Stainless-steel liner, insulated carry bag", dimensions: "1.5 L capacity · 80 W · 12 V / 24 V DC",
    description: "Warm yesterday's dinner at your desk or in the cab. Works on 12V and 24V vehicle sockets.",
    rating: 4.2, reviewCount: 71, stock: 55, images: [IMG.lunchbox, IMG.lunchbox2, IMG.lunchbox3], isNew: false, featured: false, createdAt: "2026-07-30",
  },
  {
    id: "p19", slug: "24v-electric-frying-pan", name: "24V Electric Frying Pan, 250W", category: "Kitchen", price: 52,
    colors: [c("Black", 0.25)],
    materials: "Non-stick aluminium, heat-resistant handle", dimensions: "Ø 20 cm · 250 W · 24 V DC",
    description: "A compact pan that plugs into a truck socket — eggs, sausages and stir-fries wherever you park.",
    rating: 4.1, reviewCount: 22, stock: 28, images: [IMG.pan1, IMG.pan2, IMG.panEgg], isNew: false, featured: false, createdAt: "2026-07-05",
  },
  {
    id: "p20", slug: "24v-mini-toaster-oven-12l", name: "24V Mini Oven, 12L", category: "Kitchen", price: 129,
    colors: [c("Cream", 0.86), c("Blush", 0.72)],
    materials: "Enamelled steel interior, tempered-glass door", dimensions: "12 L capacity · 300 W · 24 V DC",
    description: "A compact oven for toasting, reheating and baking small trays — sized to fit a truck cab or camper counter.",
    rating: 4.3, reviewCount: 18, stock: 14, images: [IMG.toasterOvens, IMG.kitchenAppliances], isNew: true, featured: false, createdAt: "2026-10-30",
  },
  {
    id: "p21", slug: "12v-travel-coffee-maker", name: "12V Travel Coffee Maker", category: "Kitchen", price: 64,
    colors: [c("Black", 0.25), c("White", 0.9)],
    materials: "BPA-free tank, glass carafe, reusable filter", dimensions: "0.6 L carafe · 120 W · 12 V DC",
    description: "Brew a fresh pot at the first rest stop. Drip coffee maker with a reusable filter and a small footprint.",
    rating: 4.2, reviewCount: 33, stock: 26, images: [IMG.coffeeMaker, IMG.kitchenAppliances], isNew: false, featured: false, createdAt: "2026-09-18",
  },
  {
    id: "p22", slug: "portable-espresso-maker", name: "Portable Espresso Maker", category: "Kitchen", price: 72,
    colors: [c("Graphite", 0.3)],
    materials: "Aluminium body, stainless-steel filter", dimensions: "Ø 7 cm × H 19 cm · hand-pump",
    description: "A hand-pumped espresso maker for campsites and cabs. No power needed — just hot water and ground coffee.",
    rating: 4.6, reviewCount: 94, stock: 35, images: [IMG.espresso, IMG.campGear], isNew: false, featured: false, createdAt: "2026-08-02",
  },
  {
    id: "p23", slug: "12v-24v-travel-kettle-0-8l", name: "12V/24V Travel Kettle, 0.8L", category: "Kitchen", price: 38,
    colors: [c("Black", 0.25)],
    materials: "Stainless steel, silicone grip", dimensions: "0.8 L capacity · 150 W · 12 V / 24 V DC",
    description: "A slim gooseneck kettle that runs from either socket voltage — ideal for pour-over coffee and tea on the go.",
    rating: 4.3, reviewCount: 41, stock: 44, images: [IMG.kettleBlack, IMG.kettleShelf], isNew: false, featured: false, createdAt: "2026-08-14",
  },
  {
    id: "p24", slug: "24v-electric-multi-cooker-3l", name: "24V Electric Multi Cooker, 3L", category: "Kitchen", price: 118,
    colors: [c("Steel", 0.7)],
    materials: "Stainless-steel exterior, non-stick inner pot", dimensions: "3 L capacity · 200 W · 24 V DC",
    description: "Steam, stew and simmer from a truck socket. One pot for rice, soups and one-pan meals.",
    rating: 4.4, reviewCount: 29, stock: 17, images: [IMG.multiCooker, IMG.riceCooker], isNew: true, featured: false, createdAt: "2026-10-24",
  },
  {
    id: "p25", slug: "camping-stove-and-kettle-set", name: "Compact Camp Stove & Kettle Set", category: "Kitchen", price: 96,
    colors: [c("Steel", 0.7)],
    materials: "Stainless steel, folding wood-burning stove", dimensions: "Packed H 18 cm × Ø 12 cm",
    description: "A folding wood-burning stove with a matching kettle. Packs flat, boils water in minutes and needs no fuel canister.",
    rating: 4.7, reviewCount: 57, stock: 21, images: [IMG.campStove, IMG.campGear], isNew: false, featured: false, createdAt: "2026-06-25",
  },
  {
    id: "p1", slug: "arca-vase", name: "Arca Vase", category: "Vases", price: 89,
    colors: [c("Chalk", 0.8), c("Clay", 0.55), c("Slate", 0.35)],
    materials: "Hand-thrown stoneware, matte glaze", dimensions: "H 28 cm × Ø 14 cm",
    description: "A softly arched vase thrown by hand in small batches. Its quiet silhouette holds a single stem or a loose bunch of dried grasses.",
    rating: 4.8, reviewCount: 64, stock: 18, images: [] as string[], isNew: false, featured: true, createdAt: "2026-02-10",
  },
  {
    id: "p2", slug: "lumen-table-lamp", name: "Lumen Table Lamp", category: "Lighting", price: 189, badge: "New",
    colors: [c("Opal", 0.82), c("Smoke", 0.45)],
    materials: "Mouth-blown opal glass, brushed brass base", dimensions: "H 42 cm × Ø 22 cm",
    description: "A diffused globe of opal glass that gives off a warm, low glow — made for evening reading and slow dinners.",
    rating: 4.9, reviewCount: 41, stock: 9, images: [] as string[], isNew: true, featured: true, createdAt: "2026-10-12",
  },
  {
    id: "p3", slug: "soma-cushion", name: "Soma Cushion", category: "Textiles", price: 64,
    colors: [c("Oat", 0.78), c("Fog", 0.6), c("Ink", 0.32)],
    materials: "100% washed linen, feather insert", dimensions: "50 × 50 cm",
    description: "Stonewashed linen that softens with every wash. Generously filled, with a concealed zip.",
    rating: 4.7, reviewCount: 112, stock: 40, images: [] as string[], isNew: false, featured: true, createdAt: "2026-01-20",
  },
  {
    id: "p4", slug: "orbit-wall-mirror", name: "Orbit Wall Mirror", category: "Wall Decor", price: 245, badge: "New",
    colors: [c("Brass", 0.65), c("Black", 0.3)],
    materials: "Solid oak frame, bevelled glass", dimensions: "Ø 70 cm × D 3 cm",
    description: "A round mirror with a slim, hand-finished frame that brightens a hallway or bedroom wall.",
    rating: 4.6, reviewCount: 27, stock: 6, images: [] as string[], isNew: true, featured: true, createdAt: "2026-10-18",
  },
  {
    id: "p5", slug: "tala-candle", name: "Tala Candle", category: "Candles", price: 42,
    colors: [c("Fig", 0.7), c("Cedar", 0.5)],
    materials: "Soy wax, cotton wick, ceramic vessel", dimensions: "H 9 cm × Ø 8 cm · 220 g",
    description: "Poured by hand into a reusable ceramic vessel. Notes of fig leaf, cedar and warm musk; burns for 45 hours.",
    rating: 4.9, reviewCount: 203, stock: 75, images: [] as string[], isNew: false, featured: true, createdAt: "2026-03-02",
  },
  {
    id: "p6", slug: "mesa-serving-bowl", name: "Mesa Serving Bowl", category: "Tableware", price: 76, badge: "New",
    colors: [c("Bone", 0.84), c("Moss", 0.5)],
    materials: "Glazed stoneware", dimensions: "H 9 cm × Ø 26 cm",
    description: "A wide, shallow bowl made for sharing. Dishwasher and oven safe.",
    rating: 4.5, reviewCount: 33, stock: 22, images: [] as string[], isNew: true, featured: false, createdAt: "2026-10-05",
  },
  {
    id: "p7", slug: "fold-floor-lamp", name: "Fold Floor Lamp", category: "Lighting", price: 329,
    colors: [c("Sand", 0.72), c("Graphite", 0.3)],
    materials: "Powder-coated steel, pleated linen shade", dimensions: "H 156 cm × Ø 38 cm",
    description: "A sculptural floor lamp with a pleated linen shade that casts a soft, even light across the room.",
    rating: 4.8, reviewCount: 58, stock: 11, images: [] as string[], isNew: false, featured: true, createdAt: "2026-02-28",
  },
  {
    id: "p8", slug: "nube-throw", name: "Nube Throw", category: "Textiles", price: 148, badge: "New",
    colors: [c("Cloud", 0.86), c("Heather", 0.6), c("Midnight", 0.3)],
    materials: "70% merino wool, 30% alpaca", dimensions: "130 × 180 cm",
    description: "A cloud-soft throw woven in a loose herringbone. Made to be left over the arm of the sofa.",
    rating: 4.9, reviewCount: 88, stock: 14, images: [] as string[], isNew: true, featured: true, createdAt: "2026-10-22",
  },
  {
    id: "p9", slug: "duna-planter", name: "Duna Planter", category: "Vases", price: 58,
    colors: [c("Sand", 0.74), c("Terracotta", 0.5)],
    materials: "Unglazed terracotta, drainage hole + saucer", dimensions: "H 22 cm × Ø 20 cm",
    description: "A softly ribbed planter with a matching saucer. Terracotta breathes, keeping roots healthy.",
    rating: 4.6, reviewCount: 49, stock: 30, images: [] as string[], isNew: false, featured: false, createdAt: "2026-04-14",
  },
  {
    id: "p10", slug: "linea-print-set", name: "Linea Print Set", category: "Wall Decor", price: 95,
    colors: [c("Paper", 0.88), c("Stone", 0.66)],
    materials: "Giclée on 240gsm cotton rag paper", dimensions: "Set of 3 · 30 × 40 cm",
    description: "Three line-drawn studies printed on archival cotton paper. Frames sold separately.",
    rating: 4.4, reviewCount: 19, stock: 50, images: [] as string[], isNew: false, featured: false, createdAt: "2026-05-09",
  },
  {
    id: "p11", slug: "pilar-candlesticks", name: "Pilar Candlesticks", category: "Candles", price: 68,
    colors: [c("Brass", 0.64), c("Ebony", 0.28)],
    materials: "Solid cast brass, hand-polished", dimensions: "Set of 2 · H 12 cm & 18 cm",
    description: "A pair of weighty candlesticks in two heights. Pair with tapered dinner candles.",
    rating: 4.7, reviewCount: 36, stock: 20, images: [] as string[], isNew: false, featured: true, createdAt: "2026-06-01",
  },
  {
    id: "p12", slug: "oro-dinner-plates", name: "Oro Dinner Plates", category: "Tableware", price: 112,
    colors: [c("Ivory", 0.86), c("Slate", 0.4)],
    materials: "Reactive-glaze stoneware", dimensions: "Set of 4 · Ø 27 cm",
    description: "Four dinner plates with a gently pooled glaze — no two are quite alike.",
    rating: 4.8, reviewCount: 71, stock: 16, images: [] as string[], isNew: false, featured: true, createdAt: "2026-03-18",
  },
];

// Fill each product's images from its category set, rotated so products in a category differ.
const seen: Record<string, number> = {};
for (const p of products) {
  const set = CATEGORY_SETS[p.category];
  const k = (seen[p.category] = (seen[p.category] ?? -1) + 1);
  if (p.images.length) {
    for (const extra of set) if (p.images.length < 4 && !p.images.includes(extra)) p.images.push(extra);
    continue;
  }
  p.images = set.map((_, n) => set[(n + k) % set.length]);
}

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
export const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
