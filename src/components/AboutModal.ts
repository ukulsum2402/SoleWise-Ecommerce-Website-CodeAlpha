export function openAboutModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'about-modal-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';

  modalOverlay.innerHTML = `
    <div class="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-5 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
        <div>
          <span class="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">Engineering Architecture & Manifesto</span>
          <h2 class="font-display font-bold text-xl sm:text-2xl text-white">About SoleWise</h2>
        </div>

        <button id="close-about-btn" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-300 leading-relaxed">
        
        <!-- Platform Thesis -->
        <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
          <h3 class="font-display font-bold text-base text-white">
            1. Why SoleWise Is Not a Standard E-Commerce Clone
          </h3>
          <p>
            Mainstream footwear retailers (Amazon, Myntra, Flipkart) are built solely for fast transactional turnover. They show prices and buy buttons, but leave buyers in the dark regarding <em>material construction</em>, <em>realistic lifestyle wear</em>, and <em>safe cleaning techniques</em>.
          </p>
          <p>
            SoleWise bridges footwear commerce with <strong>Product Intelligence</strong>. Every model features deep technical dossiers, scenario-based wear predictions, material-specific care routines, and an interactive Design Lab.
          </p>
        </div>

        <!-- The 3 Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-4 rounded-xl bg-stone-950 border border-stone-850 space-y-1">
            <div class="font-display font-bold text-orange-400 text-sm">Discover</div>
            <p class="text-[11px] text-stone-400">Multi-attribute faceted filtering across 10 globally recognized brands.</p>
          </div>
          <div class="p-4 rounded-xl bg-stone-950 border border-stone-850 space-y-1">
            <div class="font-display font-bold text-amber-400 text-sm">Understand</div>
            <p class="text-[11px] text-stone-400">4-scenario lifecycle simulations, wear signals, and verified manufacturer source links.</p>
          </div>
          <div class="p-4 rounded-xl bg-stone-950 border border-stone-850 space-y-1">
            <div class="font-display font-bold text-emerald-400 text-sm">Customize</div>
            <p class="text-[11px] text-stone-400">Interactive SVG vector coloring lab and weekly community design challenges.</p>
          </div>
        </div>

        <!-- System Architecture Guide -->
        <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <h3 class="font-display font-bold text-base text-white">
            2. Full-Stack Engineering Architecture
          </h3>
          <ul class="space-y-2">
            <li>
              <strong class="text-white">Frontend:</strong> Pure HTML5, CSS3 with Tailwind v4, and Vanilla JavaScript/TypeScript. Modular DOM rendering without heavy framework bloat.
            </li>
            <li>
              <strong class="text-white">Backend:</strong> Python, Django 4.2, and Django REST Framework located in <code class="text-orange-400 font-mono">/backend/</code>. Decoupled apps for Products, Intelligence, Care, Design Lab, Challenges, and Commerce.
            </li>
            <li>
              <strong class="text-white">Database / Persistence:</strong> Google Cloud Firestore configured with strict Attribute-Based Access Control (ABAC) in <code class="text-orange-400 font-mono">firestore.rules</code> and typed IR blueprint in <code class="text-orange-400 font-mono">firebase-blueprint.json</code>.
            </li>
            <li>
              <strong class="text-white">Authentication:</strong> Google OAuth popup sign-in with user profile synchronization.
            </li>
          </ul>
        </div>

        <!-- Academic & Portfolio Presentation Summary -->
        <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
          <strong class="block mb-1">Interview & Portfolio Defense Note:</strong>
          SoleWise demonstrates full software lifecycle design: domain-driven modularization, responsible lifecycle wear modeling without fabricating false longevity claims, and an interactive SVG rendering engine.
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-stone-800 bg-stone-950/80 flex justify-end shrink-0">
        <button id="close-about-footer-btn" class="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition text-xs">
          Close Overview
        </button>
      </div>

    </div>
  `;

  modalOverlay.querySelector('#close-about-btn')?.addEventListener('click', () => modalOverlay.remove());
  modalOverlay.querySelector('#close-about-footer-btn')?.addEventListener('click', () => modalOverlay.remove());
  document.body.appendChild(modalOverlay);
}
