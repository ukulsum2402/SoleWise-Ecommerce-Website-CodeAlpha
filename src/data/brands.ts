export interface BrandData {
  id: string;
  name: string;
  slug: string;
  originCountry: string;
  foundedYear: number;
  description: string;
  websiteUrl: string;
  tagline: string;
}

export const BRANDS: BrandData[] = [
  {
    id: 'nike',
    name: 'Nike',
    slug: 'nike',
    originCountry: 'United States (Beaverton, Oregon)',
    foundedYear: 1964,
    description: 'Global pioneer in athletic footwear engineering, recognized for Air Zoom pneumatic cushioning, responsive React foams, and performance knit uppers.',
    websiteUrl: 'https://www.nike.com',
    tagline: 'Just Do It — Precision Athletic Innovation'
  },
  {
    id: 'adidas',
    name: 'Adidas',
    slug: 'adidas',
    originCountry: 'Germany (Herzogenaurach)',
    foundedYear: 1949,
    description: 'Renowned for thermal-expanded polyurethane Boost pellets, torsion bar stabilization, and Continental tire rubber outsoles.',
    websiteUrl: 'https://www.adidas.com',
    tagline: 'Impossible Is Nothing — Engineered Energy Return'
  },
  {
    id: 'puma',
    name: 'Puma',
    slug: 'puma',
    originCountry: 'Germany (Herzogenaurach)',
    foundedYear: 1948,
    description: 'Innovator in supercritical nitrogen-infused Nitro foams, motorsport aerodynamics, and ultra-high-traction PUMAGRIP compound.',
    websiteUrl: 'https://www.puma.com',
    tagline: 'Forever Faster — Speed & Traction Heritage'
  },
  {
    id: 'new-balance',
    name: 'New Balance',
    slug: 'new-balance',
    originCountry: 'United States (Boston, Massachusetts)',
    foundedYear: 1906,
    description: 'Started as an arch support company; celebrated worldwide for orthopedic heel counters, varied width offerings, and Fresh Foam X geometry.',
    websiteUrl: 'https://www.newbalance.com',
    tagline: 'Fearlessly Independent — Anatomical Support'
  },
  {
    id: 'asics',
    name: 'ASICS',
    slug: 'asics',
    originCountry: 'Japan (Kobe)',
    foundedYear: 1949,
    description: 'Founded on Anima Sana In Corpore Sano; renowned for silicone-based PureGEL shock attenuation and biomechanical Impact Guidance Systems (I.G.S.).',
    websiteUrl: 'https://www.asics.com',
    tagline: 'Sound Mind, Sound Body — Biomechanical Science'
  },
  {
    id: 'skechers',
    name: 'Skechers',
    slug: 'skechers',
    originCountry: 'United States (Manhattan Beach, California)',
    foundedYear: 1992,
    description: 'Pioneered Hyper Burst supercritical closed-cell midsole foams and Arch Fit certified podiatrist-designed footbed contours.',
    websiteUrl: 'https://www.skechers.com',
    tagline: 'The Comfort Technology Company'
  },
  {
    id: 'reebok',
    name: 'Reebok',
    slug: 'reebok',
    originCountry: 'United Kingdom (Bolton, England)',
    foundedYear: 1958,
    description: 'Heritage court sports innovator; famous for garment leather uppers, terrycloth linings, and durable EVA cupsole vulcanization.',
    websiteUrl: 'https://www.reebok.com',
    tagline: 'Classic Heritage & Fitness Innovation'
  },
  {
    id: 'converse',
    name: 'Converse',
    slug: 'converse',
    originCountry: 'United States (Malden, Massachusetts)',
    foundedYear: 1908,
    description: 'Iconic vulcanized rubber and 12oz duck canvas construction with heritage diamond tread patterns and high-top ankle patches.',
    websiteUrl: 'https://www.converse.com',
    tagline: 'Timeless Expression & Canvas Heritage'
  },
  {
    id: 'vans',
    name: 'Vans',
    slug: 'vans',
    originCountry: 'United States (Anaheim, California)',
    foundedYear: 1966,
    description: 'Pioneers of skate culture footwear featuring original gum rubber waffle outsoles, double-stitched suede panels, and padded collars.',
    websiteUrl: 'https://www.vans.com',
    tagline: 'Off The Wall — Skateboarding Utility'
  },
  {
    id: 'under-armour',
    name: 'Under Armour',
    slug: 'under-armour',
    originCountry: 'United States (Baltimore, Maryland)',
    foundedYear: 1996,
    description: 'Specialists in compression textiles, high-abrasion engineered mesh, and zero-gravity UA HOVR energy return cushioning.',
    websiteUrl: 'https://www.underarmour.com',
    tagline: 'The Only Way Is Through — High-Performance Training'
  }
];
