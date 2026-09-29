import { ProductItem, PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { renderProductCard } from './ProductCard';

export interface ShopSectionProps {
  onUnderstandShoe: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onToggleWishlist: (product: ProductItem) => void;
  wishlistIds: string[];
  initialSearchQuery?: string;
}

export function renderShopSection(container: HTMLElement, props: ShopSectionProps) {
  let selectedBrand = 'all';
  let selectedCategory = 'all';
  let selectedPriceRange = 'all'; // 'all' | 'under-6k' | '6k-10k' | '10k-15k' | 'above-15k'
  let sortBy = 'featured';
  let searchQuery = props.initialSearchQuery || '';

  function getFilteredProducts(): ProductItem[] {
    return PRODUCTS.filter(p => {
      // Brand filter
      if (selectedBrand !== 'all' && p.brandId !== selectedBrand) return false;
      // Category filter
      if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      
      // INR Price Range filter
      if (selectedPriceRange === 'under-6k' && p.priceINR >= 6000) return false;
      if (selectedPriceRange === '6k-10k' && (p.priceINR < 6000 || p.priceINR > 10000)) return false;
      if (selectedPriceRange === '10k-15k' && (p.priceINR < 10000 || p.priceINR > 15000)) return false;
      if (selectedPriceRange === 'above-15k' && p.priceINR <= 15000) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brandName.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesUse = p.intendedUseSummary.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesUse) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }

  function render() {
    const products = getFilteredProducts();

    container.innerHTML = `
      <section id="shop-catalog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Verified Footwear Directory • India Edition (INR ₹)
            </div>
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Explore Engineered Footwear
            </h2>
            <p class="text-sm text-stone-400 mt-1">
              Select any shoe to inspect real materials, lifecycle wear simulations, and official Indian listed prices.
            </p>
          </div>

          <!-- Sort and Filter Quick Controls -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2">
              <label class="text-xs text-stone-400 shrink-0">Price Range:</label>
              <select id="price-range-select" class="bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500">
                <option value="all" ${selectedPriceRange === 'all' ? 'selected' : ''}>All Prices</option>
                <option value="under-6k" ${selectedPriceRange === 'under-6k' ? 'selected' : ''}>Under ₹6,000</option>
                <option value="6k-10k" ${selectedPriceRange === '6k-10k' ? 'selected' : ''}>₹6,000 – ₹10,000</option>
                <option value="10k-15k" ${selectedPriceRange === '10k-15k' ? 'selected' : ''}>₹10,000 – ₹15,000</option>
                <option value="above-15k" ${selectedPriceRange === 'above-15k' ? 'selected' : ''}>Above ₹15,000</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <label class="text-xs text-stone-400 shrink-0">Sort By:</label>
              <select id="sort-select" class="bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500">
                <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Featured Models</option>
                <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High (₹)</option>
                <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low (₹)</option>
                <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Brand Filter Pills (Scrollable) -->
        <div class="mb-6">
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button data-brand="all" class="brand-filter-btn shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition ${selectedBrand === 'all' ? 'bg-orange-600 text-white font-bold shadow' : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'}">
              All 10 Brands
            </button>
            ${BRANDS.map(b => `
              <button data-brand="${b.id}" class="brand-filter-btn shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition ${selectedBrand === b.id ? 'bg-orange-600 text-white font-bold shadow' : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'}">
                ${b.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Category & Active Count Filters -->
        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-850 mb-8">
          
          <!-- Categories -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-stone-400 font-medium mr-1">Activity:</span>
            ${['all', 'running', 'court', 'lifestyle', 'skate', 'training'].map(c => `
              <button data-category="${c}" class="cat-filter-btn px-3 py-1.5 rounded-lg capitalize transition ${selectedCategory === c ? 'bg-stone-200 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:bg-stone-750'}">
                ${c === 'all' ? 'All Activities' : c}
              </button>
            `).join('')}
          </div>

          <!-- Active Results Count -->
          <div class="text-xs text-stone-400 font-mono">
            Showing <span class="text-white font-bold">${products.length}</span> verified footwear models in India
          </div>

        </div>

        <!-- Product Grid -->
        <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Rendered via JS -->
        </div>

        <!-- Empty State -->
        ${products.length === 0 ? `
          <div class="text-center py-16 px-4 rounded-3xl bg-stone-900/40 border border-stone-800">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-400">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-display font-bold text-lg text-white">No footwear matches your filters</h3>
            <p class="text-xs text-stone-400 max-w-sm mx-auto mt-1 mb-5">
              Try adjusting your price range, brand, category, or search term to discover other verified models.
            </p>
            <button id="reset-filters-btn" class="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition">
              Reset All Filters
            </button>
          </div>
        ` : ''}

      </section>
    `;

    // Populate Grid
    const gridContainer = container.querySelector('#product-grid') as HTMLElement;
    if (gridContainer) {
      products.forEach(product => {
        renderProductCard(gridContainer, {
          product,
          isWishlisted: props.wishlistIds.includes(product.id),
          onUnderstandShoe: props.onUnderstandShoe,
          onAddToCart: props.onAddToCart,
          onToggleWishlist: props.onToggleWishlist
        });
      });
    }

    // Attach filter listeners
    container.querySelectorAll('.brand-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedBrand = (e.currentTarget as HTMLElement).getAttribute('data-brand') || 'all';
        render();
      });
    });

    container.querySelectorAll('.cat-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedCategory = (e.currentTarget as HTMLElement).getAttribute('data-category') || 'all';
        render();
      });
    });

    const priceRangeSelect = container.querySelector('#price-range-select') as HTMLSelectElement | null;
    priceRangeSelect?.addEventListener('change', (e) => {
      selectedPriceRange = (e.target as HTMLSelectElement).value;
      render();
    });

    const sortSelect = container.querySelector('#sort-select') as HTMLSelectElement | null;
    sortSelect?.addEventListener('change', (e) => {
      sortBy = (e.target as HTMLSelectElement).value;
      render();
    });

    container.querySelector('#reset-filters-btn')?.addEventListener('click', () => {
      selectedBrand = 'all';
      selectedCategory = 'all';
      selectedPriceRange = 'all';
      searchQuery = '';
      render();
    });
  }

  // Public method to update search from outside (e.g. navbar)
  (container as any).setSearchQuery = (query: string) => {
    searchQuery = query;
    render();
  };

  render();
}
