import { ProductItem } from '../data/products';
import { getProductIntelligence, ProductIntelligenceData } from '../data/intelligence';
import { 
  getProductAnatomy, 
  getProductMaterialsList, 
  getEnrichedScenarios, 
  getLifecycleTimeline, 
  getWearCheckTiers, 
  getWetShoeGuidance, 
  getCleaningWalkthrough, 
  getGroupedSources,
  AnatomyZone
} from '../data/intelligence-helpers';
import { formatINR } from '../utils/currency';

export function openProductIntelligenceModal(product: ProductItem, onAddToCart?: (product: ProductItem) => void) {
  const intel: ProductIntelligenceData = getProductIntelligence(product.slug, product);
  
  const anatomyZones = getProductAnatomy(intel);
  const materialsList = getProductMaterialsList(intel);
  const scenarios = getEnrichedScenarios(intel);
  const timelineStages = getLifecycleTimeline(intel);
  const wearTiers = getWearCheckTiers(intel);
  const wetGuidance = getWetShoeGuidance(intel);
  const cleaningSteps = getCleaningWalkthrough(intel);
  const groupedSources = getGroupedSources(intel);

  let activeTab: 'anatomy' | 'wear' | 'care' | 'check' | 'sources' = 'anatomy';
  let selectedAnatomyId: string = anatomyZones[0]?.id || 'upper';
  let selectedScenarioIndex: number = 0;
  let selectedTimelineStageIndex: number = 0;

  // Remove existing modal if any
  const existing = document.getElementById('intelligence-modal-overlay');
  if (existing) existing.remove();

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'intelligence-modal-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';
  modalOverlay.setAttribute('role', 'dialog');
  modalOverlay.setAttribute('aria-modal', 'true');
  modalOverlay.setAttribute('aria-labelledby', 'modal-product-title');

  function renderModal() {
    const selectedZone = anatomyZones.find(z => z.id === selectedAnatomyId) || anatomyZones[0];
    const activeScenario = scenarios[selectedScenarioIndex] || scenarios[0];
    const activeTimeline = timelineStages[selectedTimelineStageIndex] || timelineStages[0];

    modalOverlay.innerHTML = `
      <div class="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col focus:outline-none">
        
        <!-- Top Bar with Product Header -->
        <div class="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/90 shrink-0">
          <div class="flex items-start justify-between gap-4">
            
            <!-- Left: Product Identity & Thumbnail -->
            <div class="flex items-center gap-4 sm:gap-5 min-w-0">
              <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shrink-0 shadow-inner">
                <img 
                  src="${product.images[0]}" 
                  alt="${product.name}" 
                  class="w-full h-full object-cover object-center"
                />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                    SoleWise Intelligence Dossier
                  </span>
                  <span class="text-xs text-stone-400 font-mono">
                    ${product.brandName} · ${product.category}
                  </span>
                </div>

                <h2 id="modal-product-title" class="font-display font-bold text-lg sm:text-2xl text-white truncate" title="${product.name}">
                  ${product.name}
                </h2>

                <div class="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 text-xs">
                  <span class="font-display font-extrabold text-base sm:text-lg text-white">
                    ${formatINR(product.priceINR)}
                  </span>
                  <span class="text-stone-400 text-[11px] truncate max-w-xs sm:max-w-md">
                    Intended Use: <strong class="text-stone-300 font-medium">${product.intendedUseSummary}</strong>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: Close Button -->
            <button 
              id="close-intel-modal-btn" 
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-850 hover:bg-stone-750 text-stone-300 hover:text-white flex items-center justify-center transition shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Close Product Intelligence Modal"
              title="Close (Esc)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Product Intelligence Purpose Statement (Anti-Marketing Banner) -->
          <div class="mt-3.5 pt-3 border-t border-stone-850/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <p class="text-stone-300 italic flex items-center gap-1.5">
              <svg class="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>"Understand what this shoe is designed for, how its materials affect care, and how different usage patterns may influence wear."</span>
            </p>
            <div class="flex items-center gap-2 shrink-0 text-[10px] font-mono text-stone-400">
              <span>Verified Indian Retail Dossier</span>
              <span>·</span>
              <span class="text-emerald-400">GST Inclusive</span>
            </div>
          </div>
        </div>

        <!-- Five Intelligence Sections (Tabs Bar) -->
        <div class="flex items-center gap-1.5 px-4 sm:px-6 pt-3 border-b border-stone-800 bg-stone-900/95 overflow-x-auto scrollbar-none shrink-0" role="tablist">
          
          <button 
            data-tab="anatomy" 
            role="tab"
            aria-selected="${activeTab === 'anatomy'}"
            class="tab-btn pb-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'anatomy' 
                ? 'border-orange-500 text-orange-400 font-bold' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }"
          >
            <span>1. Anatomy & Tech</span>
          </button>

          <button 
            data-tab="wear" 
            role="tab"
            aria-selected="${activeTab === 'wear'}"
            class="tab-btn pb-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'wear' 
                ? 'border-orange-500 text-orange-400 font-bold' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }"
          >
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>2. How It May Wear</span>
          </button>

          <button 
            data-tab="care" 
            role="tab"
            aria-selected="${activeTab === 'care'}"
            class="tab-btn pb-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'care' 
                ? 'border-orange-500 text-orange-400 font-bold' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>3. Care & Cleaning</span>
          </button>

          <button 
            data-tab="check" 
            role="tab"
            aria-selected="${activeTab === 'check'}"
            class="tab-btn pb-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'check' 
                ? 'border-orange-500 text-orange-400 font-bold' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }"
          >
            <span class="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>4. Wear Check</span>
          </button>

          <button 
            data-tab="sources" 
            role="tab"
            aria-selected="${activeTab === 'sources'}"
            class="tab-btn pb-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sources' 
                ? 'border-orange-500 text-orange-400 font-bold' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }"
          >
            <span>5. Sources & Verification (${groupedSources.manufacturer.length + groupedSources.care.length + groupedSources.technical.length})</span>
          </button>

        </div>

        <!-- Scrollable Tab Content Body -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-stone-200 text-sm">
          
          <!-- TAB 1: ANATOMY & TECHNOLOGY -->
          ${activeTab === 'anatomy' ? `
            <div class="space-y-6">
              
              <!-- Provenance Header -->
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800 text-xs">
                <div>
                  <h3 class="font-display font-bold text-lg text-white">Anatomy & Engineering Construction</h3>
                  <p class="text-xs text-stone-400">Explore each physical component layer and brand technology.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-semibold text-[11px] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Manufacturer Provided
                </span>
              </div>

              <!-- Interactive Shoe Anatomy Selector -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <!-- Zone Navigation Tabs -->
                <div class="lg:col-span-4 flex flex-col gap-2">
                  <span class="text-[11px] font-mono uppercase text-stone-400 font-bold">Select Anatomy Zone:</span>
                  ${anatomyZones.map(zone => `
                    <button 
                      data-anatomy-id="${zone.id}"
                      class="text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                        selectedAnatomyId === zone.id 
                          ? 'bg-orange-500/15 border-orange-500 text-white shadow-md' 
                          : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-850/50'
                      }"
                    >
                      <div>
                        <div class="font-display font-bold text-xs ${selectedAnatomyId === zone.id ? 'text-orange-400' : 'text-stone-200'}">
                          ${zone.name}
                        </div>
                        <div class="text-[11px] text-stone-400 truncate max-w-[200px]">
                          ${zone.material.split('.')[0]}
                        </div>
                      </div>
                      <svg class="w-4 h-4 ${selectedAnatomyId === zone.id ? 'text-orange-400 translate-x-1' : 'text-stone-500'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  `).join('')}
                </div>

                <!-- Zone Deep Dive Display Card -->
                <div class="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-stone-850">
                    <div>
                      <span class="text-[10px] font-mono uppercase text-orange-400 font-bold tracking-wider">Engineered Component</span>
                      <h4 class="font-display font-bold text-xl text-white">${selectedZone.name}</h4>
                    </div>
                    <span class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300">
                      ${intel.brand} Specification
                    </span>
                  </div>

                  <div>
                    <h5 class="text-xs font-mono text-stone-400 uppercase font-bold mb-1">Material & Structural Formulation:</h5>
                    <p class="text-sm text-stone-100 font-medium leading-relaxed bg-stone-900/60 p-3.5 rounded-xl border border-stone-850">
                      ${selectedZone.material}
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span class="font-bold text-orange-400 block mb-1">Biomechanical Role:</span>
                      <p class="text-stone-300 leading-relaxed">${selectedZone.technicalRole}</p>
                    </div>

                    <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span class="font-bold text-emerald-400 block mb-1">Durability & Functional Purpose:</span>
                      <p class="text-stone-300 leading-relaxed">${selectedZone.description}</p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Brand Proprietary Technologies Callout -->
              <div class="p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <span>${intel.brand} Engineering Signature Highlights</span>
                  </h4>
                  <span class="text-[11px] font-mono text-stone-400">Authentic Tech Stack</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  ${intel.designHighlights.map(highlight => `
                    <div class="p-3.5 rounded-xl bg-stone-950/80 border border-stone-850 text-xs text-stone-300 leading-relaxed flex items-start gap-2">
                      <span class="text-orange-400 font-bold shrink-0 mt-0.5">✦</span>
                      <span>${highlight}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Suitable Footwear Activities -->
              <div>
                <span class="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block mb-2">Recommended Activity Scenarios:</span>
                <div class="flex flex-wrap gap-2">
                  ${intel.suitableActivities.map(act => `
                    <span class="px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      ${act}
                    </span>
                  `).join('')}
                </div>
              </div>

            </div>
          ` : ''}

          <!-- TAB 2: HOW IT MAY WEAR (Usage Explorer + Lifecycle Timeline) -->
          ${activeTab === 'wear' ? `
            <div class="space-y-8">
              
              <!-- Usage Explorer Section -->
              <div class="space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                  <div>
                    <h3 class="font-display font-bold text-lg text-white">Usage Explorer</h3>
                    <p class="text-xs text-stone-400">
                      Understand how distinct lifestyle environments subject this exact model to wear.
                    </p>
                  </div>
                  <span class="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-semibold text-[11px] flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    System-Generated Usage Interpretation
                  </span>
                </div>

                <!-- Scenario Selector Buttons -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  ${scenarios.map((sc, idx) => `
                    <button 
                      data-scenario-idx="${idx}"
                      class="p-3 rounded-xl border text-left transition ${
                        selectedScenarioIndex === idx 
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm' 
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }"
                    >
                      <div class="text-[10px] font-mono text-stone-400 uppercase">Scenario 0${idx + 1}</div>
                      <div class="font-display font-bold text-xs mt-0.5 truncate">${sc.scenarioTitle}</div>
                      <span class="mt-2 inline-block px-2 py-0.5 rounded text-[9px] font-bold ${sc.exposureColor}">
                        ${sc.exposureLevel} Exposure
                      </span>
                    </button>
                  `).join('')}
                </div>

                <!-- Active Scenario Card -->
                <div class="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                  <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-850">
                    <div>
                      <span class="text-[10px] font-mono uppercase text-amber-400 font-bold">Selected Scenario</span>
                      <h4 class="font-display font-bold text-lg text-white">${activeScenario.scenarioTitle}</h4>
                    </div>
                    <span class="px-3 py-1 rounded-lg border font-mono text-xs font-bold ${activeScenario.exposureColor}">
                      ${activeScenario.exposureLevel} Wear Exposure
                    </span>
                  </div>

                  <div class="space-y-3 text-xs">
                    <div>
                      <span class="text-stone-400 font-bold block mb-1 uppercase font-mono text-[10px]">Usage Pattern:</span>
                      <p class="text-stone-200 bg-stone-900/60 p-3 rounded-xl border border-stone-850 leading-relaxed">
                        ${activeScenario.usagePattern}
                      </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                        <span class="text-stone-400 font-bold block mb-1 uppercase font-mono text-[10px]">Main Areas Likely to Experience Wear:</span>
                        <p class="text-stone-200 leading-relaxed">${activeScenario.mainWearAreas}</p>
                      </div>

                      <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                        <span class="text-rose-400 font-bold block mb-1 uppercase font-mono text-[10px]">Factors That Can Accelerate Wear:</span>
                        <p class="text-stone-300 leading-relaxed">${activeScenario.acceleratingFactors}</p>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                        <span class="text-amber-400 font-bold block mb-1 uppercase font-mono text-[10px]">What You Should Monitor:</span>
                        <p class="text-stone-300 leading-relaxed">${activeScenario.monitorPoints}</p>
                      </div>

                      <div class="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                        <span class="text-emerald-400 font-bold block mb-1 uppercase font-mono text-[10px]">Care Recommendation:</span>
                        <p class="text-emerald-200 leading-relaxed">${activeScenario.careRecommendation}</p>
                      </div>
                    </div>
                  </div>

                  <div class="pt-2 text-[11px] text-stone-500 font-mono italic">
                    * Wear rates depend on individual biomechanics, foot strike angle, and surface abrasiveness. SoleWise provides scenario interpretations rather than fabricated numerical timelines.
                  </div>
                </div>
              </div>

              <!-- Product Lifecycle Timeline Section -->
              <div class="space-y-4 pt-4 border-t border-stone-800">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 class="font-display font-bold text-lg text-white">Product Lifecycle Timeline</h3>
                    <p class="text-xs text-stone-400">Conceptual lifecycle stages illustrating observable physical changes over time.</p>
                  </div>
                  <span class="text-[10px] font-mono text-stone-500">5 Distinct Phases</span>
                </div>

                <!-- Stepper Progress Bar (Desktop & Mobile Adaptable) -->
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  ${timelineStages.map((stage, idx) => `
                    <button 
                      data-timeline-idx="${idx}"
                      class="p-2.5 rounded-xl border text-left transition ${
                        selectedTimelineStageIndex === idx 
                          ? 'bg-orange-500/15 border-orange-500 text-white shadow-sm' 
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }"
                    >
                      <div class="flex items-center gap-1.5 text-[10px] font-mono">
                        <span class="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                          selectedTimelineStageIndex === idx ? 'bg-orange-500 text-white' : 'bg-stone-800 text-stone-400'
                        }">
                          ${idx + 1}
                        </span>
                        <span class="truncate">${stage.title}</span>
                      </div>
                      <div class="text-[10px] font-bold text-stone-300 mt-1 truncate">${stage.statusLabel}</div>
                    </button>
                  `).join('')}
                </div>

                <!-- Active Timeline Stage Card -->
                <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-850">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                      <h4 class="font-display font-bold text-base text-white">Stage ${selectedTimelineStageIndex + 1}: ${activeTimeline.title}</h4>
                      <span class="text-xs text-orange-400 font-mono">(${activeTimeline.statusLabel})</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs font-mono text-stone-400">
                      <span>Cushioning: <strong class="text-stone-200">${activeTimeline.cushioningStatus}</strong></span>
                      <span>·</span>
                      <span>Traction: <strong class="text-stone-200">${activeTimeline.tractionStatus}</strong></span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div class="p-3.5 rounded-xl bg-stone-900/50 border border-stone-850">
                      <span class="font-bold text-stone-300 block mb-1">Observable Changes at This Stage:</span>
                      <p class="text-stone-300 leading-relaxed">${activeTimeline.observableChanges}</p>
                    </div>

                    <div class="p-3.5 rounded-xl bg-stone-900/50 border border-stone-850">
                      <span class="font-bold text-orange-400 block mb-1">Recommended Action & Guidance:</span>
                      <p class="text-stone-300 leading-relaxed">${activeTimeline.guidance}</p>
                    </div>
                  </div>
                </div>

                <!-- Mandatory Timeline Disclaimer -->
                <div class="p-4 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 leading-relaxed flex items-start gap-2.5">
                  <svg class="w-4 h-4 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span>
                    <strong>Responsible Durability Policy:</strong> "This timeline is a general usage framework, not a guaranteed product lifespan. Actual durability depends on usage, surface, distance, maintenance, environment and individual wear patterns."
                  </span>
                </div>

              </div>

            </div>
          ` : ''}

          <!-- TAB 3: CARE & CLEANING (What is it made from + Walkthrough + Wet Guidance) -->
          ${activeTab === 'care' ? `
            <div class="space-y-8">
              
              <!-- Provenance Header -->
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div>
                  <h3 class="font-display font-bold text-lg text-white">Shoe Care & Material Preservation</h3>
                  <p class="text-xs text-stone-400">Tailored maintenance rules calibrated for ${product.name}'s specific materials.</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold text-[11px] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  General Footwear-Care Guidance
                </span>
              </div>

              <!-- Section: What is this shoe made from? -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-display font-bold text-sm sm:text-base text-white">What is this shoe made from?</h4>
                  <span class="text-xs text-stone-400 font-mono">${materialsList.length} Verified Components</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  ${materialsList.map(mat => `
                    <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase">
                          ${mat.category}
                        </span>
                      </div>
                      <h5 class="font-display font-bold text-sm text-white">${mat.name}</h5>
                      <p class="text-xs text-stone-300 leading-relaxed">${mat.description}</p>
                      <div class="pt-2 border-t border-stone-850 text-[11px] text-emerald-300/90 leading-relaxed">
                        <strong class="text-emerald-400">Care rule:</strong> ${mat.careConsideration}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Section: 6-Step Visual Cleaning Walkthrough -->
              <div class="space-y-3 pt-4 border-t border-stone-800">
                <div>
                  <h4 class="font-display font-bold text-base text-white">Cleaning Walkthrough</h4>
                  <p class="text-xs text-stone-400">Follow this 6-step sequence to clean safely without degrading material bonds.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${cleaningSteps.map(step => `
                    <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 flex flex-col justify-between space-y-2">
                      <div>
                        <div class="flex items-center gap-2 mb-1.5">
                          <span class="w-6 h-6 rounded-full bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            ${step.stepNumber}
                          </span>
                          <h5 class="font-display font-bold text-xs text-white">${step.title}</h5>
                        </div>
                        <p class="text-xs text-stone-300 leading-relaxed">${step.instruction}</p>
                      </div>

                      ${step.warningNote ? `
                        <div class="pt-2 border-t border-stone-850 text-[10px] text-amber-300 font-mono flex items-start gap-1">
                          <span class="text-amber-400 font-bold">⚠</span>
                          <span>${step.warningNote}</span>
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Section: If Your Shoe Gets Wet (Dedicated Card) -->
              <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-stone-950 border border-blue-900/40 space-y-4">
                <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-blue-900/30">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-display font-bold text-base text-blue-100">If Your Shoe Gets Wet</h4>
                      <p class="text-[11px] text-blue-300/80">Immediate drying protocol after rain, puddle immersion, or water spills.</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    Hydration Recovery Protocol
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-blue-900/30 space-y-1">
                    <span class="font-bold text-blue-300 block font-mono text-[10px] uppercase">Step 1: Surface Moisture Removal</span>
                    <p class="text-stone-300 leading-relaxed">${wetGuidance.step1Moisture}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-blue-900/30 space-y-1">
                    <span class="font-bold text-blue-300 block font-mono text-[10px] uppercase">Step 2: Insole Decoupling</span>
                    <p class="text-stone-300 leading-relaxed">${wetGuidance.step2Insoles}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-blue-900/30 space-y-1">
                    <span class="font-bold text-blue-300 block font-mono text-[10px] uppercase">Step 3: Internal Moisture Absorption</span>
                    <p class="text-stone-300 leading-relaxed">${wetGuidance.step3Absorption}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-blue-900/30 space-y-1">
                    <span class="font-bold text-blue-300 block font-mono text-[10px] uppercase">Step 4: Ambient Air Circulation</span>
                    <p class="text-stone-300 leading-relaxed">${wetGuidance.step4AirDrying}</p>
                  </div>
                </div>

                <!-- Critical Heat Warnings -->
                <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200 space-y-1.5">
                  <span class="font-bold text-rose-400 block font-mono uppercase text-[10px]">Strict Thermal Warnings (What to Avoid):</span>
                  <ul class="space-y-1">
                    ${wetGuidance.heatWarnings.map(w => `
                      <li class="flex items-start gap-1.5">
                        <span class="text-rose-400 font-bold shrink-0">✕</span>
                        <span>${w}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <!-- Storage & General Things to Avoid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 class="font-display font-bold text-sm text-white">Optimal Long-Term Storage</h4>
                  <p class="text-xs text-stone-300 leading-relaxed">${intel.care.storageAdvice}</p>
                </div>

                <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 class="font-display font-bold text-sm text-white">General Daily Care Routine</h4>
                  <p class="text-xs text-stone-300 leading-relaxed">${intel.care.cleaningApproach}</p>
                </div>
              </div>

            </div>
          ` : ''}

          <!-- TAB 4: WEAR CHECK (Cosmetic vs Functional vs Critical) -->
          ${activeTab === 'check' ? `
            <div class="space-y-6">
              
              <!-- Provenance Header -->
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div>
                  <h3 class="font-display font-bold text-lg text-white">Wear Check Inspection System</h3>
                  <p class="text-xs text-stone-400">
                    A physical diagnostic guide to evaluate whether wear is purely cosmetic or structurally significant.
                  </p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono font-semibold text-[11px] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  System-Generated Diagnostic Aid
                </span>
              </div>

              <!-- 3 Severity Tiers Cards -->
              <div class="space-y-4">
                ${wearTiers.map(tier => `
                  <div class="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition space-y-3">
                    
                    <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-850">
                      <div class="flex items-center gap-2.5">
                        <span class="px-2.5 py-1 rounded-lg border font-mono font-bold text-xs ${tier.badgeBg}">
                          ${tier.level}
                        </span>
                        <h4 class="font-display font-bold text-base text-white">${tier.severityTitle}</h4>
                      </div>
                      <span class="text-[11px] font-mono text-stone-400">Diagnostic Tier</span>
                    </div>

                    <div class="space-y-3 text-xs">
                      <div>
                        <span class="text-stone-400 font-bold block mb-1 uppercase font-mono text-[10px]">Observable Physical Symptoms:</span>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          ${tier.examples.map(ex => `
                            <div class="p-2.5 rounded-xl bg-stone-900/60 border border-stone-850 text-stone-200 flex items-center gap-2">
                              <span class="w-1.5 h-1.5 rounded-full ${tier.colorClass}"></span>
                              <span>${ex}</span>
                            </div>
                          `).join('')}
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div class="p-3.5 rounded-xl bg-stone-900/40 border border-stone-850">
                          <span class="font-bold text-stone-300 block mb-1 uppercase font-mono text-[10px]">What It Means:</span>
                          <p class="text-stone-300 leading-relaxed">${tier.whatItMeans}</p>
                        </div>

                        <div class="p-3.5 rounded-xl ${
                          tier.level === 'CRITICAL' ? 'bg-rose-950/20 border-rose-900/40' : 'bg-stone-900/40 border-stone-850'
                        }">
                          <span class="font-bold ${tier.colorClass} block mb-1 uppercase font-mono text-[10px]">What To Do:</span>
                          <p class="text-stone-200 leading-relaxed">${tier.whatToDo}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>

              <!-- Physical Inspection Checklist Helper -->
              <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-display font-bold text-sm sm:text-base text-white">5-Point Physical Inspection Checklist</h4>
                  <span class="text-xs text-stone-400 font-mono">Self-Audit</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-stone-850">
                    <strong class="text-orange-400 block mb-1">1. Outsole Tread Depth:</strong>
                    <span class="text-stone-300">Run thumb over ball and heel. If tread is level with base rubber, wet grip is reduced.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-stone-850">
                    <strong class="text-orange-400 block mb-1">2. Midsole Sidewall:</strong>
                    <span class="text-stone-300">Inspect foam sidewall. Permanent heavy accordion creases indicate foam cell fatigue.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-stone-850">
                    <strong class="text-orange-400 block mb-1">3. Heel Counter Stiffness:</strong>
                    <span class="text-stone-300">Squeeze rear counter sides. Counter should resist collapse to keep calcaneus aligned.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-stone-850">
                    <strong class="text-orange-400 block mb-1">4. Upper Toe Box Seams:</strong>
                    <span class="text-stone-300">Check for tearing along the welt line where mesh or leather meets the sole unit.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-stone-900/60 border border-stone-850">
                    <strong class="text-orange-400 block mb-1">5. Table Tilt Test:</strong>
                    <span class="text-stone-300">Place both shoes on a flat table. If either leans inward or outward on its own, replace immediately.</span>
                  </div>
                </div>
              </div>

              <!-- Responsible Medical & Safety Note -->
              <div class="p-3.5 rounded-xl bg-stone-950 border border-stone-850 text-[11px] text-stone-400 italic">
                Notice: SoleWise does not diagnose medical orthopedic conditions with certainty. Consider professional assessment or replacement if structural damage affects safe use or if you experience recurring pain.
              </div>

            </div>
          ` : ''}

          <!-- TAB 5: SOURCES & VERIFICATION -->
          ${activeTab === 'sources' ? `
            <div class="space-y-6">
              
              <!-- Provenance Header -->
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div>
                  <h3 class="font-display font-bold text-lg text-white">Public References & Source Provenance</h3>
                  <p class="text-xs text-stone-400">
                    SoleWise intelligence is verified against manufacturer engineering data, official care manuals, and research literature.
                  </p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold text-[11px] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Fully Cited Footwear Dossier
                </span>
              </div>

              <!-- 1. Manufacturer Information -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                    Category A
                  </span>
                  <h4 class="font-display font-bold text-sm sm:text-base text-white">Manufacturer Information</h4>
                </div>

                <div class="space-y-3">
                  ${groupedSources.manufacturer.map(src => `
                    <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-stone-900 text-stone-300 border border-stone-800">
                            Manufacturer Specification
                          </span>
                          <span class="text-xs font-bold text-white">${src.organization}</span>
                        </div>
                        <h5 class="font-display font-bold text-sm text-stone-100">${src.title}</h5>
                        <p class="text-xs text-stone-400 mt-1">${src.synthesisNote}</p>
                      </div>

                      <a 
                        href="${src.url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="shrink-0 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <span>View Source</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 2. Care Information -->
              <div class="space-y-3 pt-2">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    Category B
                  </span>
                  <h4 class="font-display font-bold text-sm sm:text-base text-white">Care & Maintenance Documentation</h4>
                </div>

                <div class="space-y-3">
                  ${groupedSources.care.map(src => `
                    <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-stone-900 text-stone-300 border border-stone-800">
                            Care Guide
                          </span>
                          <span class="text-xs font-bold text-white">${src.organization}</span>
                        </div>
                        <h5 class="font-display font-bold text-sm text-stone-100">${src.title}</h5>
                        <p class="text-xs text-stone-400 mt-1">${src.synthesisNote}</p>
                      </div>

                      <a 
                        href="${src.url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="shrink-0 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <span>View Guide</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 3. Technical / Research Reference -->
              <div class="space-y-3 pt-2">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                    Category C
                  </span>
                  <h4 class="font-display font-bold text-sm sm:text-base text-white">Technical & Biomechanics Research Reference</h4>
                </div>

                <div class="space-y-3">
                  ${groupedSources.technical.map(src => `
                    <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-stone-900 text-stone-300 border border-stone-800">
                            Technical Reference
                          </span>
                          <span class="text-xs font-bold text-white">${src.organization}</span>
                        </div>
                        <h5 class="font-display font-bold text-sm text-stone-100">${src.title}</h5>
                        <p class="text-xs text-stone-400 mt-1">${src.synthesisNote}</p>
                      </div>

                      <a 
                        href="${src.url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="shrink-0 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <span>View Publication</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>
          ` : ''}

        </div>

        <!-- Modal Bottom Actions Bar -->
        <div class="px-4 sm:px-6 py-3.5 border-t border-stone-800 bg-stone-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          
          <div class="flex items-center gap-2 text-xs text-stone-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Intelligence verified for <strong class="text-white">${product.name}</strong> (${formatINR(product.priceINR)})</span>
          </div>

          <div class="flex items-center gap-2.5">
            <button 
              id="modal-close-footer-btn" 
              class="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-stone-600"
            >
              Close Dossier
            </button>

            ${onAddToCart ? `
              <button 
                id="modal-add-to-cart-btn" 
                class="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add ${formatINR(product.priceINR)} to Bag</span>
              </button>
            ` : ''}
          </div>

        </div>

      </div>
    `;

    // Attach Event Handlers
    modalOverlay.querySelector('#close-intel-modal-btn')?.addEventListener('click', closeModal);
    modalOverlay.querySelector('#modal-close-footer-btn')?.addEventListener('click', closeModal);

    modalOverlay.querySelector('#modal-add-to-cart-btn')?.addEventListener('click', () => {
      if (onAddToCart) onAddToCart(product);
      closeModal();
    });

    // Tab buttons
    modalOverlay.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).getAttribute('data-tab') as any;
        if (tab && tab !== activeTab) {
          activeTab = tab;
          renderModal();
        }
      });
    });

    // Anatomy zone selector
    modalOverlay.querySelectorAll('[data-anatomy-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-anatomy-id');
        if (id) {
          selectedAnatomyId = id;
          renderModal();
        }
      });
    });

    // Scenario selector
    modalOverlay.querySelectorAll('[data-scenario-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-scenario-idx') || '0', 10);
        selectedScenarioIndex = idx;
        renderModal();
      });
    });

    // Timeline stage selector
    modalOverlay.querySelectorAll('[data-timeline-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-timeline-idx') || '0', 10);
        selectedTimelineStageIndex = idx;
        renderModal();
      });
    });
  }

  function closeModal() {
    document.removeEventListener('keydown', handleKeyDown);
    modalOverlay.remove();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  // Click outside modal content to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleKeyDown);

  renderModal();
  document.body.appendChild(modalOverlay);
}
