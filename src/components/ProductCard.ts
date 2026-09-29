import { ProductItem } from '../data/products';
import { formatINR } from '../utils/currency';

export interface ProductCardProps {
  product: ProductItem;
  isWishlisted: boolean;
  onUnderstandShoe: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onToggleWishlist: (product: ProductItem) => void;
}

export function renderProductCard(container: HTMLElement, props: ProductCardProps) {
  const card = document.createElement('div');
  card.className = 'group flex flex-col bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden card-hover-effect';

  const hasDiscount = (props.product.discountPercent || 0) > 0 && props.product.originalPriceINR && props.product.originalPriceINR > props.product.priceINR;

  card.innerHTML = `
    <!-- Top Image Container -->
    <div class="relative w-full aspect-[4/3] bg-stone-950 overflow-hidden">
      <img 
        src="${props.product.images[0]}" 
        alt="${props.product.name}" 
        loading="lazy"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <span class="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700/50 text-[10px] font-bold text-white uppercase tracking-wider">
          ${props.product.brandName}
        </span>
        <span class="px-2.5 py-1 rounded-full bg-orange-600/90 text-white text-[10px] font-bold">
          ${props.product.category}
        </span>
        ${hasDiscount ? `
          <span class="px-2 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow">
            ${props.product.discountPercent}% OFF
          </span>
        ` : ''}
      </div>

      <!-- Wishlist Button -->
      <button 
        class="wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition shadow"
        title="${props.isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
      >
        <svg class="w-4 h-4 ${props.isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>

      <!-- Rating Pill -->
      <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
        <span>★</span>
        <span>${props.product.rating}</span>
        <span class="text-stone-400 text-[10px]">(${props.product.reviewCount})</span>
      </div>
    </div>

    <!-- Product Info Section -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
      
      <div>
        <div class="flex items-baseline justify-between gap-2">
          <h3 class="font-display font-bold text-base sm:text-lg text-white group-hover:text-orange-400 transition truncate" title="${props.product.name}">
            ${props.product.name}
          </h3>
          <div class="text-right shrink-0">
            <span class="font-display font-extrabold text-lg text-white">
              ${formatINR(props.product.priceINR)}
            </span>
            ${hasDiscount ? `
              <span class="block text-[11px] text-stone-400 line-through">
                ${formatINR(props.product.originalPriceINR!)}
              </span>
            ` : ''}
          </div>
        </div>

        <p class="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
          ${props.product.shortDescription}
        </p>

        <!-- Pricing Provenance Micro-Tag -->
        <div class="mt-2.5 flex items-center justify-between text-[10px] font-mono text-stone-500">
          <span class="text-emerald-400/90 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ${props.product.priceType}
          </span>
          <span class="truncate max-w-[150px]">${props.product.priceSource}</span>
        </div>

        <!-- Intended Use Micro-Tag -->
        <div class="mt-2 py-1.5 px-2.5 rounded-lg bg-stone-950/60 border border-stone-800 text-[11px] text-stone-300 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span class="truncate">${props.product.intendedUseSummary}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2 pt-2 border-t border-stone-800/80">
        
        <!-- Understand This Shoe Button (Signature Feature) -->
        <button 
          class="understand-btn w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 hover:from-orange-500/25 hover:to-orange-500/25 border border-orange-500/40 text-orange-400 hover:text-orange-300 font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Understand This Shoe: Inspect construction, wear lifecycle, and care guidance for ${props.product.name}"
        >
          <svg class="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <span>Understand This Shoe</span>
        </button>

        <!-- Add to Bag Button -->
        <button class="add-to-cart-btn w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-orange-600 text-stone-200 hover:text-white font-medium text-xs transition flex items-center justify-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add to Bag • ${formatINR(props.product.priceINR)}
        </button>

      </div>

    </div>
  `;

  // Bind handlers
  card.querySelector('.understand-btn')?.addEventListener('click', () => props.onUnderstandShoe(props.product));
  card.querySelector('.add-to-cart-btn')?.addEventListener('click', () => props.onAddToCart(props.product));
  card.querySelector('.wishlist-btn')?.addEventListener('click', () => props.onToggleWishlist(props.product));

  container.appendChild(card);
}
