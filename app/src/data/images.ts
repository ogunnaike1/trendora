/** Local photography (Unsplash licence) in /public/images. Swap files to rebrand. */
const i = (n: string) => `/images/${n}.jpg`;

export const IMG = {
  sofaTeal: i("sofa-teal"), bedroom: i("bedroom"), lampGrey: i("lamp-grey"), galleryWall: i("gallery-wall"),
  floorLamp: i("floor-lamp"), office: i("office"), bedroomWarm: i("bedroom-warm"), sofaGreen: i("sofa-green"),
  dining: i("dining"), kitchen: i("kitchen"), pampas: i("pampas"), textures: i("textures"), bathroom: i("bathroom"),
  yellowChair: i("yellow-chair"), shelves: i("shelves"), livingSun: i("living-sun"), candles: i("candles"),
  candles2: i("candles-2"), livingLight: i("living-light"), livingWide: i("living-wide"), mirrors: i("mirrors"),
};

/** Four-image sets per category; rotated per product so cards differ. */
export const CATEGORY_SETS = {
  Lighting: [IMG.lampGrey, IMG.yellowChair, IMG.floorLamp, IMG.office],
  Vases: [IMG.pampas, IMG.floorLamp, IMG.galleryWall, IMG.livingLight],
  Textiles: [IMG.textures, IMG.sofaGreen, IMG.sofaTeal, IMG.livingLight],
  "Wall Decor": [IMG.galleryWall, IMG.mirrors, IMG.shelves, IMG.yellowChair],
  Tableware: [IMG.kitchen, IMG.dining, IMG.livingSun, IMG.livingWide],
  Candles: [IMG.candles, IMG.candles2, IMG.textures, IMG.mirrors],
} as const;
