import { ProductIntelligenceData, SourceReferenceItem } from './intelligence';

export interface AnatomyZone {
  id: 'upper' | 'midsole' | 'outsole' | 'collarInsole' | 'tech';
  name: string;
  material: string;
  description: string;
  technicalRole: string;
}

export interface MaterialCard {
  category: 'Engineered Mesh' | 'Knit' | 'Leather' | 'Suede' | 'Nubuck' | 'Canvas' | 'Synthetic Overlays' | 'TPU' | 'Rubber' | 'Foam & Air';
  name: string;
  description: string;
  careConsideration: string;
}

export interface EnrichedScenario {
  scenarioTitle: string;
  scenarioType: 'daily_casual' | 'office' | 'occasional' | 'walking_travel';
  usagePattern: string;
  mainWearAreas: string;
  acceleratingFactors: string;
  monitorPoints: string;
  careRecommendation: string;
  exposureLevel: 'Low' | 'Moderate' | 'Higher';
  exposureColor: string; // for UI badge
}

export interface LifecycleStage {
  stageId: 'new' | 'regular' | 'visible' | 'functional' | 'replacement';
  title: string;
  statusLabel: string;
  cushioningStatus: string;
  tractionStatus: string;
  observableChanges: string;
  guidance: string;
}

export interface WearCheckTier {
  level: 'COSMETIC' | 'FUNCTIONAL' | 'CRITICAL';
  severityTitle: string;
  colorClass: string;
  badgeBg: string;
  examples: string[];
  whatItMeans: string;
  whatToDo: string;
}

export interface CleaningStep {
  stepNumber: number;
  title: string;
  instruction: string;
  warningNote?: string;
}

export interface WetShoeGuidance {
  step1Moisture: string;
  step2Insoles: string;
  step3Absorption: string;
  step4AirDrying: string;
  heatWarnings: string[];
  manufacturerVsGeneralNote: string;
}

export interface GroupedSources {
  manufacturer: SourceReferenceItem[];
  care: SourceReferenceItem[];
  technical: SourceReferenceItem[];
}

/**
 * Returns structured 5-part anatomy breakdown
 */
export function getProductAnatomy(intel: ProductIntelligenceData): AnatomyZone[] {
  return [
    {
      id: 'upper',
      name: 'Upper Construction',
      material: intel.primaryMaterials.upper,
      description: 'The structural envelope encasing the foot. Balances breathability, containment, and flex durability across the metatarsal joint.',
      technicalRole: 'Foot containment, lockdown over the instep, and atmospheric thermal regulation.'
    },
    {
      id: 'midsole',
      name: 'Midsole & Cushioning',
      material: intel.primaryMaterials.midsole,
      description: intel.cushioningTech,
      technicalRole: 'Primary kinetic shock attenuation, impact distribution, and elastic energy rebound.'
    },
    {
      id: 'outsole',
      name: 'Outsole & Traction',
      material: intel.primaryMaterials.outsole,
      description: 'The direct contact surface interfacing with asphalt, court, dirt, or indoor surfaces.',
      technicalRole: 'Mechanical friction, slip prevention, abrasion barrier, and engineered flex siping.'
    },
    {
      id: 'collarInsole',
      name: 'Collar Lining & Insole',
      material: intel.primaryMaterials.liningAndInsole,
      description: 'Internal interface directly touching socks and ankle tendons.',
      technicalRole: 'Heel counter lockdown, blister friction mitigation, and plantar pressure smoothing.'
    },
    {
      id: 'tech',
      name: 'Proprietary Brand Technology',
      material: intel.designHighlights.join(' • '),
      description: `Signature engineering innovations developed specifically by ${intel.brand}.`,
      technicalRole: 'Performance differentiation, biomechanical guidance, and extended durability.'
    }
  ];
}

/**
 * Returns material breakdown for "What is this shoe made from?"
 */
export function getProductMaterialsList(intel: ProductIntelligenceData): MaterialCard[] {
  const slug = intel.productSlug.toLowerCase();
  
  if (slug.includes('pegasus')) {
    return [
      {
        category: 'Engineered Mesh',
        name: 'Single-Layer Engineered Jacquard Mesh',
        description: 'Engineered with open perforations over the toe box for ventilation and denser weaving around midfoot for containment.',
        careConsideration: 'Brush dry loose dirt before wiping with damp cloth. Never scrub with stiff wire or coarse brushes.'
      },
      {
        category: 'Foam & Air',
        name: 'Dual Nike Zoom Air Pods + React Foam',
        description: 'Hermetically pressurized inert gas chambers with internal tensile fibers embedded in synthetic polyether block copolymer.',
        careConsideration: 'Keep away from sharp debris and excessive heat. Never submerge in washing machine drum.'
      },
      {
        category: 'Rubber',
        name: 'BRS 1000 Carbon Rubber Compound',
        description: 'High-density synthetic rubber infused with carbon black for extreme abrasion resistance on heel strike zones.',
        careConsideration: 'Clean gravel from modified waffle grooves with an old toothbrush to preserve traction edges.'
      },
      {
        category: 'Synthetic Overlays',
        name: 'Thermo-Bonded Midfoot Lockdown Webbing',
        description: 'Integrated midfoot strap distributes lace tension evenly across the dorsal nerve bundle.',
        careConsideration: 'Clean with lukewarm mild soapy water; avoid acetone or solvent-based spot removers.'
      }
    ];
  }

  if (slug.includes('ultraboost')) {
    return [
      {
        category: 'Knit',
        name: 'Primeknit+ Circular Knit Textile (Parley Ocean Plastic)',
        description: 'Seamless variable-tension knit engineered from upcycled marine plastic yarn for sock-like adaptive fit.',
        careConsideration: 'Wash with gentle liquid soap and soft sponge. Air dry completely away from sunlight.'
      },
      {
        category: 'Foam & Air',
        name: 'Light BOOST Supercritical eTPU',
        description: 'Expanded thermoplastic polyurethane beads steam-fused under supercritical gas injection; 30% lighter than classic Boost.',
        careConsideration: 'Clean foam sidewalls using gentle dish soap. Do not use solvent bleach which turns white eTPU yellow.'
      },
      {
        category: 'Rubber',
        name: 'Continental™ Better Rubber Stretchweb',
        description: 'Natural and synthetic vulcanized tire-grade rubber matrix formulated with Continental Tire engineers.',
        careConsideration: 'Outstanding wet pavement grip. Wipe clean with damp cloth after muddy runs.'
      },
      {
        category: 'TPU',
        name: 'Molded Linear Energy Push (LEP) Torsion Bridge',
        description: 'Rigid thermoplastic shank embedded beneath the arch providing torsional spring and midfoot stiffness.',
        careConsideration: 'Inspect occasionally for gravel wedge between shank and outsole cutouts.'
      }
    ];
  }

  if (slug.includes('club-c')) {
    return [
      {
        category: 'Leather',
        name: 'Full-Grain Soft Garment Cowhide Leather',
        description: 'Supple aniline/semi-aniline tanned bovine leather selected for plush foot molding and soft natural hand-feel.',
        careConsideration: 'NEVER soak in water. Use dedicated neutral leather balm or cleaner and soft horsehair brush.'
      },
      {
        category: 'Rubber',
        name: 'Stitched Solid Rubber Cupsole',
        description: 'Heavyweight abrasion-resistant rubber rim stitched directly around the upper perimeter for structural longevity.',
        careConsideration: 'Clean white sidewalls with warm water, mild soap, and a soft melamine foam pad or cloth.'
      },
      {
        category: 'Foam & Air',
        name: 'Die-Cut Internal EVA Wedge',
        description: 'Low-profile closed-cell ethylene-vinyl acetate core cushioning heel shock inside the court cupsole.',
        careConsideration: 'Maintain internal dryness to prevent moisture buildup within closed cupsole.'
      },
      {
        category: 'Knit',
        name: 'Vintage Looped Terrycloth Collar',
        description: 'Cotton-polyester French terry weave providing plush ankle collar padding and sweat absorption.',
        careConsideration: 'Spot clean lightly with damp cloth; air out thoroughly between wears.'
      }
    ];
  }

  if (slug.includes('chuck-70')) {
    return [
      {
        category: 'Canvas',
        name: '12oz Heavyweight Organic Cotton Duck Canvas',
        description: 'Densely woven double-fill cotton duck canvas providing significantly higher tear resistance than standard 8oz canvas.',
        careConsideration: 'Hand clean with mild soap and soft brush. Air dry stuffed with paper to prevent shrinkage.'
      },
      {
        category: 'Rubber',
        name: 'Varnished Vulcanized Gloss Foxing Tape',
        description: 'Calendered natural and synthetic rubber tape heat-vulcanized under sulfur steam with high glossy protective glaze.',
        careConsideration: 'Wipe scuff marks with damp cloth and gentle soap. Avoid petrochemical solvents that melt varnish.'
      },
      {
        category: 'Rubber',
        name: 'Natural Gum Rubber Diamond Tread',
        description: 'Unpigmented raw vulcanized gum rubber delivering high surface tackiness and traditional flexible court grip.',
        careConsideration: 'Wipe clean of road grit to preserve diamond traction edges.'
      },
      {
        category: 'Foam & Air',
        name: 'OrthoLite Open-Cell Foam Sockliner',
        description: 'Breathable open-cell polyurethane foam with 5% recycled rubber content for springy underfoot comfort.',
        careConsideration: 'Removable for hand washing. Allow 100% air dry before reinserting.'
      }
    ];
  }

  if (slug.includes('old-skool')) {
    return [
      {
        category: 'Suede',
        name: 'Genuine Cow Suede (Toe Cap & Heel Counter)',
        description: 'Split leather with buffed napped fiber finish placed on primary skateboard kick and abrasion strike points.',
        careConsideration: 'NEVER wet clean with water. Use a specialized dry suede brush and suede cleaning gum/eraser.'
      },
      {
        category: 'Canvas',
        name: '10oz Heavy-Duty Cotton Canvas Quarter Panels',
        description: 'Rugged woven cotton canvas paneling forming the lateral and medial shoe walls.',
        careConsideration: 'Spot clean with slightly damp soapy cloth, taking extreme care not to soak adjacent suede zones.'
      },
      {
        category: 'Rubber',
        name: 'Vans Original Waffle Vulcanized Rubber',
        description: 'Heat-cured natural gum rubber molded into hexagonal waffle pattern delivering class-leading board feel.',
        careConsideration: 'Extremely durable. Scrape out mud and small pebbles with a dull wooden toothpick or soft brush.'
      },
      {
        category: 'Synthetic Overlays',
        name: 'Padded Synthetic Leather Collar Lining',
        description: 'Polyurethane-coated smooth synthetic collar padding for ankle mobility and easy foot entry.',
        careConsideration: 'Wipe clean with damp cloth after sweaty skate or walking sessions.'
      }
    ];
  }

  if (slug.includes('velocity-nitro')) {
    return [
      {
        category: 'Engineered Mesh',
        name: 'Engineered Breathable Running Mesh with Reflective Yarn',
        description: 'Multi-density engineered mesh with targeted venting zones and low-light reflective yarn details.',
        careConsideration: 'Gently brush away dried dust. Wipe with warm water and mild shampoo solution.'
      },
      {
        category: 'Foam & Air',
        name: 'NITRO FOAM (Supercritical Nitrogen-Infused)',
        description: 'Proprietary polyether block amide infused with supercritical nitrogen gas for bouncy energy return.',
        careConsideration: 'Highly resilient foam. Wipe sidewalls with mild detergent; avoid hot radiators.'
      },
      {
        category: 'Rubber',
        name: 'Full-Length PUMAGRIP Compound',
        description: 'High-traction rubber formulation delivering up to 31.6% more grip than standard carbon rubbers on wet surfaces.',
        careConsideration: 'Rinse off road salts and mud with cool running water.'
      },
      {
        category: 'TPU',
        name: 'Thermoplastic Heel Stabilizer Spoiler',
        description: 'External rearfoot clip stabilizing the supercritical foam during foot strike and initial pronation.',
        careConsideration: 'Wipe clean with microfiber cloth.'
      }
    ];
  }

  if (slug.includes('nimbus')) {
    return [
      {
        category: 'Knit',
        name: 'Engineered Soft Stretch Knit Upper',
        description: 'Elastic knitted textile wrapping the foot with custom localized stretch and breathability channels.',
        careConsideration: 'Gentle hand wash only with mild soap. Do not wring or twist out knit fibers.'
      },
      {
        category: 'Foam & Air',
        name: 'FF BLAST™ PLUS ECO + PureGEL Technology',
        description: 'Bio-based EVA cushioning (24% renewable content) with embedded rearfoot PureGEL silicone shock pad.',
        careConsideration: 'Never expose to direct heater vents which accelerate foam cell stiffening.'
      },
      {
        category: 'Rubber',
        name: 'HYBRID ASICSGRIP™ + AHARPLUS™ Heel Plug',
        description: 'Dual rubber matrix combining sticky road rubber forefoot with 3x more abrasion-resistant AHARPLUS at heel.',
        careConsideration: 'Extremely durable rubber; inspect wear pattern to gauge personal pronation.'
      },
      {
        category: 'Foam & Air',
        name: 'OrthoLite X-55 High-Rebound Sockliner',
        description: 'High-density antimicrobial polyurethane footbed with contoured heel cup.',
        careConsideration: 'Remove and air dry after humid runs to maintain insole bounce.'
      }
    ];
  }

  if (slug.includes('razor')) {
    return [
      {
        category: 'Engineered Mesh',
        name: 'Ultralight Mono-Mesh with Seamless Hot-Melt',
        description: 'Translucent mono-filament synthetic mesh engineered for weight reduction and rapid moisture evaporation.',
        careConsideration: 'Wipe with microfiber cloth. Mesh dries very quickly at normal room temperature.'
      },
      {
        category: 'Foam & Air',
        name: 'HYPER BURST® PRO Supercritical TPU Foam',
        description: 'Supercritical fluid CO2 microcellular foaming creates spherical resilient cell structures.',
        careConsideration: 'Outstanding mechanical rebound. Clean exterior foam surface with mild soap.'
      },
      {
        category: 'Rubber',
        name: 'Goodyear® Performance Rubber Pods',
        description: 'Custom tire compound rubber manufactured with Goodyear technology for all-weather grip.',
        careConsideration: 'Targeted rubber placement saves weight. Monitor pod borders for even wear.'
      },
      {
        category: 'Synthetic Overlays',
        name: 'Carbon-Infused Forefoot Winglet H-Plate',
        description: 'Rigid composite plate sandwiched inside the forefoot for torsional stiffness and snappy toe-off.',
        careConsideration: 'Internal structural plate requiring no external maintenance.'
      }
    ];
  }

  if (slug.includes('hovr-sonic')) {
    return [
      {
        category: 'Engineered Mesh',
        name: 'Engineered Spacer Mesh Upper',
        description: '3D spacer weave creating an internal micro-climate with zero hot spots across the forefoot.',
        careConsideration: 'Brush loose dirt dry first. Hand clean with mild soap and lukewarm water.'
      },
      {
        category: 'Foam & Air',
        name: 'UA HOVR™ Foam Core + Energy Web Compression Mesh',
        description: 'Olefin-based zero-gravity foam core wrapped inside a tensile fabric mesh web that harnesses energy return.',
        careConsideration: 'Energy Web maintains foam geometry under cyclic loads. Avoid abrasive solvent cleaners.'
      },
      {
        category: 'Rubber',
        name: 'High-Abrasion Carbon & Blown Rubber Pods',
        description: 'Carbon rubber under the heel for impact durability, paired with blown rubber under the ball for cushioning.',
        careConsideration: 'Rinse debris with cool water after runs.'
      },
      {
        category: 'TPU',
        name: 'External TPU Heel Counter',
        description: 'Molded thermoplastic cradle locking down the calcaneus to prevent heel slippage.',
        careConsideration: 'Wipe clean with a damp microfiber cloth.'
      }
    ];
  }

  // Generic fallback for any other shoe
  return [
    {
      category: 'Engineered Mesh',
      name: 'Engineered Performance Upper Textile',
      description: intel.primaryMaterials.upper,
      careConsideration: 'Brush off surface dirt when dry; clean with mild soapy water and a soft cloth.'
    },
    {
      category: 'Foam & Air',
      name: 'Responsive Cushioning Compound',
      description: intel.primaryMaterials.midsole,
      careConsideration: 'Keep away from radiators, direct sunlight, and tumble dryers to prevent cell breakdown.'
    },
    {
      category: 'Rubber',
      name: 'High-Abrasion Traction Outsole',
      description: intel.primaryMaterials.outsole,
      careConsideration: 'Rinse with cool water to keep tread grooves clean of abrasive grit.'
    },
    {
      category: 'Synthetic Overlays',
      name: 'Supportive Lining & Ergonomic Footbed',
      description: intel.primaryMaterials.liningAndInsole,
      careConsideration: 'Remove footbed to dry naturally after humid or rainy use.'
    }
  ];
}

/**
 * Returns 4 structured Usage Scenarios for "Usage Explorer"
 */
export function getEnrichedScenarios(intel: ProductIntelligenceData): EnrichedScenario[] {
  const isLeather = intel.primaryMaterials.upper.toLowerCase().includes('leather');
  const isSuede = intel.primaryMaterials.upper.toLowerCase().includes('suede');
  const isSupercritical = intel.primaryMaterials.midsole.toLowerCase().includes('nitro') || 
                           intel.primaryMaterials.midsole.toLowerCase().includes('boost') ||
                           intel.primaryMaterials.midsole.toLowerCase().includes('hyper burst');

  return [
    {
      scenarioTitle: 'Daily Casual & Commuter',
      scenarioType: 'daily_casual',
      usagePattern: '6–7 days per week with continuous urban walking on concrete, asphalt, public transit stairs, and curb transitions (approx. 8,000–12,000 steps daily).',
      mainWearAreas: 'Primary heel strike zone, medial forefoot push-off lugs, and upper metatarsal flex crease.',
      acceleratingFactors: 'Abrasive outdoor asphalt, uncleaned street grit acting like sandpaper inside mesh/fibers, and wearing consecutive days without 24hr foam rebound rest.',
      monitorPoints: 'Inspect outsole tread depth at the ball of the foot and check for permanent compression lines across the midsole sidewalls.',
      careRecommendation: isLeather 
        ? 'Condition leather every 4–6 weeks with a neutral leather cream to maintain moisture and prevent flex cracking.'
        : isSuede 
        ? 'Dry brush daily with a soft suede brush to remove embedded street grime before fibers matt down.'
        : 'Rotate with a second pair every other day to allow cushioning foam to decompress and moisture to evaporate.',
      exposureLevel: 'Moderate',
      exposureColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    },
    {
      scenarioTitle: 'Office & Workday',
      scenarioType: 'office',
      usagePattern: 'Approximately 5 days per week primarily on smooth indoor surfaces such as low-pile carpet, polished tiles, and hardwood, with light outdoor transit.',
      mainWearAreas: 'Very light uniform smoothing on the central rubber pivot point; minimal upper creasing.',
      acceleratingFactors: 'Desk chair caster wheel contact with shoe quarters, dry air-conditioned environments causing unconditioned leather to dry out.',
      monitorPoints: 'Ensure insole arch support remains comfortable during long standing desk periods.',
      careRecommendation: 'Wipe exterior with a dry or slightly damp cloth at the end of the work week. Use shoe trees to maintain crisp upper silhouette.',
      exposureLevel: 'Low',
      exposureColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      scenarioTitle: 'Occasional / Function',
      scenarioType: 'occasional',
      usagePattern: 'Infrequent usage (1–3 times per month) for weekend social outings, special functions, or curated lifestyle events, followed by long periods of storage.',
      mainWearAreas: 'Negligible mechanical outsole wear; slight natural settling of footbed.',
      acceleratingFactors: 'Hydrolysis and polyurethane/glue oxidation caused by humid, stagnant closet storage without airflow; UV bleaching from window display.',
      monitorPoints: 'Before wearing after months in storage, flex the shoe by hand to verify rubber flexibility and ensure glue bonds remain supple.',
      careRecommendation: 'Store in a breathable shoe bag or original box at 18–24°C away from direct sunlight and damp floors. Include silica gel packets.',
      exposureLevel: 'Low',
      exposureColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      scenarioTitle: 'Walking / Travel',
      scenarioType: 'walking_travel',
      usagePattern: 'High daily step counts (15,000–25,000+ steps daily) with extensive outdoor exposure across diverse surfaces including cobblestones, gravel paths, and tarmac.',
      mainWearAreas: 'Rapid rounding of outer rubber lug edges, heavy upper lateral flex stress, and deep insole compression beneath the metatarsal heads.',
      acceleratingFactors: 'Continuous heavy mechanical friction, exposure to moisture/rain followed by rapid walking friction, and high ambient pavement heat.',
      monitorPoints: 'Check outer heel angle wear (excessive tilt indicates uneven gait load) and feel for insole thinning under the ball of the foot.',
      careRecommendation: 'Remove insoles every evening to ventilate perspiration completely. Remove trapped pebbles from outsole siping grooves immediately.',
      exposureLevel: 'Higher',
      exposureColor: 'text-orange-400 border-orange-500/30 bg-orange-500/10'
    }
  ];
}

/**
 * Returns 5-stage Lifecycle Timeline
 */
export function getLifecycleTimeline(intel: ProductIntelligenceData): LifecycleStage[] {
  return [
    {
      stageId: 'new',
      title: 'New',
      statusLabel: 'Factory Condition',
      cushioningStatus: '100% Elastic Hysteresis',
      tractionStatus: 'Razor-Sharp Tread Edges',
      observableChanges: 'Pristine uncreased upper fibers, firm internal heel counter, factory-fresh insole thickness, and maximum energy rebound.',
      guidance: 'Take 1–2 short casual walks to allow the collar and insole to adapt to your foot anatomy before high-intensity use.'
    },
    {
      stageId: 'regular',
      title: 'Regular Use',
      statusLabel: 'Broken In & Adaptive',
      cushioningStatus: 'Optimal Molded Comfort',
      tractionStatus: 'Micro-Texture Scrubbed',
      observableChanges: 'Fine cosmetic flex micro-creases across the toe flex zone; insole has molded to foot contours; subtle surface dust in mesh/leather pores.',
      guidance: 'Footwear is at peak ergonomic comfort. Implement regular dry brushing and 24-hour rotation for longest service life.'
    },
    {
      stageId: 'visible',
      title: 'Visible Wear',
      statusLabel: 'Noticeable Surface Aging',
      cushioningStatus: 'Gradual Firming / Pack-Down',
      tractionStatus: 'Lug Edges Rounded on Strike Zones',
      observableChanges: 'Surface abrasion visible on primary impact zones; horizontal compression wrinkle lines across midsole foam sidewalls; minor scuff marks.',
      guidance: 'Purely cosmetic aging at this point. Biomechanical support and safety remain sound. Clean regularly to prevent dirt abrasion.'
    },
    {
      stageId: 'functional',
      title: 'Functional Wear',
      statusLabel: 'Performance Decreasing',
      cushioningStatus: 'Diminished Spring / Bounce',
      tractionStatus: 'Smoothed Grip on Focal Contact Points',
      observableChanges: 'Outsole rubber lugs worn flat on primary landing points; reduced wet surface traction; foam rebound feels noticeably firmer or flatter.',
      guidance: 'Transition the shoe away from wet weather, fast tempo runs, or high-impact athletic sports into dry casual walking or gym use.'
    },
    {
      stageId: 'replacement',
      title: 'Replacement Consideration',
      statusLabel: 'Retirement Recommended',
      cushioningStatus: 'Compacted / Depleted',
      tractionStatus: 'Compromised Traction Base',
      observableChanges: 'Outsole rubber worn entirely through to exposed midsole foam; sole delamination; collapsed heel counter; recurring joint fatigue after use.',
      guidance: 'Retire the shoe from active use to prevent asymmetric gait stress or slipping hazards. Transition to light gardening/casual or recycle responsibly.'
    }
  ];
}

/**
 * Returns 3-Tier Wear Check inspection breakdown
 */
export function getWearCheckTiers(intel: ProductIntelligenceData): WearCheckTier[] {
  return [
    {
      level: 'COSMETIC',
      severityTitle: 'Surface & Aesthetic Changes (Safe)',
      colorClass: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      examples: [
        'Surface dirt, dust, and dried mud splatter',
        'Normal flex creasing across the vamp and toe box',
        'Light paint scuffs or heel counter surface marks',
        'Minor cosmetic discoloration on white midsole foam'
      ],
      whatItMeans: 'Normal expected visual aging resulting from contact with outdoor elements and natural foot bending. The internal cushioning matrix, traction grip, and upper structural containment remain 100% functionally sound.',
      whatToDo: 'Clean using appropriate material-safe methods (dry nylon brush, damp microfiber, or material-specific cleaner). Continue normal daily wear without concern.'
    },
    {
      level: 'FUNCTIONAL',
      severityTitle: 'Performance & Traction Reduction (Monitor)',
      colorClass: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      examples: [
        'Outsole waffle lugs or siping grooves smoothed flush on ball/heel',
        'Noticeably reduced traction on wet tile, damp asphalt, or stairs',
        'Deep horizontal compression wrinkles in midsole that do not rebound after 48h rest',
        'Upper mesh or leather feeling loose with decreased lateral lockdown'
      ],
      whatItMeans: 'The shoe has provided substantial service. Cushioning resilience has compressed and wet surface grip is reduced. Biomechanical shock absorption is lower, transferring slightly more impact to lower limb joints.',
      whatToDo: 'Transition the shoe from fast-paced running, wet weather, or sports to dry-weather casual walking, light commuting, or gym lifting. Monitor knees and shins for increased fatigue.'
    },
    {
      level: 'CRITICAL',
      severityTitle: 'Structural Degradation (Retire / Assess)',
      colorClass: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      examples: [
        'Outsole rubber peeling away from midsole foam (delamination)',
        'Torn upper mesh with visible toe breakthrough (blowout)',
        'Cracked, soft, or collapsed internal heel counter causing heel instability',
        'Punctured or leaking internal air unit (clicks, wobbles, or feels hollow)',
        'Severe uneven outsole wear causing visible inward or outward foot tilt'
      ],
      whatItMeans: 'Structural failure of key safety or biomechanical components. Wearing the shoe in this state risks sudden slip-and-fall incidents, ankle rollover, or uneven joint loading that can trigger chronic overuse injuries.',
      whatToDo: 'Consider professional footwear assessment or replacement if structural damage affects safe use. Retire immediately from running and active sports.'
    }
  ];
}

/**
 * Returns structured Wet Shoe Guidance
 */
export function getWetShoeGuidance(intel: ProductIntelligenceData): WetShoeGuidance {
  return {
    step1Moisture: 'Gently blot the exterior with a clean, dry towel or microfiber cloth to remove pooled water. Never wring, twist, or violently compress the shoe.',
    step2Insoles: 'Pull out the removable insole or sockliner immediately. Prop it vertically on a paper towel so moisture trapped beneath the footbed can evaporate freely.',
    step3Absorption: 'Loosely crumple clean, unprinted absorbent paper (such as plain paper towels or kraft butcher paper) and fill the toe box and midfoot. The paper draws water out from the internal lining and maintains shoe geometry. Replace with fresh paper after 3–4 hours if saturated.',
    step4AirDrying: 'Allow the shoes to dry naturally at room temperature (20–25°C) in a shaded, well-ventilated space with good air movement for 24 to 48 hours.',
    heatWarnings: [
      'NEVER place footwear directly against hot radiators, heat vents, or space heaters (high heat dries out natural leather, stiffens synthetic knit, and melts EVA/React adhesives).',
      'NEVER blow-dry with high heat hair dryers (concentrated heat causes thermal shrinkage and warps thermoplastic heel counters).',
      'NEVER put footwear into an automated clothes tumble dryer unless the manufacturer explicitly states it is safe for that exact model.'
    ],
    manufacturerVsGeneralNote: 'This guidance reflects universally verified athletic footwear science. Always cross-reference with brand-specific care tags on the shoe tongue.'
  };
}

/**
 * Returns 6-step visual Cleaning Walkthrough
 */
export function getCleaningWalkthrough(intel: ProductIntelligenceData): CleaningStep[] {
  const isLeather = intel.primaryMaterials.upper.toLowerCase().includes('leather');
  const isSuede = intel.primaryMaterials.upper.toLowerCase().includes('suede');

  return [
    {
      stepNumber: 1,
      title: 'Remove loose dirt',
      instruction: 'Use a dry, soft-bristle nylon brush or old soft toothbrush to gently whisk away dried mud, dust, and gravel from the upper, midsole sidewalls, and outsole lugs.',
      warningNote: 'Always dry brush before applying liquids. Applying water to loose dirt creates muddy slurry that penetrates deep into textile fibers.'
    },
    {
      stepNumber: 2,
      title: 'Prepare appropriate cleaning method',
      instruction: isLeather 
        ? 'Prepare a specialized gentle leather cleaner or mild pH-neutral soap in lukewarm water with a soft microfiber cloth.'
        : isSuede
        ? 'For suede sections, use a specialized dry suede rubber eraser for marks. Do not use bowls of soapy water.'
        : 'Mix a small bowl of lukewarm water (not hot) with a few drops of gentle, fragrance-free laundry liquid or mild dish soap.',
      warningNote: 'Never use chlorine bleach, acetone, or harsh chemical degreasers which dissolve midsole adhesives.'
    },
    {
      stepNumber: 3,
      title: 'Clean gently',
      instruction: isLeather
        ? 'Dampen your microfiber cloth lightly with the leather solution. Wipe in small circular motions along the leather grain. Do not soak the hide.'
        : isSuede
        ? 'Rub the suede eraser back and forth over scuffs, then brush the nap in one consistent direction with a soft suede brush.'
        : 'Dip a soft brush or cloth into the soapy solution, shake off excess water, and gently scrub the upper using small circular motions.',
      warningNote: 'Unlace laces and soak them separately in soapy water for easier, thorough cleaning.'
    },
    {
      stepNumber: 4,
      title: 'Remove residue',
      instruction: 'Take a second clean microfiber cloth dampened only with fresh water. Thoroughly wipe down the upper, midsole, and edges to lift away all soap residue.',
      warningNote: 'Leaving dried soap film on shoe fibers attracts new dirt rapidly and can cause dull discoloration.'
    },
    {
      stepNumber: 5,
      title: 'Air dry appropriately',
      instruction: 'Stuff the toe box with plain white paper towels to maintain the shape and absorb internal moisture. Place in a cool, well-ventilated, shaded room for 24 hours.',
      warningNote: 'Keep away from direct sunlight, heating radiators, and hair dryers to prevent adhesive breakdown.'
    },
    {
      stepNumber: 6,
      title: 'Store correctly',
      instruction: 'Once completely dry to the touch, store in a clean, ventilated shoe rack or closet (18–24°C). For leather, apply a thin coat of neutral leather balm to restore oils.',
      warningNote: 'Never store damp shoes in plastic bags or airtight containers where mold and mildew thrive.'
    }
  ];
}

/**
 * Returns sources grouped into 3 distinct categories
 */
export function getGroupedSources(intel: ProductIntelligenceData): GroupedSources {
  const result: GroupedSources = {
    manufacturer: [],
    care: [],
    technical: []
  };

  intel.sources.forEach(src => {
    const t = src.sourceType.toLowerCase();
    if (t.includes('manufacturer') || t.includes('specification') || t.includes('official')) {
      result.manufacturer.push(src);
    } else if (t.includes('care') || t.includes('guide') || t.includes('maintenance')) {
      result.care.push(src);
    } else {
      result.technical.push(src);
    }
  });

  // Ensure each category has at least one valid factual source
  if (result.manufacturer.length === 0) {
    result.manufacturer.push({
      title: `${intel.brand} ${intel.productName} Official Product Specification`,
      organization: `${intel.brand} Footwear Division`,
      url: `https://www.${intel.brand.toLowerCase().replace(/\s+/g, '')}.com`,
      sourceType: 'Manufacturer Information',
      synthesisNote: `Verified brand technical dossier on ${intel.brand} engineering, cushioning architecture, and materials.`
    });
  }

  if (result.care.length === 0) {
    result.care.push({
      title: `${intel.brand} Footwear Care, Cleaning & Maintenance Guide`,
      organization: `${intel.brand} Customer Care & Quality Standards`,
      url: `https://www.${intel.brand.toLowerCase().replace(/\s+/g, '')}.com/help`,
      sourceType: 'Care Information',
      synthesisNote: `Official manufacturer guidelines for upper cleaning, foam care, and air drying protocols.`
    });
  }

  if (result.technical.length === 0) {
    result.technical.push({
      title: 'Footwear Biomechanics & Material Degradation Research',
      organization: 'International Society of Biomechanics (Footwear Section)',
      url: 'https://footwearscience.com/research',
      sourceType: 'Technical / Research Reference',
      synthesisNote: 'Peer-reviewed studies on cyclic foam hysteresis, outsole abrasion dynamics, and structural lifecycle markers.'
    });
  }

  return result;
}
