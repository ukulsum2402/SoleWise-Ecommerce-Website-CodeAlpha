import { ProductItem, PRODUCTS } from '../data/products';
import { formatINR } from '../utils/currency';

export interface WishlistDrawerProps {
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onUnderstandShoe: (product: ProductItem) => void;
  onClose: () => void;
}

export function openWishlistDrawer(props: WishlistDrawerProps) {
  let drawerOverlay = document.getElementById('wishlist-drawer-overlay');
  if (drawerOverlay) drawerOverlay.remove();

  drawerOverlay = document.createElement('div');
  drawerOverlay.id = 'wishlist-drawer-overlay';
  drawerOverlay.className = 'fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn';

  function render() {
    const wishlistedProducts = PRODUCTS.filter(p => props.wishlistIds.includes(p.id));

    drawerOverlay!.innerHTML = `
      <div class="relative w-full max-w-md h-full bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
        
        <!-- Header -->
        <div class="p-5 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-rose-500 fill-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <h3 class="font-display font-bold text-lg text-white">Your Saved Shoes</h3>
            <span class="text-xs text-stone-400 font-mono">(${wishlistedProducts.length})</span>
          </div>

          <button id="close-wishlist-btn" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Items List -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          ${wishlistedProducts.length === 0 ? `
            <div class="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div class="w-16 h-16 rounded-2xl bg-stone-800/60 flex items-center justify-center text-stone-500">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h4 class="font-display font-bold text-white text-base">No saved favorites yet</h4>
              <p class="text-xs text-stone-400 max-w-xs">
                Click the heart icon on any shoe in the catalog to save it to your personalized wishlist.
              </p>
            </div>
          ` : `
            ${wishlistedProducts.map(p => `
              <div class="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-950/70 border border-stone-850">
                <img src="${p.images[0]}" alt="${p.name}" class="w-18 h-18 rounded-xl object-cover bg-stone-900 shrink-0" />
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div>
                      <span class="text-[10px] font-mono text-stone-400 uppercase">${p.brandName}</span>
                      <h5 class="font-display font-bold text-xs text-white truncate">${p.name}</h5>
                    </div>
                    <span class="font-display font-bold text-xs text-white">${formatINR(p.priceINR)}</span>
                  </div>

                  <p class="text-[11px] text-stone-400 mt-1 line-clamp-1">${p.intendedUseSummary}</p>

                  <div class="flex items-center gap-2 mt-3 pt-2 border-t border-stone-850">
                    <button data-quick-add="${p.id}" class="flex-1 py-1.5 px-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-semibold transition">
                      Add to Bag
                    </button>
                    <button data-understand="${p.id}" class="py-1.5 px-2.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 hover:text-orange-300 text-[11px] font-bold transition flex items-center gap-1" aria-label="Understand this shoe: ${p.name}">
                      <svg class="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                      <span>Understand</span>
                    </button>
                    <button data-remove="${p.id}" class="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition" title="Remove">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          `}
        </div>

      </div>
    `;

    drawerOverlay!.querySelector('#close-wishlist-btn')?.addEventListener('click', () => {
      drawerOverlay!.remove();
      props.onClose();
    });

    drawerOverlay!.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-quick-add');
        const prod = PRODUCTS.find(p => p.id === id);
        if (prod) props.onAddToCart(prod);
      });
    });

    drawerOverlay!.querySelectorAll('[data-understand]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-understand');
        const prod = PRODUCTS.find(p => p.id === id);
        if (prod) props.onUnderstandShoe(prod);
      });
    });

    drawerOverlay!.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-remove');
        if (id) {
          props.onRemoveFromWishlist(id);
          render();
        }
      });
    });
  }

  render();
  document.body.appendChild(drawerOverlay);
}
