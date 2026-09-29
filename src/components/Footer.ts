import { BRANDS } from '../data/brands';

export interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenCare: () => void;
  onOpenDesignLab: () => void;
  onOpenAbout: () => void;
}

export function renderFooter(container: HTMLElement, props: FooterProps) {
  container.innerHTML = `
    <footer class="bg-stone-950 border-t border-stone-850 pt-16 pb-12 text-xs text-stone-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <!-- Brand Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center font-display font-extrabold text-white text-base shadow-lg shadow-orange-600/30">
                SW
              </div>
              <span class="font-display font-extrabold text-xl text-white">
                SoleWise
              </span>
            </div>

            <p class="text-stone-400 text-xs max-w-sm leading-relaxed">
              Smart Footwear Commerce & Product Intelligence Platform. Empowering consumers to discover, understand, and customize footwear through engineering transparency.
            </p>

            <div class="text-[11px] font-mono text-stone-500">
              Discover. Understand. Customize.
            </div>
          </div>

          <!-- Supported Brands -->
          <div>
            <h4 class="font-display font-bold text-white text-sm mb-3">10 Supported Brands</h4>
            <ul class="space-y-1.5 text-stone-400">
              ${BRANDS.slice(0, 5).map(b => `<li>${b.name}</li>`).join('')}
              <li class="text-stone-500">and 5 more...</li>
            </ul>
          </div>

          <!-- Product Intelligence Links -->
          <div>
            <h4 class="font-display font-bold text-white text-sm mb-3">Platform Features</h4>
            <ul class="space-y-2">
              <li><button id="footer-shop-btn" class="hover:text-white transition">Product Catalog</button></li>
              <li><button id="footer-care-btn" class="hover:text-white transition">Shoe Care Center</button></li>
              <li><button id="footer-design-btn" class="hover:text-white transition">Shoe Design Lab</button></li>
              <li><button id="footer-challenge-btn" class="hover:text-white transition">Weekly Challenges</button></li>
              <li><button id="footer-about-btn" class="hover:text-white transition">Architecture Overview</button></li>
            </ul>
          </div>

          <!-- Standards & Disclaimers -->
          <div>
            <h4 class="font-display font-bold text-white text-sm mb-3">Responsible Standards</h4>
            <p class="text-[11px] leading-relaxed text-stone-500">
              All product specifications are curated from verifiable public technical documentation. We do not provide arbitrary lifespan guarantees; wear predictions are scenario-based approximations.
            </p>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 SoleWise Platform. Built with Vanilla TS, HTML5, CSS3, Django REST Framework & Firebase.</p>
          <div class="flex items-center gap-4">
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Zero Framework Bloat</span>
            <span>•</span>
            <span>Verified Source Specs</span>
          </div>
        </div>

      </div>
    </footer>
  `;

  container.querySelector('#footer-shop-btn')?.addEventListener('click', () => props.onNavigate('shop'));
  container.querySelector('#footer-care-btn')?.addEventListener('click', props.onOpenCare);
  container.querySelector('#footer-design-btn')?.addEventListener('click', props.onOpenDesignLab);
  container.querySelector('#footer-challenge-btn')?.addEventListener('click', () => props.onNavigate('challenges'));
  container.querySelector('#footer-about-btn')?.addEventListener('click', props.onOpenAbout);
}
