import { getCurrentUser, signInWithGoogle, signOutUser } from '../firebase/auth';

export interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenAbout: () => void;
  onSearch: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
}

export function renderNavbar(container: HTMLElement, props: NavbarProps) {
  const user = getCurrentUser();

  container.innerHTML = `
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-stone-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-8">
            <button id="nav-brand-logo" class="flex items-center gap-2.5 text-left group focus:outline-none">
              <div class="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-display font-extrabold text-white text-xl shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
                SW
              </div>
              <div>
                <span class="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                  SoleWise
                  <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                </span>
                <span class="block text-[10px] tracking-widest text-stone-400 uppercase font-mono">Product Intelligence</span>
              </div>
            </button>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-1 text-sm font-medium">
              <button data-nav="shop" class="nav-btn px-4 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/60 transition">
                Shop Catalog
              </button>
              <button data-nav="care" class="nav-btn px-4 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/60 transition flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Care Center
              </button>
              <button data-nav="design-lab" class="nav-btn px-4 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/60 transition flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Design Lab
              </button>
              <button data-nav="challenges" class="nav-btn px-4 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/60 transition flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Weekly Challenge
              </button>
              <button id="nav-about-btn" class="px-4 py-2 rounded-lg text-stone-400 hover:text-stone-200 transition">
                Architecture & About
              </button>
            </nav>
          </div>

          <!-- Search Bar (Desktop) -->
          <div class="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div class="relative w-full">
              <input 
                id="nav-search-input"
                type="text" 
                placeholder="Search shoes, brands, tech..." 
                class="w-full bg-stone-900/90 border border-stone-800 rounded-full py-2 pl-9 pr-4 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
              <svg class="w-4 h-4 text-stone-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Action Items (Right) -->
          <div class="flex items-center gap-3">
            
            <!-- Wishlist Button -->
            <button id="nav-wishlist-btn" class="relative p-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition" title="Wishlist">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              ${props.wishlistCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  ${props.wishlistCount}
                </span>
              ` : ''}
            </button>

            <!-- Cart Button -->
            <button id="nav-cart-btn" class="relative p-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition" title="Shopping Bag">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              ${props.cartCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  ${props.cartCount}
                </span>
              ` : ''}
            </button>

            <!-- Authentication User Profile / Login -->
            ${user ? `
              <div class="relative group">
                <button id="nav-user-menu-btn" class="flex items-center gap-2 p-1.5 rounded-full bg-stone-900 border border-stone-750 hover:border-orange-500 transition focus:outline-none">
                  ${user.photoURL ? `
                    <img src="${user.photoURL}" alt="${user.displayName || 'User'}" class="w-8 h-8 rounded-full object-cover" />
                  ` : `
                    <div class="w-8 h-8 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                      ${(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  `}
                </button>
                <div class="hidden group-hover:block absolute right-0 mt-2 w-56 glass-dropdown rounded-2xl p-2 shadow-2xl z-50 text-xs">
                  <div class="p-3 border-b border-stone-800 mb-1">
                    <p class="font-bold text-white truncate">${user.displayName || 'SoleWise Member'}</p>
                    <p class="text-stone-400 text-[11px] truncate">${user.email}</p>
                  </div>
                  <button id="nav-orders-btn" class="w-full text-left px-3 py-2 rounded-xl text-stone-200 hover:bg-stone-800/80 transition flex items-center gap-2">
                    <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    My Past Orders
                  </button>
                  <button id="nav-signout-btn" class="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition flex items-center gap-2">
                    <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            ` : `
              <button id="nav-login-btn" class="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow-lg shadow-orange-600/25 transition flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign In
              </button>
            `}

            <!-- Mobile Menu Toggle Button -->
            <button id="nav-mobile-toggle" class="md:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

        </div>

        <!-- Mobile Navigation Menu (Hidden by default) -->
        <div id="nav-mobile-menu" class="hidden md:hidden py-4 border-t border-stone-800 space-y-2">
          <input 
            id="nav-mobile-search-input"
            type="text" 
            placeholder="Search shoes, brands, tech..." 
            class="w-full bg-stone-900 border border-stone-800 rounded-xl py-2 px-4 text-xs text-stone-200 placeholder-stone-500 mb-3"
          />
          <button data-nav="shop" class="w-full text-left px-3 py-2 rounded-lg text-stone-300 hover:bg-stone-800">Shop Catalog</button>
          <button data-nav="care" class="w-full text-left px-3 py-2 rounded-lg text-stone-300 hover:bg-stone-800">Shoe Care Center</button>
          <button data-nav="design-lab" class="w-full text-left px-3 py-2 rounded-lg text-stone-300 hover:bg-stone-800">Shoe Design Lab</button>
          <button data-nav="challenges" class="w-full text-left px-3 py-2 rounded-lg text-stone-300 hover:bg-stone-800">Weekly Design Challenge</button>
          <button id="nav-mobile-about" class="w-full text-left px-3 py-2 rounded-lg text-stone-400 hover:bg-stone-800">Architecture & Methodology</button>
        </div>

      </div>
    </header>
  `;

  // Attach event listeners
  container.querySelector('#nav-brand-logo')?.addEventListener('click', () => props.onNavigate('home'));
  
  container.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget as HTMLElement).getAttribute('data-nav') || 'home';
      props.onNavigate(target);
      container.querySelector('#nav-mobile-menu')?.classList.add('hidden');
    });
  });

  container.querySelector('#nav-about-btn')?.addEventListener('click', props.onOpenAbout);
  container.querySelector('#nav-mobile-about')?.addEventListener('click', () => {
    props.onOpenAbout();
    container.querySelector('#nav-mobile-menu')?.classList.add('hidden');
  });

  container.querySelector('#nav-wishlist-btn')?.addEventListener('click', props.onOpenWishlist);
  container.querySelector('#nav-cart-btn')?.addEventListener('click', props.onOpenCart);
  container.querySelector('#nav-orders-btn')?.addEventListener('click', props.onOpenOrders);

  // Search input listeners
  const searchDesktop = container.querySelector('#nav-search-input') as HTMLInputElement | null;
  searchDesktop?.addEventListener('input', (e) => {
    props.onSearch((e.target as HTMLInputElement).value);
  });

  const searchMobile = container.querySelector('#nav-mobile-search-input') as HTMLInputElement | null;
  searchMobile?.addEventListener('input', (e) => {
    props.onSearch((e.target as HTMLInputElement).value);
  });

  // Mobile menu toggle
  container.querySelector('#nav-mobile-toggle')?.addEventListener('click', () => {
    container.querySelector('#nav-mobile-menu')?.classList.toggle('hidden');
  });

  // Auth actions
  container.querySelector('#nav-login-btn')?.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
    }
  });

  container.querySelector('#nav-signout-btn')?.addEventListener('click', async () => {
    await signOutUser();
  });
}
