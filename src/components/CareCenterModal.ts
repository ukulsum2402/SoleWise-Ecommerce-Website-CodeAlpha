import { MATERIAL_CARE_GUIDES, MaterialCareGuide } from '../data/materials';

export function openCareCenterModal() {
  let selectedMaterialId = 'mesh';

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'care-center-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';

  function render() {
    const activeGuide: MaterialCareGuide = MATERIAL_CARE_GUIDES.find(g => g.id === selectedMaterialId) || MATERIAL_CARE_GUIDES[0];

    modalOverlay.innerHTML = `
      <div class="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                SoleWise Footwear Preservation Standard
              </span>
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white">
                Material-Specific Shoe Care Center
              </h2>
            </div>
          </div>

          <button id="close-care-btn" class="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Material Selection Pills -->
        <div class="px-6 py-3 border-b border-stone-800 bg-stone-900/90 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          ${MATERIAL_CARE_GUIDES.map(g => `
            <button data-mat-id="${g.id}" class="mat-tab-btn px-4 py-2 rounded-xl text-xs font-medium transition shrink-0 ${selectedMaterialId === g.id ? 'bg-emerald-600 text-white font-bold shadow' : 'bg-stone-950 border border-stone-800 text-stone-300 hover:border-stone-700'}">
              ${g.name}
            </button>
          `).join('')}
        </div>

        <!-- Content Body -->
        <div class="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-200">
          
          <!-- Summary & Tools Needed -->
          <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div>
              <span class="text-[11px] font-mono text-emerald-400 uppercase font-bold">Material Overview:</span>
              <p class="text-sm text-stone-200 mt-1 leading-relaxed">${activeGuide.shortDesc}</p>
            </div>

            <div class="pt-2 border-t border-stone-850">
              <span class="text-[11px] font-mono text-stone-400 uppercase font-bold block mb-2">Recommended Tools:</span>
              <div class="flex flex-wrap gap-2">
                ${activeGuide.toolsNeeded.map(tool => `
                  <span class="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                    ✓ ${tool}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Step-by-Step Cleaning Sequence -->
          <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <h4 class="font-display font-bold text-sm text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              Cleaning Routine (When Dirty)
            </h4>
            <ol class="space-y-2 list-decimal list-inside text-stone-300">
              ${activeGuide.cleaningRoutine.map(step => `
                <li class="leading-relaxed pl-1">${step}</li>
              `).join('')}
            </ol>
          </div>

          <!-- Drying Guide & Storage Practices -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Wet Drying Guide -->
            <div class="p-5 rounded-2xl bg-blue-950/20 border border-blue-900/40 space-y-2">
              <h4 class="font-display font-bold text-sm text-blue-200 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                If the Shoe Gets Wet
              </h4>
              <ul class="space-y-1.5 text-blue-100">
                ${activeGuide.ifWetDryingGuide.map(item => `
                  <li class="leading-relaxed">• ${item}</li>
                `).join('')}
              </ul>
            </div>

            <!-- Storage Practices -->
            <div class="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <h4 class="font-display font-bold text-sm text-white">Proper Storage</h4>
              <p class="text-stone-300 leading-relaxed">${activeGuide.storageAdvice}</p>
            </div>

          </div>

          <!-- Critical Do NOTs -->
          <div class="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <h4 class="font-display font-bold text-sm text-rose-300 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Things to Avoid (Prevents Permanent Damage)
            </h4>
            <ul class="space-y-1 text-rose-200">
              ${activeGuide.criticalDonts.map(dont => `
                <li class="flex items-start gap-1.5">
                  <span class="text-rose-400 font-bold">✕</span>
                  <span>${dont}</span>
                </li>
              `).join('')}
            </ul>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
          <span class="text-[11px] text-stone-500 font-mono">
            Always test cleaners on an inconspicuous inner collar section first.
          </span>
          <button id="close-care-footer-btn" class="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition">
            Close Guide
          </button>
        </div>

      </div>
    `;

    modalOverlay.querySelector('#close-care-btn')?.addEventListener('click', () => modalOverlay.remove());
    modalOverlay.querySelector('#close-care-footer-btn')?.addEventListener('click', () => modalOverlay.remove());

    modalOverlay.querySelectorAll('.mat-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedMaterialId = (e.currentTarget as HTMLElement).getAttribute('data-mat-id') || 'mesh';
        render();
      });
    });
  }

  render();
  document.body.appendChild(modalOverlay);
}
