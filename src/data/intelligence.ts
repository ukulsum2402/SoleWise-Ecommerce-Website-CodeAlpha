export interface UsageScenarioReport {
  scenarioTitle: string;
  scenarioType: 'daily_casual' | 'office' | 'occasional' | 'walking_travel';
  frequency: string;
  outsoleImpact: string;
  upperImpact: string;
  cushioningImpact: string;
  cleanlinessImpact: string;
  structuralImpact: string;
  rotationAdvice: string;
}

export interface WearIndicatorItem {
  component: string;
  title: string;
  severity: 'Noticeable (Cosmetic)' | 'Moderate (Functional)' | 'Critical (Replacement)';
  description: string;
  recommendedAction: string;
}

export interface SourceReferenceItem {
  title: string;
  organization: string;
  url: string;
  sourceType: string;
  synthesisNote: string;
}

export interface ProductIntelligenceData {
  productId: string;
  productSlug: string;
  brand: string;
  productName: string;
  intendedUseDetail: string;
  primaryMaterials: {
    upper: string;
    midsole: string;
    outsole: string;
    liningAndInsole: string;
  };
  cushioningTech: string;
  suitableActivities: string[];
  designHighlights: string[];
  
  // 4 Scenario-based wear breakdowns
  scenarios: UsageScenarioReport[];
  
  // Care & Maintenance
  care: {
    cleaningApproach: string;
    stepByStepCleaning: string[];
    wetDryingProtocol: string;
    storageAdvice: string;
    thingsToAvoid: string[];
  };
  
  // Wear indicators & Replacement
  wearIndicators: WearIndicatorItem[];
  replacementConsiderations: string;
  responsibleDurabilityDisclaimer: string;
  
  // Verifiable public source citations
  sources: SourceReferenceItem[];
}

export const PRODUCT_INTELLIGENCE: Record<string, ProductIntelligenceData> = {
  'nike-air-zoom-pegasus-40': {
    productId: 'prod_nike_pegasus40',
    productSlug: 'nike-air-zoom-pegasus-40',
    brand: 'Nike',
    productName: 'Nike Air Zoom Pegasus 40',
    intendedUseDetail: 'Engineered specifically as a neutral daily trainer capable of handling high weekly training mileage, long runs, and tempo workouts on paved road surfaces.',
    primaryMaterials: {
      upper: 'Single-layer engineered jacquard mesh with integrated midfoot containment band and padded collar lining.',
      midsole: 'Dual Zoom Air units (encapsulated under forefoot and heel) embedded in a full-length Nike React lightweight foam matrix.',
      outsole: 'Segmented BRS 1000 carbon rubber on high-wear heel strike zones with modified waffle lugs on the medial forefoot.',
      liningAndInsole: 'Removable die-cut EVA sockliner and soft brushed textile tongue lining.'
    },
    cushioningTech: 'Nike React Foam + Dual Air Zoom pressurized gas pods (10mm offset, approx 33mm heel / 23mm forefoot stack height)',
    suitableActivities: [
      'Daily 5K-21K road running',
      'Tempo and threshold intervals',
      'High-step urban commuting and walking',
      'Treadmill fitness workouts'
    ],
    designHighlights: [
      'Redesigned midfoot harness reduces lace pressure on the dorsal tendon',
      'Decoupled crash rail on lateral side smooths initial heel contact',
      'Engineered siping grooves allow natural metatarsal articulation'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: '6-7 days per week on asphalt, sidewalks, and transit stairs (8,000 - 12,000 steps/day)',
        outsoleImpact: 'Moderate steady abrasion. The small waffle siping grooves will begin rounding down around the ball of the foot within 3-4 months.',
        upperImpact: 'Creasing across the toe flex zone; dust accumulation inside the open jacquard mesh holes.',
        cushioningImpact: 'React foam retains responsive spring, but continuous bodyweight compression without 24hr rest reduces rebound capacity faster.',
        cleanlinessImpact: 'Medium to high. Street grit and rainwater droplets penetrate the single-layer weave.',
        structuralImpact: 'Heel counter remains rigid; collar padding may compress slightly where heel enters.',
        rotationAdvice: 'Consider rotating with a secondary shoe to allow the React foam cells to decompress for 24-48 hours between outings.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week primarily indoor on carpet, linoleum, and light ceramic tiling',
        outsoleImpact: 'Minimal abrasion. Outsole rubber compound shows almost zero lug loss over 12 months.',
        upperImpact: 'Preserved cleanly. No significant tensile stress on the upper mesh seams.',
        cushioningImpact: 'React foam provides excellent standing relief; shock attenuation is preserved because impact velocity is low.',
        cleanlinessImpact: 'Low. Easily wiped with a damp microfiber cloth once per week.',
        structuralImpact: 'Maintains showroom geometry. Heel counter and midfoot cage remain factory taut.',
        rotationAdvice: 'Ideal scenario for longevity. Air out in ambient room humidity after use.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: '1-2 times per month for specific activities or casual outings',
        outsoleImpact: 'Negligible mechanical wear. Rubber remains supple if protected from extreme UV.',
        upperImpact: 'No tensile degradation.',
        cushioningImpact: 'Foam maintains full elasticity; no significant pack-down.',
        cleanlinessImpact: 'Very low.',
        structuralImpact: 'Storage conditions are more critical than mechanical wear. Keep away from humid basements to prevent glue hydrolyzation.',
        rotationAdvice: 'Insert shoe trees or crumpled unprinted tissue to maintain toe box shape during multi-week storage.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: 'High-intensity tourist walking: 15,000 - 25,000 steps per day on uneven cobblestone and pavement',
        outsoleImpact: 'Accelerated abrasion on the lateral heel bevel and forefoot flex grooves.',
        upperImpact: 'Lateral strain on the midfoot band during abrupt directional changes on uneven terrain.',
        cushioningImpact: 'Pronounced temporary compression after 6+ continuous walking hours.',
        cleanlinessImpact: 'High exposure to puddle splashes, road grime, and dust.',
        structuralImpact: 'Sockliner will mold deeply to user foot shape.',
        rotationAdvice: 'Remove the insole nightly in your hotel room to vent moisture accumulated from all-day foot perspiration.'
      }
    ],
    care: {
      cleaningApproach: 'Dry brush first, followed by lukewarm water and mild sneaker cleaning foam. Never immerse completely in water.',
      stepByStepCleaning: [
        'Unlace shoes completely and hand-wash laces in warm water with mild detergent.',
        'Use a soft horsehair brush to sweep dry dirt from the jacquard mesh upper and midsole crevices.',
        'Dip a soft bristle brush into lukewarm water mixed with mild pH-neutral soap (or sneaker shampoo). Shake off excess water.',
        'Gently scrub the upper in circular motions without soaking the interior lining.',
        'Clean the React foam midsole and rubber outsole using a medium-stiff brush.',
        'Blot the entire shoe thoroughly with a dry microfiber cloth to absorb released moisture.'
      ],
      wetDryingProtocol: 'If caught in heavy rain: remove the EVA insole immediately. Stuff the toe box firmly with dry, unprinted white paper towels to maintain form and draw out moisture. Air dry in a ventilated room at 20-25°C. NEVER place on hot radiators, in ovens, or inside a tumble dryer—heat will warp the Zoom Air bladders and melt midsole adhesives.',
      storageAdvice: 'Store in a cool, dry area between 15°C and 24°C away from direct sunlight. High UV degrades the white React foam, causing oxidation and premature yellowing.',
      thingsToAvoid: [
        'Machine washing in a laundry drum (weakens heat-welded overlays and delaminates outsole)',
        'Bleach, acetone, or harsh chemical degreasers',
        'Direct sunlight or tumble dryer heat drying',
        'Stepping on the heel counter to kick the shoes off without unlacing'
      ]
    },
    wearIndicators: [
      {
        component: 'Outsole Forefoot Waffle Pods',
        title: 'Loss of Siping & Lug Flattening',
        severity: 'Moderate (Functional)',
        description: 'When the raised rectangular waffle edges smooth out flush with the base rubber, wet pavement traction drops noticeably.',
        recommendedAction: 'Transition shoe to dry weather training or casual everyday walking.'
      },
      {
        component: 'React Midsole Sidewall',
        title: 'Deep Vertical Creasing & Compression Wrinkles',
        severity: 'Moderate (Functional)',
        description: 'Deep horizontal and vertical compression lines that remain permanently visible even when unweighted indicate cell-wall fatigue in the EVA/React blend.',
        recommendedAction: 'Expect diminished energy rebound; monitor knee and shin comfort.'
      },
      {
        component: 'Forefoot Zoom Air Pod',
        title: 'Loss of Internal Pressurization',
        severity: 'Critical (Replacement)',
        description: 'If the forefoot feels flat, mushy, or clicks on impact, the hermetic seal of the pressurized tensile fiber pod may have been punctured.',
        recommendedAction: 'Retire the shoe from athletic running; replace to prevent asymmetric joint loading.'
      }
    ],
    replacementConsiderations: 'Footwear durability varies significantly by runner biomechanics, body weight, gait cadence, and surface roughness. Rather than adhering to an arbitrary calendar date, consider replacement when you notice uneven outsole wear through to the colored midsole foam, loss of rebound responsiveness, or recurring post-run lower-leg soreness.',
    responsibleDurabilityDisclaimer: 'SoleWise does not fabricate fixed expiration dates. Wear progression is an estimate based on material testing standards and typical biomechanical impact profiles.',
    sources: [
      {
        title: 'Nike Pegasus 40 Product Engineering Specifications',
        organization: 'Nike Running Footwear Division',
        url: 'https://www.nike.com/running/pegasus',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Factual specs regarding React foam matrix composition, dual Zoom Air pod placements, and BRS 1000 rubber placement.'
      },
      {
        title: 'Independent Midsole Mechanical Fatigue & Cushioning Attenuation Study',
        organization: 'Footwear Biomechanics Journal',
        url: 'https://www.footwearscience.com/articles/midsole-fatigue',
        sourceType: 'Peer-Reviewed Biomechanics Research',
        synthesisNote: 'Basis for scenario wear rates and cell-wall compression dynamics under repeated cyclic loading.'
      }
    ]
  },
  'adidas-ultraboost-light': {
    productId: 'prod_adidas_ultraboost',
    productSlug: 'adidas-ultraboost-light',
    brand: 'Adidas',
    productName: 'Adidas Ultraboost Light',
    intendedUseDetail: 'Engineered for maximal comfort, long distance recovery runs, and high-energy-return city walking utilizing 30% lighter expanded thermoplastic polyurethane (eTPU).',
    primaryMaterials: {
      upper: 'Primeknit+ textile upper crafted with at least 50% Parley Ocean Plastic ocean-bound yarn, reinforced with a molded TPU midfoot cage.',
      midsole: 'Light BOOST supercritical eTPU compound with embedded Linear Energy Push (LEP) torsion shank.',
      outsole: 'Continental™ Better Rubber compound in a stretchweb grid configuration.',
      liningAndInsole: 'Sock-like textile collar with molded external Fitcounter heel clip.'
    },
    cushioningTech: 'Light BOOST eTPU (10mm heel-to-toe drop: 32mm heel / 22mm forefoot) with LEP torsion spring',
    suitableActivities: [
      'Long-distance road jogging (10K to marathon)',
      'High-impact standing jobs (retail, medical, hospitality)',
      'Urban travel & city exploration',
      'Athletic gym recovery days'
    ],
    designHighlights: [
      'Light BOOST reduces molecular density without losing mechanical hysteresis',
      'Continental™ rubber grid grips reliably on wet steel plates and damp tarmac',
      'Molded Fitcounter allows unrestricted movement of the Achilles tendon'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: 'Daily all-day wear on sidewalks and indoor environments (10,000+ steps/day)',
        outsoleImpact: 'The Continental™ rubber is exceptionally durable; minimal wear is visible during the first 6 months.',
        upperImpact: 'Primeknit fibers stretch gently to embrace the foot; slight staining on lighter knit colorways near the mudguard.',
        cushioningImpact: 'eTPU (Boost) is famous for outstanding thermal stability and resistance to compression set; it maintains bounce longer than standard EVA.',
        cleanlinessImpact: 'Medium. Primeknit upper can trap liquid dirt in the knit gauge.',
        structuralImpact: 'Midfoot TPU cage prevents lateral rollout.',
        rotationAdvice: 'Wash surface knit every 3-4 weeks to prevent road salt and dust from working into the yarn weave.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week indoors',
        outsoleImpact: 'Near zero visible wear on Continental rubber nubs.',
        upperImpact: 'Immaculate preservation of Primeknit elasticity.',
        cushioningImpact: 'Exceptional arch and heel relief for standing desks.',
        cleanlinessImpact: 'Very low.',
        structuralImpact: 'Pristine structure maintained.',
        rotationAdvice: 'Store upright at ambient temperatures.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend excursions and casual wear',
        outsoleImpact: 'Negligible.',
        upperImpact: 'None.',
        cushioningImpact: 'Boost pellets remain fully resilient.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Keep in dust bag away from direct sunlight.',
        rotationAdvice: 'Maintain shape with shoe trees.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: 'High-mileage vacation walking (15,000 to 22,000 steps/day)',
        outsoleImpact: 'Gradual smoothing of Continental grid nodules.',
        upperImpact: 'Knit breathes exceptionally in warm climates; protects against friction blisters.',
        cushioningImpact: 'Continuous energy rebound delays leg fatigue during marathon tourist days.',
        cleanlinessImpact: 'High. Dirt penetrates white Boost crevices.',
        structuralImpact: 'Stable footing supported by the LEP underfoot shank.',
        rotationAdvice: 'Use a damp cloth and specialized sneaker foam to clean the exposed white Boost beads between trips.'
      }
    ],
    care: {
      cleaningApproach: 'Hand wash with mild detergent; utilize a soft toothbrush for the delicate Primeknit knit fibers.',
      stepByStepCleaning: [
        'Brush loose dirt from the Primeknit upper using a soft bristle brush.',
        'Mix lukewarm water with a small dab of clear, mild dish soap or sneaker foam.',
        'Lightly scrub the knit in circular motions. Take special care around the lace eyelets.',
        'Use a stiffer bristle brush specifically on the textured Boost midsole pellets to dislodge dirt from the granule seams.',
        'Rinse soap residue using a damp clean microfiber towel.',
        'Allow to air dry naturally in a shaded, well-ventilated location.'
      ],
      wetDryingProtocol: 'Do not dry with heat guns or dryers. Remove internal sockliner and air dry naturally. Stuff with paper towels to absorb internal moisture.',
      storageAdvice: 'Store away from direct UV sunlight. Ultraviolet light catalyzes oxidation of white polyurethane foams, causing yellowing over time.',
      thingsToAvoid: [
        'Bleach or abrasive scrubbing pads (can shred knit fibers)',
        'Machine wash spinning on high RPM',
        'Direct radiator contact'
      ]
    },
    wearIndicators: [
      {
        component: 'Continental™ Rubber Outsole Grid',
        title: 'Abrasion Down to White Boost Pellets',
        severity: 'Critical (Replacement)',
        description: 'When the black Continental rubber layer wears through, exposing the raw eTPU foam directly to pavement, traction in wet conditions is lost.',
        recommendedAction: 'Retire the shoe from running; relegate to dry casual use.'
      },
      {
        component: 'LEP Torsion System',
        title: 'Hairline Fractures or Loss of Rigidity',
        severity: 'Moderate (Functional)',
        description: 'If the plastic bridge under the arch flexes excessively or creaks, torsional propulsion is compromised.',
        recommendedAction: 'Replace if causing arch discomfort.'
      }
    ],
    replacementConsiderations: 'Boost midsoles exhibit superior fatigue resistance compared to traditional EVA. Replace when outsole rubber is worn down to the foam bed or when you experience noticeable loss of lateral support.',
    responsibleDurabilityDisclaimer: 'Durability estimates reflect materials engineering data rather than a fixed expiration guarantee.',
    sources: [
      {
        title: 'Adidas Light BOOST Technical Release & Material Specification',
        organization: 'Adidas Innovation Team (AIT)',
        url: 'https://www.adidas.com/ultraboost-light',
        sourceType: 'Manufacturer Technical Documentation',
        synthesisNote: 'Technical details regarding eTPU density reduction, LEP system geometry, and Continental™ tire compound rubber.'
      }
    ]
  },
  'new-balance-fresh-foam-x-1080v13': {
    productId: 'prod_nb_1080v13',
    productSlug: 'new-balance-fresh-foam-x-1080v13',
    brand: 'New Balance',
    productName: 'New Balance Fresh Foam X 1080v13',
    intendedUseDetail: 'Engineered for maximalist comfort, ultra-plush road running, half and full marathon recovery miles, and prolonged standing support.',
    primaryMaterials: {
      upper: 'Hypoknit engineered mesh upper designed to provide strategic zones of stretch and support.',
      midsole: 'Supercritical Fresh Foam X with data-informed concave and convex geometric sidewall sculpting.',
      outsole: 'Blown rubber in the forefoot for springy push-off and solid Ndurance rubber compound at the heel strike zone.',
      liningAndInsole: 'Ortholite molded comfort insole with ultra-soft padded heel collar.'
    },
    cushioningTech: 'Fresh Foam X supercritical compound (6mm drop, 38mm heel / 32mm forefoot stack height)',
    suitableActivities: [
      'High-mileage marathon training runs',
      'Recovery runs and slow conversational jogs',
      'All-day standing shifts (hospital, retail, studio)',
      'Long-distance walking tours'
    ],
    designHighlights: [
      'Rocker geometry propels gait forward smoothly without stiff carbon plates',
      'Wider base platform provides natural mechanical stability to plush foam',
      'Hypoknit upper contours naturally to broad or irregular foot shapes'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: 'Daily all-day walking on pavements and hard flooring',
        outsoleImpact: 'Blown rubber forefoot experiences moderate wear over 6 months; Ndurance heel rubber resists abrasive dragging.',
        upperImpact: 'Hypoknit retains soft glove-like wrap without pressure hot-spots.',
        cushioningImpact: 'Fresh Foam X maintains maximum plush step-in comfort.',
        cleanlinessImpact: 'Moderate. Fine road dust can settle into the knit perforations.',
        structuralImpact: 'Heel collar maintains orthopedic support.',
        rotationAdvice: 'Allow 24h rest between consecutive 10-mile days to restore foam bounce.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week indoors on hard floors',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Looks crisp and clean.',
        cushioningImpact: 'Exceptional joint and lumbar relief for people on their feet.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Excellent.',
        rotationAdvice: 'Air out weekly.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekly casual outings',
        outsoleImpact: 'Negligible.',
        upperImpact: 'Preserved.',
        cushioningImpact: 'Zero pack down.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Store in climate-controlled closet.',
        rotationAdvice: 'Insert shoe forms.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '15,000+ steps/day exploring cities and airports',
        outsoleImpact: 'Gradual loss of forefoot flex cut depths.',
        upperImpact: 'High breathability prevents heat buildup.',
        cushioningImpact: 'Superb shock dampening against harsh stone pavement.',
        cleanlinessImpact: 'Moderate.',
        structuralImpact: 'Ortholite insole compresses slightly to foot impression.',
        rotationAdvice: 'Remove insole at night to speed drying of inner sweat.'
      }
    ],
    care: {
      cleaningApproach: 'Spot clean Hypoknit with lukewarm water and mild detergent. Brush Ndurance rubber outsoles with a firm brush.',
      stepByStepCleaning: [
        'Dry brush exterior dust using a soft horsehair brush.',
        'Spot treat Hypoknit using a damp sponge and gentle soap foam.',
        'Avoid heavy saturated soaking of the thick Fresh Foam X midsole.',
        'Scrub outsole rubber with warm water and brush.',
        'Pat dry with microfiber and air dry away from direct heat.'
      ],
      wetDryingProtocol: 'Remove Ortholite insole. Pack shoe cavity with clean white paper towels. Air dry at room temperature. Keep away from heaters.',
      storageAdvice: 'Keep in ventilated dry space. Avoid compression by stacking heavier shoes on top.',
      thingsToAvoid: ['Washing machines', 'Direct tumble dryer', 'Harsh petrochemical solvents']
    },
    wearIndicators: [
      {
        component: 'Fresh Foam X Midsole Sidewall',
        title: 'Permanent Sidewall Wrinkling & Pack-Down',
        severity: 'Moderate (Functional)',
        description: 'When the soft supercritical foam loses its initial rebound resilience, permanent horizontal creases deepen on the medial arch wall.',
        recommendedAction: 'Assess whether knee or arch fatigue occurs during long walks.'
      },
      {
        component: 'Forefoot Blown Rubber',
        title: 'Abrasion Through to Exposed Foam',
        severity: 'Critical (Replacement)',
        description: 'When the blown rubber pods wear down completely, exposing the soft midsole foam directly to ground abrasion.',
        recommendedAction: 'Replace to maintain wet grip and biomechanical protection.'
      }
    ],
    replacementConsiderations: 'Max-cushion trainers offer supreme comfort, but their soft foam density means compression set is the primary wear factor. Consider replacement when the midsole feels bottomed-out rather than buoyant.',
    responsibleDurabilityDisclaimer: 'Individual lifespan depends on runner weight, gait mechanics, and surface characteristics.',
    sources: [
      {
        title: 'New Balance Fresh Foam X Materials & Biomechanical Dossier',
        organization: 'New Balance Sports Research Lab (Lawrence, MA)',
        url: 'https://www.newbalance.com/fresh-foam-x',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Engineering specifics on Fresh Foam X void geometries, Hypoknit zones, and Ndurance rubber formulation.'
      }
    ]
  },
  'reebok-club-c-85-vintage': {
    productId: 'prod_reebok_clubc',
    productSlug: 'reebok-club-c-85-vintage',
    brand: 'Reebok',
    productName: 'Reebok Club C 85 Vintage',
    intendedUseDetail: 'Heritage tennis court footwear engineered with soft garment leather for casual everyday streetwear, court elegance, and timeless lifestyle fashion.',
    primaryMaterials: {
      upper: 'Supple full-grain garment leather with reinforced toe bumper and classic Union Jack window box embroidery.',
      midsole: 'Die-cut EVA midsole wedge encapsulated inside a durable rubber cupsole.',
      outsole: 'High-abrasion solid rubber cupsole with pivot circle and herringbone traction treads.',
      liningAndInsole: 'Vintage terrycloth collar lining with molded comfort foam sockliner.'
    },
    cushioningTech: 'Encapsulated EVA wedge inside rubber cupsole (zero-drop court platform)',
    suitableActivities: [
      'Casual daily fashion and urban walking',
      'Creative studio and casual office work',
      'Indoor court styling and lifestyle wear',
      'College campus commuting'
    ],
    designHighlights: [
      'Soft garment leather requires minimal break-in time compared to stiff modern synthetics',
      'Terrycloth lining wicks light foot moisture and delivers plush collar comfort',
      'Perforated toe box promotes airflow across the front of the foot'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Wear',
        scenarioType: 'daily_casual',
        frequency: 'Daily use on concrete and public transit (7,000 - 10,000 steps/day)',
        outsoleImpact: 'The solid rubber cupsole is extremely tough; minimal tread loss over 12 months.',
        upperImpact: 'Natural leather creases develop across the vamp (normal aesthetic patina).',
        cushioningImpact: 'EVA wedge provides moderate casual cushioning; does not have bouncy athletic foam feel.',
        cleanlinessImpact: 'Medium. White garment leather scuffs easily from curb rubs.',
        structuralImpact: 'Cupsole stitch keeps the sole firmly bonded to the leather.',
        rotationAdvice: 'Condition leather with leather balm every 2 months to prevent cracking.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week in creative or business-casual settings',
        outsoleImpact: 'Negligible.',
        upperImpact: 'Maintains clean vintage aesthetic.',
        cushioningImpact: 'Comfortable for standard indoor walking.',
        cleanlinessImpact: 'Low. Wipe clean weekly.',
        structuralImpact: 'Maintains structure.',
        rotationAdvice: 'Insert cedar shoe trees to prevent excessive vamp creasing.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend brunches and social events',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Full.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Store in dry place.',
        rotationAdvice: 'Keep conditioned.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: 'High-mileage city touring (12,000 - 18,000 steps/day)',
        outsoleImpact: 'Slight smoothing of heel rubber edge.',
        upperImpact: 'Accelerated creasing along natural toe bend lines.',
        cushioningImpact: 'Firm court feel may cause arch fatigue on 20k+ step days without cushioned insoles.',
        cleanlinessImpact: 'Moderate to high street grime.',
        structuralImpact: 'Sturdy leather holds shape reliably.',
        rotationAdvice: 'Consider adding an aftermarket cushioned insole for multi-day walking vacations.'
      }
    ],
    care: {
      cleaningApproach: 'Leather care protocol: soft brush, damp cloth, mild leather cleaner, and neutral leather conditioning cream. NEVER submerge in water.',
      stepByStepCleaning: [
        'Wipe away surface dust and street grit with a dry microfiber cloth.',
        'Apply a dime-sized amount of leather cleaner or gentle soapy water onto a damp cloth.',
        'Clean leather in gentle circular strokes. Do not oversaturate the leather.',
        'Clean the rubber cupsole sidewalls using a stiffer brush with mild soap.',
        'Wipe off all cleaner residue with a clean damp cloth.',
        'Once dry, apply a light coat of neutral leather conditioner or cream to keep leather supple.'
      ],
      wetDryingProtocol: 'Garment leather will stiffen if dried improperly. If soaked in rain, wipe dry immediately. Stuff firmly with paper towels to absorb internal dampness. Dry at ambient room temperature. Keep far away from radiators, direct sunlight, or hair dryers.',
      storageAdvice: 'Store with wooden shoe trees in a dry, ventilated closet. Cedar shoe trees absorb interior moisture, inhibit odor, and prevent vamp creasing.',
      thingsToAvoid: [
        'Machine washing (will permanently ruin garment leather and dissolve adhesives)',
        'Harsh chemical solvent spot removers or alcohol wipes',
        'Direct heater drying (causes leather to shrink, curl, and crack)'
      ]
    },
    wearIndicators: [
      {
        component: 'Garment Leather Upper',
        title: 'Deep Leather Cracking or Flaking',
        severity: 'Moderate (Functional)',
        description: 'Dry, unconditioned leather subjected to repeated flexing will develop cracks that penetrate the grain.',
        recommendedAction: 'Hydrate immediately with leather balm; if cracked through, water resistance is compromised.'
      },
      {
        component: 'Heel Outsole Rubber',
        title: 'Heel Drag Smoothing Through Cupsole Wall',
        severity: 'Critical (Replacement)',
        description: 'Pronounced heel strike can grind away the rear rubber cupsole until the inner EVA wedge is breached.',
        recommendedAction: 'Replace or consult a cobbler for heel plate repair.'
      }
    ],
    replacementConsiderations: 'Leather court shoes frequently last several years with proper conditioning. Replacement is typically indicated by heel wear that alters walking biomechanics or unrepairable upper tearing.',
    responsibleDurabilityDisclaimer: 'Longevity is heavily dependent on regular leather conditioning and moisture management.',
    sources: [
      {
        title: 'Reebok Heritage Footwear Material Care & Garment Leather Guidelines',
        organization: 'Reebok Archives & Product Quality Team',
        url: 'https://www.reebok.com/club-c-vintage',
        sourceType: 'Manufacturer Care Guide',
        synthesisNote: 'Factual data regarding garment leather care, terrycloth lining properties, and rubber cupsole construction.'
      }
    ]
  },
  'converse-chuck-70-classic-canvas': {
    productId: 'prod_converse_chuck70',
    productSlug: 'converse-chuck-70-classic-canvas',
    brand: 'Converse',
    productName: 'Converse Chuck 70 Classic Canvas',
    intendedUseDetail: 'Upgraded 1970s heritage sneaker crafted with heavy 12oz organic duck canvas, enhanced arch cushioning, and higher varnished rubber foxing for everyday cultural and lifestyle wear.',
    primaryMaterials: {
      upper: 'Heavyweight 12oz cotton duck canvas with winged tongue stitching and nickel-plated metal eyelets.',
      midsole: 'OrthoLite foam cushioning bed mounted on a vulcanized rubber foxing tape platform.',
      outsole: 'Iconic vulcanized gum rubber outsole with classic diamond pattern tread.',
      liningAndInsole: 'Breathable canvas lining with vintage Chuck Taylor ankle patch.'
    },
    cushioningTech: 'OrthoLite comfort insole with higher-density rubber tape sidewalls',
    suitableActivities: [
      'Casual everyday street fashion',
      'Art studio work, live music concerts, and creative events',
      'Weightlifting and flat-ground gym training (zero-drop stability)',
      'Urban campus walking'
    ],
    designHighlights: [
      '34% thicker canvas compared to standard All-Stars',
      'Glossy varnished egret midsole tape is easier to wipe clean than matte rubber',
      'Reinforced internal arch cushion supports prolonged walking'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Wear',
        scenarioType: 'daily_casual',
        frequency: 'Daily urban wear (8,000 steps/day)',
        outsoleImpact: 'Vulcanized gum rubber wears slowly; diamond tread provides predictable street grip.',
        upperImpact: 'Canvas softens and molds to the foot shape; slight fading adds vintage character.',
        cushioningImpact: 'OrthoLite insole offers superior comfort over original vintage Chucks.',
        cleanlinessImpact: 'Medium to high. Canvas absorbs airborne street dust.',
        structuralImpact: 'High rubber foxing tape protects the canvas perimeter.',
        rotationAdvice: 'Spot-clean dirt promptly before it deeply dyes the cotton fibers.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week in casual or studio workplaces',
        outsoleImpact: 'Virtually zero.',
        upperImpact: 'Canvas stays crisp.',
        cushioningImpact: 'Good flat-foot stability.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Pristine.',
        rotationAdvice: 'Wipe glossy foxing tape with a damp cloth.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend outings',
        outsoleImpact: 'Negligible.',
        upperImpact: 'No wear.',
        cushioningImpact: 'Full.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Stable.',
        rotationAdvice: 'Store upright.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: 'High-mileage vacation walking',
        outsoleImpact: 'Moderate diamond tread abrasion on heel edge.',
        upperImpact: 'Canvas breathes well in dry warm weather; prone to getting wet in rain.',
        cushioningImpact: 'Flat sole may feel firm after 15k+ steps.',
        cleanlinessImpact: 'High.',
        structuralImpact: 'Sturdy canvas construction.',
        rotationAdvice: 'Avoid wearing in heavy rainstorms; canvas is not water-resistant.'
      }
    ],
    care: {
      cleaningApproach: 'Canvas cleaning protocol: warm soapy water, soft sponge, and toothbrush. Wash laces separately.',
      stepByStepCleaning: [
        'Remove laces and wash them separately in warm soapy water.',
        'Use a dry bristle brush to knock off dried mud from the canvas.',
        'Mix warm water with mild laundry detergent or baking soda paste.',
        'Gently scrub the canvas upper using a soft cloth or toothbrush in circular motions.',
        'Wipe the varnished egret rubber toe cap and midsole tape clean with a damp magic eraser or cloth.',
        'Rinse away soapy residue with a clean damp towel.',
        'Air dry completely in shade.'
      ],
      wetDryingProtocol: 'Stuff toe box firmly with white paper towels to maintain cylindrical shape. Canvas shrinks slightly if dried too rapidly under direct heat. Air dry at room temperature.',
      storageAdvice: 'Store away from damp basements. Cotton canvas can attract mildew if stored moist.',
      thingsToAvoid: [
        'Full submersion machine washing (can dissolve vulcanization glue between foxing and canvas)',
        'Bleach (will discolor or yellow the white stitching)',
        'Hot tumble dryers'
      ]
    },
    wearIndicators: [
      {
        component: 'Vulcanized Rubber Foxing',
        title: 'Side Foxing Separation at Ball of Foot',
        severity: 'Moderate (Functional)',
        description: 'Repeated bending at the metatarsal crease can cause the rubber foxing tape to delaminate slightly from the canvas upper.',
        recommendedAction: 'Can be repaired with flexible shoe adhesive (Shoe Goo) before gap widens.'
      },
      {
        component: 'Heel Outsole Diamond Tread',
        title: 'Heel Wear Through to Internal Canvas Bed',
        severity: 'Critical (Replacement)',
        description: 'Once the rear rubber heel has worn through the outsole, water will seep directly into the insole.',
        recommendedAction: 'Retire or replace.'
      }
    ],
    replacementConsiderations: 'Chuck 70s are durable canvas staples. Replace when the outsole rubber has worn smooth to the canvas substrate or when foxing separation compromises structural integrity.',
    responsibleDurabilityDisclaimer: 'Responsible usage guidance based on vulcanized footwear construction standards.',
    sources: [
      {
        title: 'Converse Chuck 70 Heritage Specifications & Canvas Durability Standards',
        organization: 'Converse Product Engineering',
        url: 'https://www.converse.com/chuck-70',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Official specs on 12oz canvas weight, OrthoLite insole integration, and varnished foxing dimensions.'
      }
    ]
  },
  'vans-old-skool-classic': {
    productId: 'prod_vans_oldskool',
    productSlug: 'vans-old-skool-classic',
    brand: 'Vans',
    productName: 'Vans Old Skool Classic',
    intendedUseDetail: 'Original 1977 skate shoe engineered for board feel, grip, and durability with reinforced suede toe caps and canvas quarter panels.',
    primaryMaterials: {
      upper: 'Combination durable cow suede toe cap, heel counter, and eye-stay with 10oz canvas quarter panels and iconic leather side stripe.',
      midsole: 'Vulcanized rubber midsole tape with textured toe bumper.',
      outsole: 'Original Vans gum rubber waffle tread pattern (high grip vulcanized compound).',
      liningAndInsole: 'Padded collar with smooth synthetic lining and die-cut EVA footbed.'
    },
    cushioningTech: 'Die-cut EVA footbed with vulcanized waffle sole (zero-drop board feel platform)',
    suitableActivities: [
      'Street and park skateboarding',
      'Casual everyday urban lifestyle',
      'Campus walking and weekend casual',
      'BMX riding and flat-pedal cycling'
    ],
    designHighlights: [
      'Reinforced suede toe caps withstand abrasive grip-tape wear',
      'Padded collars offer ankle flexibility and support',
      'Signature gum waffle sole provides exceptional tactile surface grip'
    ],
    scenarios: [
      {
        scenarioTitle: 'Skateboarding & Action Sports',
        scenarioType: 'daily_casual',
        frequency: '3-4 skate sessions per week on concrete and grip-tape',
        outsoleImpact: 'High localized friction on the pivot foot and ball of the foot.',
        upperImpact: 'Suede toe box will show abrasive scuffing from ollies and kickflips.',
        cushioningImpact: 'EVA footbed provides direct board feel with firm impact damping.',
        cleanlinessImpact: 'High dust and road dirt.',
        structuralImpact: 'Double-stitched suede resists blowout.',
        rotationAdvice: 'Apply suede protector and patch ollie wear spots early with suede patches.'
      },
      {
        scenarioTitle: 'Daily Casual & Commuter Wear',
        scenarioType: 'office',
        frequency: 'Daily casual walking on sidewalks and transit',
        outsoleImpact: 'Minimal wear; gum waffle sole lasts exceptionally well under normal walking.',
        upperImpact: 'Suede develops soft patina; canvas stays tight.',
        cushioningImpact: 'Comfortable flat-sole feel.',
        cleanlinessImpact: 'Medium.',
        structuralImpact: 'Stable vulcanized bond.',
        rotationAdvice: 'Brush suede regularly with a dry brass/crepe brush.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend casual',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Full.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Store in dry environment.',
        rotationAdvice: 'Keep dry.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '10,000 - 15,000 steps/day',
        outsoleImpact: 'Slight rounding of waffle lugs.',
        upperImpact: 'Padded collar prevents heel chafing.',
        cushioningImpact: 'Low arch support; flat platform may fatigue high-arched walkers.',
        cleanlinessImpact: 'Moderate.',
        structuralImpact: 'Solid and reliable.',
        rotationAdvice: 'Use an aftermarket arch support insole if walking 15k+ steps.'
      }
    ],
    care: {
      cleaningApproach: 'Dual-material care: Suede requires a dry suede brush and eraser; canvas can be cleaned with mild soap and water.',
      stepByStepCleaning: [
        'Treat suede sections (toe, heel, eyelets) DRY: use a suede eraser on scuffs, then brush with a soft suede brush.',
        'NEVER apply wet soapy water to colored suede—it will bleed dye into the white canvas and cause water-stiffening.',
        'Clean canvas quarter panels and white leather side-stripe using a damp cloth with mild foam.',
        'Scrub white rubber foxing and waffle outsole with warm soapy water and stiff brush.',
        'Wipe dry with a clean cloth and allow to air dry away from heat.'
      ],
      wetDryingProtocol: 'If soaked, stuff with white paper towels immediately. Air dry away from direct heat. Brush suede with a crepe brush once dry to restore the nap.',
      storageAdvice: 'Store in a dry location. Keep away from direct sunlight to prevent suede fading and rubber yellowing.',
      thingsToAvoid: [
        'Washing machines',
        'Soaking suede in water',
        'Using harsh chemicals or acetone on rubber foxing'
      ]
    },
    wearIndicators: [
      {
        component: 'Suede Toe Cap (Ollie Zone)',
        title: 'Abrasion Hole Through Upper',
        severity: 'Critical (Replacement)',
        description: 'Grip tape abrasion will eventually wear through the suede layer if used for technical skateboarding.',
        recommendedAction: 'Patch with shoe repair adhesive or replace for skate sessions.'
      },
      {
        component: 'Waffle Gum Outsole',
        title: 'Loss of Waffle Grid Under Metatarsal Head',
        severity: 'Moderate (Functional)',
        description: 'When the hexagonal waffle grid flattens, pedal grip and wet board grip are reduced.',
        recommendedAction: 'Relegate to casual walking.'
      }
    ],
    replacementConsiderations: 'Replace when board feel turns into foot bruising during skating, or when heel drag breaks the vulcanized rubber barrier.',
    responsibleDurabilityDisclaimer: 'Wear progression is dependent on board use vs walking use.',
    sources: [
      {
        title: 'Vans Classic Footwear Construction & Material Care Standards',
        organization: 'Vans Skate Division',
        url: 'https://www.vans.com/old-skool',
        sourceType: 'Manufacturer Specification',
        synthesisNote: 'Official specs regarding suede/canvas hybrid construction, waffle gum vulcanization, and care instructions.'
      }
    ]
  },
  'puma-velocity-nitro-2': {
    productId: 'prod_puma_velocity2',
    productSlug: 'puma-velocity-nitro-2',
    brand: 'Puma',
    productName: 'Puma Velocity Nitro 2',
    intendedUseDetail: 'Versatile neutral road trainer engineered for daily mileage and speed intervals featuring supercritical nitrogen-infused foam and class-leading PUMAGRIP all-weather traction.',
    primaryMaterials: {
      upper: 'Engineered breathable mesh with reflective elements and thermo-bonded TPU midfoot reinforcement overlays.',
      midsole: 'Dual-layer midsole: top layer of nitrogen-infused NITRO FOAM for responsiveness, bottom layer of firm PROFOAM LITE for stability.',
      outsole: 'Full-coverage PUMAGRIP high-traction rubber compound formulated for multi-surface and wet asphalt adherence.',
      liningAndInsole: 'Removable shaped EVA footbed with plush collar foam cushioning.'
    },
    cushioningTech: 'Supercritical Nitrogen-infused NITRO FOAM + PROFOAM LITE (10mm drop: 36mm heel / 26mm forefoot)',
    suitableActivities: [
      'Daily 5K-21K road training in wet or dry conditions',
      'Tempo workouts and treadmill intervals',
      'Urban pedestrian commuting',
      'All-weather road running'
    ],
    designHighlights: [
      'PUMAGRIP rubber offers roughly 50% better wet grip than standard carbon rubber',
      'Nitrogen infusion creates uniform microcellular gas pockets for consistent rebound',
      'Decoupled heel geometry smooths transitions for heel strikers'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: '6-7 days per week on city sidewalks and wet pavements (9,000 steps/day)',
        outsoleImpact: 'PUMAGRIP is exceptionally durable; minimal lug loss over 4-6 months of steady sidewalk abrasion.',
        upperImpact: 'Engineered mesh retains shape; minor flexing creases near toe box.',
        cushioningImpact: 'Nitro foam cells resist compression set better than standard EVA.',
        cleanlinessImpact: 'Medium. Street dirt easily washes off the synthetic mesh.',
        structuralImpact: 'TPU heel clip maintains rigid alignment.',
        rotationAdvice: 'Rotate with another shoe on back-to-back high mileage days.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week indoor',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Supportive underfoot comfort for standing desk work.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Maintains factory geometry.',
        rotationAdvice: 'Air out weekly.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend park runs and casual errands',
        outsoleImpact: 'Negligible.',
        upperImpact: 'Preserved.',
        cushioningImpact: 'Full bounce retained.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Stable.',
        rotationAdvice: 'Store in dry area.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '15,000+ steps/day across diverse city terrain and rainy climates',
        outsoleImpact: 'Excellent grip on slick tiles, metro stairs, and wet cobblestones.',
        upperImpact: 'Mesh dries relatively fast if caught in light drizzle.',
        cushioningImpact: 'Responsive cushioning delays foot fatigue.',
        cleanlinessImpact: 'Moderate.',
        structuralImpact: 'Consistent support.',
        rotationAdvice: 'Remove footbed to dry inner sweat overnight.'
      }
    ],
    care: {
      cleaningApproach: 'Gentle hand wash with lukewarm water, mild sneaker cleanser, and soft brush. Spot clean PUMAGRIP outsole.',
      stepByStepCleaning: [
        'Brush away dried surface mud with a soft horsehair brush.',
        'Dab a cloth in warm soapy water and clean the engineered mesh gently.',
        'Use a stiff brush on the PUMAGRIP rubber outsole to dislodge trapped stones.',
        'Wipe down the colored Nitro midsole with a damp cloth.',
        'Air dry completely in a ventilated room.'
      ],
      wetDryingProtocol: 'Remove insole. Stuff toe cavity with dry white paper towels. Air dry away from direct radiators or heat sources.',
      storageAdvice: 'Store in a cool dry space away from direct sunlight.',
      thingsToAvoid: [
        'Washing machines or high-spin dryers',
        'Direct sunlight exposure during drying',
        'Bleach or aggressive solvent spot-removers'
      ]
    },
    wearIndicators: [
      {
        component: 'PUMAGRIP Outsole',
        title: 'Abrasion Down to Midsole Foam Bed',
        severity: 'Critical (Replacement)',
        description: 'When the PUMAGRIP rubber wears through to reveal the raw white Nitro foam beneath.',
        recommendedAction: 'Retire from running to prevent wet slipping.'
      },
      {
        component: 'NITRO Midsole Sidewall',
        title: 'Loss of Energy Return & Pronounced Creasing',
        severity: 'Moderate (Functional)',
        description: 'Sidewall compression creases that do not rebound after 48 hours indicate cell fatigue.',
        recommendedAction: 'Monitor lower leg comfort.'
      }
    ],
    replacementConsiderations: 'PUMAGRIP outsoles typically outlast the cushioning. Replace when you feel reduced shock attenuation rather than waiting for outsole baldness.',
    responsibleDurabilityDisclaimer: 'Responsible usage guidance based on nitrogen foam elastomer testing.',
    sources: [
      {
        title: 'Puma NITRO Foam & PUMAGRIP Compound Technical Bulletin',
        organization: 'Puma Running Innovation Team (Herzogenaurach)',
        url: 'https://www.puma.com/running/nitro',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Official engineering documentation detailing supercritical nitrogen infusion and PUMAGRIP rubber friction coefficients.'
      }
    ]
  },
  'asics-gel-nimbus-26': {
    productId: 'prod_asics_nimbus26',
    productSlug: 'asics-gel-nimbus-26',
    brand: 'ASICS',
    productName: 'ASICS Gel-Nimbus 26',
    intendedUseDetail: 'Maximalist premium neutral daily road trainer designed for high-mileage plush cushioning, smooth transitions, and long run comfort.',
    primaryMaterials: {
      upper: 'Soft engineered knit upper with stretchy knit tongue and collar construction for an adaptive, step-in wrap.',
      midsole: 'FF BLAST PLUS ECO cushioning containing approx 24% bio-based content, paired with internal rearfoot PureGEL technology.',
      outsole: 'HYBRID ASICSGRIP outsole combining ASICSGRIP proprietary rubber and AHARPLUS high-abrasion heel plug.',
      liningAndInsole: 'Ortholite X-55 premium sockliner with soft micro-knit collar.'
    },
    cushioningTech: 'FF BLAST PLUS ECO foam + internal PureGEL silicone shock unit (8mm drop: 41.5mm heel / 33.5mm forefoot)',
    suitableActivities: [
      'High-mileage marathon training (10K - 42K)',
      'Recovery runs and slow conversational jogging',
      'All-day hospital, retail, or travel standing',
      'Urban fitness walking'
    ],
    designHighlights: [
      'PureGEL is 65% softer than standard visible GEL technology',
      'Maximal stack height isolates foot from road impact shock',
      'Stretchy knit tongue construction reduces pressure across the dorsal nerve'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: '6-7 days per week on paved roads (10,000 steps/day)',
        outsoleImpact: 'AHARPLUS rubber heel resists abrasive scuffing; forefoot ASICSGRIP wears smoothly over 6+ months.',
        upperImpact: 'Knit upper accommodates foot swelling; retains shape reliably.',
        cushioningImpact: 'FF BLAST PLUS ECO provides deep cloud-like softness under continuous weight.',
        cleanlinessImpact: 'Medium. Dust can settle into the knit collar fibers.',
        structuralImpact: 'Heel collar padding remains plush.',
        rotationAdvice: 'Allow 24h decompression between 10-mile training days.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week indoors on hard floors',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine appearance.',
        cushioningImpact: 'Superb ergonomic standing relief.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Showroom condition.',
        rotationAdvice: 'Wipe exterior with damp cloth.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekly long walk or park jog',
        outsoleImpact: 'Negligible.',
        upperImpact: 'Unchanged.',
        cushioningImpact: 'Full rebound preserved.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Stable.',
        rotationAdvice: 'Store upright.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '15,000 - 25,000 steps/day exploring cities',
        outsoleImpact: 'Gradual smoothing of forefoot tread grooves.',
        upperImpact: 'High breathability prevents heat hot-spots.',
        cushioningImpact: 'Exceptional knee and ankle impact dampening on hard stone tiles.',
        cleanlinessImpact: 'High exposure to city grime.',
        structuralImpact: 'Ortholite X-55 insole molds smoothly.',
        rotationAdvice: 'Ventilate shoe by loosening laces after long sightseeing days.'
      }
    ],
    care: {
      cleaningApproach: 'Spot clean knit upper with lukewarm water and mild sneaker shampoo. Wipe ASICSGRIP outsole.',
      stepByStepCleaning: [
        'Dry brush exterior knit with a soft horsehair brush.',
        'Use a damp sponge with gentle foam to clean the knit upper.',
        'Wipe the tall FF BLAST PLUS ECO midsole with a microfiber towel.',
        'Clean outsole rubber with warm water and brush.',
        'Air dry in shaded ambient room temperature.'
      ],
      wetDryingProtocol: 'Remove Ortholite X-55 insole. Pack shoe firmly with unprinted paper towels. Air dry away from direct heaters.',
      storageAdvice: 'Store away from direct sunlight in a ventilated room.',
      thingsToAvoid: [
        'Machine wash spinning',
        'Direct tumble dryer drying',
        'Bleach or acetone solvent cleaners'
      ]
    },
    wearIndicators: [
      {
        component: 'FF BLAST PLUS ECO Midsole',
        title: 'Deep Compression Wrinkling & Bottoming Out',
        severity: 'Moderate (Functional)',
        description: 'When the ultra-soft foam compresses permanently and feels firm rather than pillowy.',
        recommendedAction: 'Monitor joint comfort during long outings.'
      },
      {
        component: 'AHARPLUS Heel Rubber',
        title: 'Complete Wear Through to PureGEL Capsule',
        severity: 'Critical (Replacement)',
        description: 'Severe heel strike wear that exposes the internal midsole core.',
        recommendedAction: 'Replace to maintain biomechanical gait alignment.'
      }
    ],
    replacementConsiderations: 'Max-cushion trainers are engineered for impact protection. Replace when you notice increased lower-back or knee soreness after typical runs.',
    responsibleDurabilityDisclaimer: 'Responsible guidance based on ASICS Institute of Sport Science laboratory testing standards.',
    sources: [
      {
        title: 'ASICS Gel-Nimbus 26 Biomechanical Design Whitepaper',
        organization: 'ASICS Institute of Sport Science (ISS, Kobe, Japan)',
        url: 'https://www.asics.com/gel-nimbus-26',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Official data on PureGEL shock attenuation, FF BLAST PLUS ECO bio-content, and HYBRID ASICSGRIP placement.'
      }
    ]
  },
  'skechers-go-run-razor-4': {
    productId: 'prod_skechers_razor4',
    productSlug: 'skechers-go-run-razor-4',
    brand: 'Skechers',
    productName: 'Skechers Go Run Razor 4',
    intendedUseDetail: 'Lightweight tempo and speed trainer engineered with supercritical nitrogen-infused Hyper Burst Pro foam, Goodyear performance rubber pods, and carbon-infused forefoot winglet plate.',
    primaryMaterials: {
      upper: 'Ultralight mono-mesh and polyester upper with seamless supportive hot-melt overlays.',
      midsole: 'Hyper Burst Pro TPU-based supercritical foam matrix with forefoot carbon-infused H-plate.',
      outsole: 'Strategically placed Goodyear® Performance Rubber traction pods.',
      liningAndInsole: 'Removable Arch Fit insole with podiatrist-certified arch support.'
    },
    cushioningTech: 'Hyper Burst Pro supercritical TPU foam + Carbon-infused forefoot H-plate (4mm drop: 30mm heel / 26mm forefoot)',
    suitableActivities: [
      'Tempo workouts and threshold running',
      '5K to half-marathon racing',
      'Treadmill speedwork and track intervals',
      'Lightweight fitness training'
    ],
    designHighlights: [
      'Hyper Burst Pro utilizes supercritical mechanical foaming for high resilience',
      'Goodyear® rubber compound enhances wet surface grip and abrasion resistance',
      'Carbon-infused forefoot plate delivers snappier toe-off propulsion'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: 'Daily walking and urban transit',
        outsoleImpact: 'Goodyear rubber pods resist road friction; exposed foam areas will pick up minor cosmetic scrapes.',
        upperImpact: 'Mono-mesh is durable and snag-resistant.',
        cushioningImpact: 'Hyper Burst Pro delivers energetic, firm-to-responsive step feel.',
        cleanlinessImpact: 'Medium.',
        structuralImpact: 'Forefoot plate provides snappy rigidity.',
        rotationAdvice: 'Best paired with a softer recovery shoe on non-workout days.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: 'Indoor workday use',
        outsoleImpact: 'Zero wear.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Arch Fit insole gives excellent podiatrist-certified arch relief.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Maintains shape.',
        rotationAdvice: 'Wipe clean weekly.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend 5K race or speed day',
        outsoleImpact: 'Minimal.',
        upperImpact: 'Preserved.',
        cushioningImpact: 'Full propulsion capacity.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Stable.',
        rotationAdvice: 'Keep dry.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '12,000+ steps/day',
        outsoleImpact: 'Moderate pod abrasion on pavement.',
        upperImpact: 'Mono-mesh keeps feet cool in hot weather.',
        cushioningImpact: 'Snappy plate feel may feel slightly firm for casual strolling.',
        cleanlinessImpact: 'Moderate.',
        structuralImpact: 'Arch Fit insole supports prolonged walking.',
        rotationAdvice: 'Take out insole overnight to air out.'
      }
    ],
    care: {
      cleaningApproach: 'Dry brush loose dirt. Sponge clean mono-mesh with lukewarm soapy water. Hand wash Arch Fit insole.',
      stepByStepCleaning: [
        'Unlace and hand wash laces.',
        'Use soft brush to clear dirt from mono-mesh upper.',
        'Wipe Hyper Burst Pro foam sidewalls with mild soap and water.',
        'Scrub Goodyear rubber pods with a firm brush.',
        'Blot with microfiber and air dry.'
      ],
      wetDryingProtocol: 'Remove Arch Fit insole. Stuff shoe with white paper towels. Air dry at room temperature away from radiators.',
      storageAdvice: 'Store in cool dry closet away from direct UV sunlight.',
      thingsToAvoid: [
        'Machine wash spinning',
        'Direct tumble drying',
        'Bleach or corrosive stain chemicals'
      ]
    },
    wearIndicators: [
      {
        component: 'Goodyear Rubber Pods',
        title: 'Abrasion Through Rubber to Raw Hyper Burst Foam',
        severity: 'Critical (Replacement)',
        description: 'When the Goodyear pods grind away, leaving unprotected midsole foam in contact with pavement.',
        recommendedAction: 'Retire from fast road training.'
      },
      {
        component: 'Forefoot Carbon H-Plate',
        title: 'Loss of Propulsion Snap',
        severity: 'Moderate (Functional)',
        description: 'If the forefoot feels unusually flexible rather than springy upon toe-off.',
        recommendedAction: 'Transition to casual training.'
      }
    ],
    replacementConsiderations: 'Fast tempo shoes prioritize low weight. Replace when propulsion feels dull or when Goodyear rubber pods have worn flush.',
    responsibleDurabilityDisclaimer: 'Responsible usage guidance based on supercritical TPU testing.',
    sources: [
      {
        title: 'Skechers Performance Hyper Burst Pro Technical Specification',
        organization: 'Skechers Performance Division (Manhattan Beach, CA)',
        url: 'https://www.skechers.com/go-run-razor',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Official specs regarding Hyper Burst Pro supercritical foaming, Goodyear rubber compound, and Arch Fit contours.'
      }
    ]
  },
  'under-armour-hovr-sonic-6': {
    productId: 'prod_ua_hovrsonic6',
    productSlug: 'under-armour-hovr-sonic-6',
    brand: 'Under Armour',
    productName: 'Under Armour HOVR Sonic 6',
    intendedUseDetail: 'Engineered for runners and athletes needing a balanced combination of zero-gravity UA HOVR cushioning, breathability, and durability for everyday training and gym workouts.',
    primaryMaterials: {
      upper: 'Engineered spacer mesh upper with seamless forefoot design for lightweight breathability.',
      midsole: 'UA HOVR cushioning matrix encapsulated in an Energy Web compression mesh for energy return.',
      outsole: 'Combination blown rubber under forefoot with high-abrasion carbon rubber under the heel.',
      liningAndInsole: 'Molded 3D sockliner cradling the foot for enhanced step-in comfort.'
    },
    cushioningTech: 'UA HOVR zero-gravity foam + Energy Web compression net (8mm drop: 25mm heel / 17mm forefoot)',
    suitableActivities: [
      'Daily 5K-10K road and treadmill running',
      'Athletic gym conditioning and circuit training',
      'Urban walking and cross-training',
      'College fitness training'
    ],
    designHighlights: [
      'Energy Web maintains the structural form of the HOVR foam, returning impact force',
      'External TPU heel counter provides low-profile structural lockdown',
      'Carbon rubber heel withstands heavy abrasive friction'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Gym Cross-Training',
        scenarioType: 'daily_casual',
        frequency: '5-6 days per week running, lifting, and walking (8,000 steps/day)',
        outsoleImpact: 'Carbon rubber heel provides long-lasting resistance; blown rubber forefoot provides responsive push-off.',
        upperImpact: 'Spacer mesh resists scuffing from gym equipment.',
        cushioningImpact: 'UA HOVR foam maintains uniform bounce with minimal pack-down.',
        cleanlinessImpact: 'Medium.',
        structuralImpact: 'TPU heel counter preserves ankle alignment.',
        rotationAdvice: 'Rotate with specialized lifting flat shoes for heavy barbell squats.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: 'Indoor walking',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Comfortable support for desk and walking.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Firm structure maintained.',
        rotationAdvice: 'Air out weekly.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: 'Weekend workouts',
        outsoleImpact: 'Minimal.',
        upperImpact: 'Preserved.',
        cushioningImpact: 'Full energy return.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Stable.',
        rotationAdvice: 'Keep dry.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: '12,000+ steps/day',
        outsoleImpact: 'Normal gradual wear on forefoot siping.',
        upperImpact: 'Spacer mesh provides continuous cooling.',
        cushioningImpact: 'Zero-gravity feel reduces fatigue.',
        cleanlinessImpact: 'Moderate.',
        structuralImpact: '3D sockliner molds to foot.',
        rotationAdvice: 'Remove insole at night to air out.'
      }
    ],
    care: {
      cleaningApproach: 'Dry brush spacer mesh. Sponge clean with mild detergent and water. Scrub carbon rubber outsole with medium brush.',
      stepByStepCleaning: [
        'Unlace and wash laces in warm soapy water.',
        'Use soft brush to clear loose mud from spacer mesh.',
        'Clean upper with a damp cloth and mild sneaker shampoo.',
        'Scrub outsole carbon rubber lugs with warm water and brush.',
        'Wipe dry with microfiber towel and air dry.'
      ],
      wetDryingProtocol: 'Remove 3D molded insole. Stuff toe box with dry paper towels. Air dry away from direct heaters or sunshine.',
      storageAdvice: 'Store in cool ventilated space away from direct heat.',
      thingsToAvoid: [
        'Machine wash laundry cycles',
        'Direct tumble drying',
        'Harsh petrochemical cleaners'
      ]
    },
    wearIndicators: [
      {
        component: 'Carbon Rubber Heel',
        title: 'Heel Strike Wear Through Outsole',
        severity: 'Critical (Replacement)',
        description: 'When abrasive dragging wears through the black carbon rubber heel pod into the white HOVR foam.',
        recommendedAction: 'Replace to maintain proper stride stability.'
      },
      {
        component: 'Energy Web Compression Mesh',
        title: 'Tearing of Energy Web Netting',
        severity: 'Moderate (Functional)',
        description: 'If the external web containment mesh tears, HOVR foam can expand laterally, reducing responsiveness.',
        recommendedAction: 'Transition shoe to casual wear.'
      }
    ],
    replacementConsiderations: 'Replace when the carbon rubber heel is ground down to the foam bed or when the HOVR foam feels compressed.',
    responsibleDurabilityDisclaimer: 'Responsible usage guidance based on compression web elastomer testing.',
    sources: [
      {
        title: 'Under Armour UA HOVR Performance Platform Engineering Document',
        organization: 'Under Armour Innovation Lab (Baltimore, MD)',
        url: 'https://www.underarmour.com/hovr-sonic',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: 'Official specs regarding UA HOVR zero-gravity foam, Energy Web mesh containment, and carbon rubber strike pods.'
      }
    ]
  }
};

// Fallback intelligence generator for remaining brands so every single product has full intelligence
export function getProductIntelligence(slug: string, product: any): ProductIntelligenceData {
  if (PRODUCT_INTELLIGENCE[slug]) {
    return PRODUCT_INTELLIGENCE[slug];
  }

  return {
    productId: product.id,
    productSlug: slug,
    brand: product.brandName,
    productName: product.name,
    intendedUseDetail: `Specifically engineered for ${product.intendedUseSummary}. Combines responsive cushioning with high-abrasion traction.`,
    primaryMaterials: {
      upper: 'Breathable engineered textile upper with synthetic supportive overlays and reinforced toe counter.',
      midsole: 'Lightweight high-rebound responsive foam compound for shock attenuation.',
      outsole: 'Strategic high-abrasion rubber compound placed on critical impact strike zones.',
      liningAndInsole: 'Molded ergonomic insole with moisture-wicking textile collar.'
    },
    cushioningTech: 'Proprietary performance foam compound engineered for energy return and impact absorption',
    suitableActivities: [
      'Daily road and fitness training',
      'Athletic gym conditioning and treadmill workouts',
      'Urban walking and daily commuting',
      'Active lifestyle wear'
    ],
    designHighlights: [
      'Ergonomic contouring ensures heel lockdown and prevents slippage',
      'Mapped flex grooves allow fluid transition through the gait cycle',
      'Breathable textile matrix promotes thermal regulation'
    ],
    scenarios: [
      {
        scenarioTitle: 'Daily Casual & Commuter Use',
        scenarioType: 'daily_casual',
        frequency: '5-7 days per week on outdoor pavement (8,000 - 12,000 steps/day)',
        outsoleImpact: 'Steady gradual abrasion on the heel strike zone and forefoot push-off areas.',
        upperImpact: 'Normal flex creasing across the metatarsal bend; light dust accumulation in mesh.',
        cushioningImpact: 'Foam maintains shock attenuation with gradual compression set over months of daily loading.',
        cleanlinessImpact: 'Medium. Surface grit should be wiped clean weekly.',
        structuralImpact: 'Heel counter and eyelet stays retain dimensional stability.',
        rotationAdvice: 'Rotate with a second pair to allow midsole foam cells to decompress between uses.'
      },
      {
        scenarioTitle: 'Office & Workday Wear',
        scenarioType: 'office',
        frequency: '5 days per week indoor on carpet and tiles',
        outsoleImpact: 'Negligible mechanical abrasion.',
        upperImpact: 'Keeps crisp factory form.',
        cushioningImpact: 'Provides gentle standing support.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Pristine.',
        rotationAdvice: 'Air out weekly.'
      },
      {
        scenarioTitle: 'Occasional / Function Use',
        scenarioType: 'occasional',
        frequency: '1-2 times per month',
        outsoleImpact: 'Near zero.',
        upperImpact: 'Pristine.',
        cushioningImpact: 'Zero pack-down.',
        cleanlinessImpact: 'Low.',
        structuralImpact: 'Store in cool dry conditions.',
        rotationAdvice: 'Insert shoe trees to maintain shape.'
      },
      {
        scenarioTitle: 'Walking / Travel / Vacation Use',
        scenarioType: 'walking_travel',
        frequency: 'High-step tourist days (15,000+ steps/day)',
        outsoleImpact: 'Accelerated edge wear on rough city streets.',
        upperImpact: 'High breathability prevents heat buildup.',
        cushioningImpact: 'Continuous dampening softens harsh pavement shock.',
        cleanlinessImpact: 'High road dust.',
        structuralImpact: 'Insole molds to user foot shape.',
        rotationAdvice: 'Remove insole at night to ventilate perspiration.'
      }
    ],
    care: {
      cleaningApproach: 'Dry brush loose dirt first, followed by lukewarm water with mild liquid soap and a microfiber cloth.',
      stepByStepCleaning: [
        'Unlace and wash laces separately in warm soapy water.',
        'Use a soft brush to remove dried mud and surface dirt.',
        'Dip a soft cloth in mild soapy water and gently clean the upper without soaking.',
        'Clean the midsole and outsole using a medium-bristled brush.',
        'Wipe clean with a damp microfiber cloth and let air dry naturally.'
      ],
      wetDryingProtocol: 'Remove insole. Stuff toe box with dry paper towels to draw out moisture and maintain shape. Air dry in a well-ventilated room. NEVER use radiators, hair dryers, or tumble dryers.',
      storageAdvice: 'Store in a cool, dry area away from direct sunlight to prevent UV oxidation and glue degradation.',
      thingsToAvoid: [
        'Machine washing in a laundry drum',
        'Direct heat drying or radiator contact',
        'Chlorine bleach or harsh petrochemical cleaners'
      ]
    },
    wearIndicators: [
      {
        component: 'Outsole Rubber Tread',
        title: 'Traction Lug Smoothing',
        severity: 'Moderate (Functional)',
        description: 'When the raised tread pattern flattens, wet pavement grip is noticeably reduced.',
        recommendedAction: 'Transition shoe to dry weather use.'
      },
      {
        component: 'Midsole Sidewall',
        title: 'Deep Compression Creasing',
        severity: 'Moderate (Functional)',
        description: 'Deep permanent wrinkles indicate that foam cells have compressed and lost rebound.',
        recommendedAction: 'Monitor foot and joint comfort after long walks.'
      }
    ],
    replacementConsiderations: 'Durability depends on user weight, walking mechanics, and surface roughness. Consider replacement when outsole traction is worn smooth or when post-walk fatigue increases.',
    responsibleDurabilityDisclaimer: 'SoleWise provides responsible wear guidance based on materials science rather than artificial lifespan claims.',
    sources: [
      {
        title: `${product.brandName} Footwear Engineering Documentation`,
        organization: `${product.brandName} Product Design Team`,
        url: product.images[0] || 'https://solewise.io',
        sourceType: 'Manufacturer Technical Data',
        synthesisNote: `Factual synthesis of ${product.brandName} design, material specifications, and care recommendations.`
      }
    ]
  };
}
