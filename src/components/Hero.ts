export interface HeroProps {
  onExploreShop: () => void;
  onOpenDesignLab: () => void;
  onOpenCareCenter: () => void;
}

export function renderHero(container: HTMLElement, props: HeroProps) {
  container.innerHTML = `
    <section class="relative overflow-hidden py-16 sm:py-24 border-b border-stone-850">
      
      <!-- Ambient Background Glows -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Manifesto & Value Proposition -->
          <div class="lg:col-span-7 space-y-6">
            
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              <span>Product Intelligence Engine Active</span>
            </div>

            <h1 class="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
              Discover. <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Understand.</span> <br/>
              Customize.
            </h1>

            <p class="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
              SoleWise eliminates footwear guesswork. Go beyond marketing hype with factual materials breakdown, scenario-based wear analysis, step-by-step care guidance, and our interactive Design Lab.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button id="hero-explore-btn" class="px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm shadow-xl shadow-orange-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                Explore Verified Catalog
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

              <button id="hero-care-btn" class="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 font-semibold text-sm transition flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Shoe Care Center
              </button>
            </div>

            <!-- Key Platform Metrics -->
            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-stone-850">
              <div>
                <p class="font-display font-bold text-2xl text-white">10</p>
                <p class="text-xs text-stone-400">Real Global Brands</p>
              </div>
              <div>
                <p class="font-display font-bold text-2xl text-orange-400">4 Modes</p>
                <p class="text-xs text-stone-400">Lifecycle Wear Analysis</p>
              </div>
              <div>
                <p class="font-display font-bold text-2xl text-emerald-400">100%</p>
                <p class="text-xs text-stone-400">Verifiable Source Specs</p>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive Concept Card "New ideas make us grow" -->
          <div class="lg:col-span-5">
            <div class="relative rounded-3xl p-7 glass-panel border border-stone-800/80 shadow-2xl overflow-hidden group">
              
              <!-- Subtle badge -->
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  Weekly Design Challenge #42
                </span>
                <span class="text-xs text-stone-400 font-mono">Live Community</span>
              </div>

              <!-- Catchy concept headline -->
              <h2 class="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                "New ideas make us grow."
              </h2>

              <p class="text-xs text-stone-400 mt-2">
                Choose a shoe. Reimagine its colors. Create your style.
              </p>

              <!-- Shoe Silhouette Visual Concept Preview -->
              <div class="my-6 p-6 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800/60 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/40 transition">
                <svg viewBox="0 0 400 200" class="w-full h-auto max-h-40 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
                  <!-- Vector shoe outline preview -->
                  <path d="M 60,140 C 60,110 80,70 120,60 C 160,50 200,85 240,90 C 280,95 330,110 350,140 C 350,165 330,170 300,170 L 60,170 Z" fill="#1c1917" stroke="#44403c" stroke-width="2"/>
                  <!-- Upper overlay -->
                  <path d="M 120,60 C 160,50 200,85 240,90 C 260,92 280,98 290,110 L 160,120 Z" fill="#ea580c" opacity="0.85"/>
                  <!-- Accent slash -->
                  <path d="M 140,80 Q 220,110 270,125" stroke="#facc15" stroke-width="6" fill="none" stroke-linecap="round"/>
                  <!-- Sole -->
                  <path d="M 55,145 C 80,145 130,148 180,148 C 240,148 300,145 355,145 C 355,165 340,175 300,175 L 60,175 C 50,175 50,160 55,145 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
                </svg>
                <div class="absolute bottom-2 right-3 text-[10px] text-stone-500 font-mono">
                  Interactive Vector Engine
                </div>
              </div>

              <!-- Community Guidance Note (Mandated in prompt) -->
              <p class="text-[11px] text-stone-400 italic mb-5 leading-normal">
                * Selected community designs may inspire future colorways. Enter this week's challenge and vote on designs from fellow creators.
              </p>

              <button id="hero-customizer-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                Reimagine Colors in Design Lab
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  `;

  container.querySelector('#hero-explore-btn')?.addEventListener('click', props.onExploreShop);
  container.querySelector('#hero-care-btn')?.addEventListener('click', props.onOpenCareCenter);
  container.querySelector('#hero-customizer-btn')?.addEventListener('click', props.onOpenDesignLab);
}
