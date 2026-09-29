export interface WeeklyChallengeData {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  prompt: string;
  tagline: string;
  guideline: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  featuredTemplateId: string;
}

export interface CommunitySubmissionItem {
  id: string;
  challengeId: string;
  creatorName: string;
  shoeModel: string;
  brandName: string;
  title: string;
  story?: string;
  colors: {
    upper: string;
    sole: string;
    laces: string;
    heel: string;
    sidePanel: string;
    accent: string;
  };
  voteCount: number;
  createdAt: string;
}

export const ACTIVE_CHALLENGE: WeeklyChallengeData = {
  id: 'challenge_week_42',
  weekNumber: 42,
  title: 'Create your own everyday sneaker',
  theme: 'Modern Urban Streetwear & High-Contrast Accents',
  prompt: 'Design an adaptable daily colorway that transitions seamlessly from morning subway commutes to evening studio sessions. Focus on balanced tones with vibrant accent pops.',
  tagline: 'New ideas make us grow. Choose a shoe. Reimagine its colors. Create your style.',
  guideline: 'Selected community designs may inspire future colorways.',
  startDate: '2026-09-24T00:00:00Z',
  endDate: '2026-10-01T23:59:59Z',
  isActive: true,
  featuredTemplateId: 'template_runner',
};

export const INITIAL_COMMUNITY_SUBMISSIONS: CommunitySubmissionItem[] = [
  {
    id: 'sub_001',
    challengeId: 'challenge_week_42',
    creatorName: 'Maya Lin',
    shoeModel: 'Air Zoom Pegasus 40',
    brandName: 'Nike',
    title: 'Cyber Twilight Runner',
    story: 'Inspired by Tokyo neon signs against twilight rain. Midnight blue chassis with electric volt accent hits.',
    colors: {
      upper: '#0f172a',
      sole: '#f8fafc',
      laces: '#38bdf8',
      heel: '#e11d48',
      sidePanel: '#1e293b',
      accent: '#facc15'
    },
    voteCount: 48,
    createdAt: '2026-09-25T14:20:00Z'
  },
  {
    id: 'sub_002',
    challengeId: 'challenge_week_42',
    creatorName: 'Julian Thorne',
    shoeModel: 'Ultraboost Light',
    brandName: 'Adidas',
    title: 'Matcha Moss Trail',
    story: 'Earthy organic tones. Matcha green knit upper complemented by warm sandstone and terracotta accents.',
    colors: {
      upper: '#365314',
      sole: '#fef3c7',
      laces: '#ca8a04',
      heel: '#78350f',
      sidePanel: '#4d7c0f',
      accent: '#ea580c'
    },
    voteCount: 39,
    createdAt: '2026-09-26T09:15:00Z'
  },
  {
    id: 'sub_003',
    challengeId: 'challenge_week_42',
    creatorName: 'Elena Rostova',
    shoeModel: 'Club C 85 Vintage',
    brandName: 'Reebok',
    title: 'Monochrome Bauhaus',
    story: 'Pure functionalist minimalism. Charcoal matte body with chalk white base and a surgical crimson tab.',
    colors: {
      upper: '#27272a',
      sole: '#ffffff',
      laces: '#18181b',
      heel: '#dc2626',
      sidePanel: '#3f3f46',
      accent: '#ffffff'
    },
    voteCount: 57,
    createdAt: '2026-09-26T18:40:00Z'
  },
  {
    id: 'sub_004',
    challengeId: 'challenge_week_42',
    creatorName: 'Marcus Cole',
    shoeModel: 'Fresh Foam X 1080v13',
    brandName: 'New Balance',
    title: 'Solar Flare Marathon',
    story: 'High-visibility dawn running inspiration. Radiant orange gradient with deep aerospace graphite.',
    colors: {
      upper: '#f97316',
      sole: '#18181b',
      laces: '#fde047',
      heel: '#c2410c',
      sidePanel: '#ea580c',
      accent: '#38bdf8'
    },
    voteCount: 63,
    createdAt: '2026-09-27T11:00:00Z'
  }
];

export interface ColorwayPreset {
  name: string;
  category: string;
  palette: string[];
}

export const COLOR_PALETTES: ColorwayPreset[] = [
  {
    name: 'Streetwear Heat',
    category: 'Vibrant & Bold',
    palette: ['#f97316', '#ef4444', '#facc15', '#0f172a', '#ffffff', '#1e293b']
  },
  {
    name: 'Earth & Clay',
    category: 'Natural & Organic',
    palette: ['#78350f', '#92400e', '#365314', '#fef3c7', '#d97706', '#451a03']
  },
  {
    name: 'Cyberpunk Neon',
    category: 'Futuristic',
    palette: ['#06b6d4', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#020617']
  },
  {
    name: 'Monochrome Stealth',
    category: 'Minimalist',
    palette: ['#09090b', '#18181b', '#27272a', '#71717a', '#d4d4d8', '#ffffff']
  },
  {
    name: 'Retro 80s Court',
    category: 'Heritage',
    palette: ['#1e3a8a', '#15803d', '#b91c1c', '#f5f5f4', '#fef08a', '#e2e8f0']
  }
];
