export interface MaterialCareGuide {
  id: string;
  name: string;
  shortDesc: string;
  toolsNeeded: string[];
  cleaningRoutine: string[];
  ifWetDryingGuide: string[];
  storageAdvice: string;
  criticalDonts: string[];
}

export const MATERIAL_CARE_GUIDES: MaterialCareGuide[] = [
  {
    id: 'mesh',
    name: 'Engineered Mesh & Knits',
    shortDesc: 'Lightweight, breathable woven fabrics used in running and high-performance lifestyle shoes.',
    toolsNeeded: ['Soft horsehair brush', 'Mild sneaker cleaning foam', 'Microfiber cloth', 'Bowl of lukewarm water'],
    cleaningRoutine: [
      'Dry brush all loose dust and dried mud before introducing any liquid.',
      'Mix mild pH-neutral sneaker foam with lukewarm water.',
      'Dip brush lightly—shake off excess water so the brush is damp, not dripping.',
      'Gently massage in circular motions across the knit fibers without pulling the threads.',
      'Press a dry microfiber towel firmly into the mesh to blot out the released dirt.',
      'Allow to air dry at room temperature in indirect light.'
    ],
    ifWetDryingGuide: [
      'Never wring or twist the knit upper, as this distorts the woven tension.',
      'Remove the internal insole immediately to facilitate airflow.',
      'Stuff the toe box firmly with clean, unprinted white paper towels to absorb internal moisture and maintain structure.',
      'Change the paper towels after 2 hours if heavily soaked.'
    ],
    storageAdvice: 'Store in a dry, ventilated area. Avoid plastic bags or damp basements where moisture can invite mildew.',
    criticalDonts: [
      'Do NOT machine wash in a laundry cycle—centrifugal spin and hot water loosen heat-welded seams.',
      'Do NOT use wire brushes or abrasive dish sponges which snag and pull knit loops.',
      'Do NOT place in a tumble dryer or directly on a heater.'
    ]
  },
  {
    id: 'leather',
    name: 'Full-Grain & Garment Leather',
    shortDesc: 'Premium natural animal hide offering structure, comfort, and classic aesthetic elegance.',
    toolsNeeded: ['Horsehair buffing brush', 'Damp microfiber cloth', 'Gentle leather cleaner', 'Leather conditioning balm'],
    cleaningRoutine: [
      'Wipe down the entire surface with a dry cloth to eliminate loose particulate grit.',
      'Apply a small dab of specialized leather cleaner onto a damp microfiber cloth.',
      'Rub gently over the leather in small circles; never soak the hide with water.',
      'Wipe away excess cleaner with a separate damp cloth.',
      'Let dry naturally for 30 minutes, then apply a pea-sized amount of leather conditioner to restore natural oils.',
      'Buff with a horsehair brush to a rich satin luster.'
    ],
    ifWetDryingGuide: [
      'Wipe dry immediately with a soft towel.',
      'Insert wooden or cedar shoe trees to prevent curl and wrinkle distortion as the hide contracts during drying.',
      'Allow to air dry at gentle room temperature. Leather dried by heat will shrink and crack permanently.'
    ],
    storageAdvice: 'Use cedar shoe trees to absorb moisture and maintain vamp shape. Keep in a breathable dust bag.',
    criticalDonts: [
      'Do NOT submerge leather in water.',
      'Do NOT use alcohol wipes, acetone, or bleach (strips protective finish and causes dry rot).',
      'Do NOT leave soaked shoes in a sealed gym bag.'
    ]
  },
  {
    id: 'suede',
    name: 'Suede & Nubuck',
    shortDesc: 'Velvety buffed leather with a soft nap finish that is highly sensitive to liquids and stains.',
    toolsNeeded: ['Suede eraser', 'Brass or crepe suede brush', 'Waterproofing repellent spray'],
    cleaningRoutine: [
      'Clean suede DRY whenever possible.',
      'Use a suede rubber eraser to rub out scuffs, watermarks, and surface stains.',
      'Brush gently in ONE direction with a soft suede brush to lift dirt.',
      'Once clean, brush back and forth with a crepe brush to restore the velvet nap texture.',
      'For greasy stains, apply a light dusting of talcum powder, let sit for 2 hours, then brush away.',
      'Coat with a breathable suede protector spray before outdoor wear.'
    ],
    ifWetDryingGuide: [
      'If caught in rain, blot gently with a dry microfiber cloth—do NOT scrub.',
      'Stuff shoe with paper towels to absorb internal moisture.',
      'Let dry completely in a warm room away from heat.',
      'Once 100% dry, use a suede brush vigorously to restore the matted nap.'
    ],
    storageAdvice: 'Store away from direct sunlight (UV fades suede dye rapidly) in a low-humidity closet.',
    criticalDonts: [
      'Do NOT apply wet soap or water directly to colored suede (causes dye bleeding and water rings).',
      'Do NOT use smooth leather creams, polishes, or waxes on suede (ruins the nap permanently).',
      'Do NOT wash in a machine.'
    ]
  },
  {
    id: 'canvas',
    name: 'Cotton Duck Canvas',
    shortDesc: 'Heavyweight woven cotton fabric celebrated for durable lifestyle footwear.',
    toolsNeeded: ['Soft bristle brush', 'Mild liquid laundry soap', 'Baking soda paste', 'Microfiber cloth'],
    cleaningRoutine: [
      'Remove laces and wash them separately.',
      'Dry brush dirt from the canvas grain.',
      'Mix warm water with a teaspoon of mild detergent.',
      'Dip a soft brush and scrub in circular motions along the weave.',
      'For stubborn yellowing or scuffs, mix baking soda with water into a paste, apply, let dry, then brush off.',
      'Wipe clean with a damp towel to remove all soap film.'
    ],
    ifWetDryingGuide: [
      'Stuff the toe box firmly with clean paper towels to maintain shape and prevent canvas shrinkage.',
      'Air dry in a shaded room with good air movement.'
    ],
    storageAdvice: 'Store in a dry location. Ensure canvas is completely dry before storage to prevent mold.',
    criticalDonts: [
      'Do NOT use chlorine bleach (turns white canvas and stitching yellow).',
      'Do NOT dry in an electric tumble dryer (damages rubber foxing glue).'
    ]
  },
  {
    id: 'synthetic',
    name: 'Synthetic Overlays & TPU',
    shortDesc: 'Technical thermoplastic polyurethane and synthetic leather composites offering structural lockdown.',
    toolsNeeded: ['Soft damp cloth', 'Gentle multi-surface cleaner', 'Soft toothbrush'],
    cleaningRoutine: [
      'Wipe down with a damp microfiber cloth.',
      'Use a mild soap solution and toothbrush to clean around heat-welded edges and logos.',
      'Wipe dry with a clean cloth.'
    ],
    ifWetDryingGuide: [
      'Synthetics are non-porous and shed water easily. Dry exterior with a towel and ventilate the interior.'
    ],
    storageAdvice: 'Keep out of direct, prolonged sunlight to prevent plasticizers from breaking down.',
    criticalDonts: [
      'Do NOT use acetone or harsh paint thinners (will melt TPU films).'
    ]
  },
  {
    id: 'rubber',
    name: 'Carbon & Gum Rubber Outsoles',
    shortDesc: 'High-traction vulcanized or molded compounds designed for ground contact and abrasion resistance.',
    toolsNeeded: ['Stiff bristle brush', 'Warm soapy water', 'Toothpick for gravel'],
    cleaningRoutine: [
      'Use a toothpick or blunt tool to pry out pebbles lodged in the tread siping.',
      'Scrub with a stiff brush dipped in warm soapy water.',
      'Rinse with a damp cloth or sponge.',
      'Dry with a towel.'
    ],
    ifWetDryingGuide: [
      'Rubber dries quickly; simply wipe with a dry cloth.'
    ],
    storageAdvice: 'Store flat at room temperature. Extreme heat dries out rubber, causing brittleness and loss of grip.',
    criticalDonts: [
      'Do NOT use petroleum jelly or motor oils on rubber (degrades the compound).'
    ]
  }
];
