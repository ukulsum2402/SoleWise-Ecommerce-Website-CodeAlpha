import './index.css';
import { renderNavbar } from './components/Navbar';
import { renderHero } from './components/Hero';
import { renderShopSection } from './components/ShopSection';
import { openProductIntelligenceModal } from './components/ProductIntelligenceModal';
import { openDesignLabModal } from './components/DesignLabModal';
import { renderChallengeSection } from './components/ChallengeSection';
import { openCareCenterModal } from './components/CareCenterModal';
import { openCartDrawer } from './components/CartDrawer';
import { openWishlistDrawer } from './components/WishlistDrawer';
import { openCheckoutModal } from './components/CheckoutModal';
import { openOrderHistoryModal } from './components/OrderHistoryModal';
import { openAboutModal } from './components/AboutModal';
import { renderFooter } from './components/Footer';

import { ProductItem } from './data/products';
import { INITIAL_COMMUNITY_SUBMISSIONS, ACTIVE_CHALLENGE, CommunitySubmissionItem } from './data/challenges';
import { subscribeToAuth, getCurrentUser } from './firebase/auth';
import { 
  testConnection, 
  StoredCartItem, 
  StoredOrderItem, 
  fetchUserCart, 
  saveCartItem, 
  removeCartItemFromDb,
  fetchUserWishlist,
  saveWishlistItem,
  removeWishlistItemFromDb,
  fetchUserOrders,
  subscribeToChallengeSubmissions
} from './firebase/firestore';

// Global state
class AppState {
  cart: StoredCartItem[] = [];
  wishlistIds: string[] = ['prod_nike_pegasus40', 'prod_reebok_clubc'];
  orders: StoredOrderItem[] = [];
  submissions: CommunitySubmissionItem[] = [...INITIAL_COMMUNITY_SUBMISSIONS];
  searchQuery: string = '';

  constructor() {
    // Load local cache if available
    const cachedCart = localStorage.getItem('sw_cart');
    if (cachedCart) {
      try { this.cart = JSON.parse(cachedCart); } catch {}
    }
    const cachedWishlist = localStorage.getItem('sw_wishlist');
    if (cachedWishlist) {
      try { this.wishlistIds = JSON.parse(cachedWishlist); } catch {}
    }
    const cachedOrders = localStorage.getItem('sw_orders');
    if (cachedOrders) {
      try { this.orders = JSON.parse(cachedOrders); } catch {}
    }
  }

  saveLocal() {
    localStorage.setItem('sw_cart', JSON.stringify(this.cart));
    localStorage.setItem('sw_wishlist', JSON.stringify(this.wishlistIds));
    localStorage.setItem('sw_orders', JSON.stringify(this.orders));
  }
}

const state = new AppState();

// Toast notification helper
export function showToast(message: string, type: 'success' | 'info' | 'warn' = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `p-3.5 rounded-2xl glass-panel shadow-2xl text-xs flex items-center gap-2.5 transform transition-all duration-300 pointer-events-auto border ${
    type === 'success' ? 'border-emerald-500/40 text-emerald-300 bg-stone-900/90' :
    type === 'warn' ? 'border-amber-500/40 text-amber-300 bg-stone-900/90' :
    'border-orange-500/40 text-stone-200 bg-stone-900/90'
  }`;

  const icon = type === 'success' ? '✓' : type === 'warn' ? '!' : '●';

  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
      type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
      type === 'warn' ? 'bg-amber-500/20 text-amber-400' :
      'bg-orange-500/20 text-orange-400'
    }">
      ${icon}
    </span>
    <span class="flex-1">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Bootstrap Application
async function initApp() {
  const root = document.getElementById('root');
  if (!root) return;

  // Test Firestore connection on boot (Skill mandate)
  testConnection().then(connected => {
    if (connected) {
      console.log('SoleWise connected to Firestore cloud database.');
    }
  });

  // App Layout Containers
  root.innerHTML = `
    <div id="navbar-slot"></div>
    <main id="main-content" class="min-h-screen">
      <div id="hero-slot"></div>
      <div id="shop-slot"></div>
      <div id="challenges-slot"></div>
    </main>
    <div id="footer-slot"></div>
  `;

  const navbarSlot = root.querySelector('#navbar-slot') as HTMLElement;
  const heroSlot = root.querySelector('#hero-slot') as HTMLElement;
  const shopSlot = root.querySelector('#shop-slot') as HTMLElement;
  const challengesSlot = root.querySelector('#challenges-slot') as HTMLElement;
  const footerSlot = root.querySelector('#footer-slot') as HTMLElement;

  // Refresh Navbar UI
  function updateNavbar() {
    renderNavbar(navbarSlot, {
      cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: state.wishlistIds.length,
      onNavigate: (section) => {
        if (section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'shop') {
          document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'care') {
          openCareCenterModal();
        } else if (section === 'design-lab') {
          openDesignLabModal({
            onDesignSubmitted: handleDesignSubmission
          });
        } else if (section === 'challenges') {
          document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      onOpenCart: () => {
        openCartDrawer({
          items: state.cart,
          onUpdateQuantity: (id, qty) => {
            const item = state.cart.find(i => i.id === id);
            if (item) {
              item.quantity = qty;
              state.saveLocal();
              updateNavbar();
            }
          },
          onRemoveItem: (id) => {
            state.cart = state.cart.filter(i => i.id !== id);
            state.saveLocal();
            const user = getCurrentUser();
            if (user) removeCartItemFromDb(id);
            updateNavbar();
            showToast('Item removed from shopping bag', 'info');
          },
          onProceedToCheckout: () => {
            openCheckoutModal({
              cartItems: state.cart,
              onOrderCompleted: (order) => {
                state.orders.unshift(order);
                state.cart = [];
                state.saveLocal();
                updateNavbar();
                showToast(`Order #${order.id} placed successfully!`, 'success');
              }
            });
          },
          onClose: () => {}
        });
      },
      onOpenWishlist: () => {
        openWishlistDrawer({
          wishlistIds: state.wishlistIds,
          onRemoveFromWishlist: (productId) => {
            state.wishlistIds = state.wishlistIds.filter(id => id !== productId);
            state.saveLocal();
            const user = getCurrentUser();
            if (user) removeWishlistItemFromDb(user.uid, productId);
            updateNavbar();
            updateShop();
            showToast('Removed from saved items', 'info');
          },
          onAddToCart: (product) => {
            addToCart(product);
          },
          onUnderstandShoe: (product) => {
            openProductIntelligenceModal(product, (p) => addToCart(p));
          },
          onClose: () => {}
        });
      },
      onOpenOrders: () => {
        openOrderHistoryModal({ orders: state.orders });
      },
      onOpenAbout: () => {
        openAboutModal();
      },
      onSearch: (query) => {
        state.searchQuery = query;
        if ((shopSlot as any).setSearchQuery) {
          (shopSlot as any).setSearchQuery(query);
        }
      }
    });
  }

  // Add to cart helper
  function addToCart(product: ProductItem) {
    const existing = state.cart.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      const newItem: StoredCartItem = {
        id: 'cart_' + Date.now().toString(36),
        userId: getCurrentUser()?.uid || 'guest',
        productId: product.id,
        productName: product.name,
        brandName: product.brandName,
        priceINR: product.priceINR,
        price: product.priceINR,
        currency: 'INR',
        size: product.availableSizes[0] || 'UK 8 / US 9',
        color: product.availableColors[0] || 'Standard',
        quantity: 1,
        imageUrl: product.images[0],
        addedAt: new Date().toISOString()
      };
      state.cart.push(newItem);
      const user = getCurrentUser();
      if (user) saveCartItem(newItem);
    }
    state.saveLocal();
    updateNavbar();
    showToast(`Added ${product.name} to bag!`, 'success');
  }

  // Toggle wishlist helper
  function toggleWishlist(product: ProductItem) {
    const user = getCurrentUser();
    if (state.wishlistIds.includes(product.id)) {
      state.wishlistIds = state.wishlistIds.filter(id => id !== product.id);
      if (user) removeWishlistItemFromDb(user.uid, product.id);
      showToast(`Removed from saved items`, 'info');
    } else {
      state.wishlistIds.push(product.id);
      if (user) saveWishlistItem(user.uid, product.id);
      showToast(`Saved ${product.name} to wishlist`, 'success');
    }
    state.saveLocal();
    updateNavbar();
    updateShop();
  }

  // New design submitted callback
  function handleDesignSubmission(submission: CommunitySubmissionItem) {
    state.submissions.unshift(submission);
    updateChallenges();
    showToast(`Design "${submission.title}" published to weekly challenge!`, 'success');
    document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Vote cast callback
  function handleVote(subId: string) {
    const target = state.submissions.find(s => s.id === subId);
    if (target) {
      target.voteCount += 1;
      updateChallenges();
      showToast(`Vote counted for "${target.title}"!`, 'success');
    }
  }

  // Render Shop
  function updateShop() {
    renderShopSection(shopSlot, {
      onUnderstandShoe: (product) => {
        openProductIntelligenceModal(product, (p) => addToCart(p));
      },
      onAddToCart: (product) => {
        addToCart(product);
      },
      onToggleWishlist: (product) => {
        toggleWishlist(product);
      },
      wishlistIds: state.wishlistIds,
      initialSearchQuery: state.searchQuery
    });
  }

  // Render Challenges
  function updateChallenges() {
    renderChallengeSection(challengesSlot, {
      submissions: state.submissions,
      onOpenDesignLab: () => {
        openDesignLabModal({ onDesignSubmitted: handleDesignSubmission });
      },
      onVoteCast: handleVote
    });
  }

  // Render Hero
  renderHero(heroSlot, {
    onExploreShop: () => {
      document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
    },
    onOpenDesignLab: () => {
      openDesignLabModal({ onDesignSubmitted: handleDesignSubmission });
    },
    onOpenCareCenter: () => {
      openCareCenterModal();
    }
  });

  // Render Footer
  renderFooter(footerSlot, {
    onNavigate: (section) => {
      if (section === 'shop') {
        document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'challenges') {
        document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    onOpenCare: () => openCareCenterModal(),
    onOpenDesignLab: () => openDesignLabModal({ onDesignSubmitted: handleDesignSubmission }),
    onOpenAbout: () => openAboutModal()
  });

  // Initial render calls
  updateNavbar();
  updateShop();
  updateChallenges();

  // Real-time synchronization of Community Challenge Gallery via Firestore onSnapshot
  try {
    subscribeToChallengeSubmissions(ACTIVE_CHALLENGE.id, (cloudSubs) => {
      if (cloudSubs.length > 0) {
        const map = new Map<string, CommunitySubmissionItem>();
        INITIAL_COMMUNITY_SUBMISSIONS.forEach(s => map.set(s.id, s));
        cloudSubs.forEach(s => map.set(s.id, s as CommunitySubmissionItem));
        state.submissions = Array.from(map.values()).sort((a, b) => b.voteCount - a.voteCount);
        updateChallenges();
      }
    });
  } catch (e) {
    console.warn('Real-time challenge sync unavailable, using persistent state:', e);
  }

  // Listen for Firebase Auth changes
  subscribeToAuth(async (user) => {
    updateNavbar();
    if (user) {
      showToast(`Welcome back, ${user.displayName || 'Shopper'}!`, 'info');
      try {
        // Fetch user data from firestore
        const [cloudCart, cloudWishlist, cloudOrders] = await Promise.all([
          fetchUserCart(user.uid),
          fetchUserWishlist(user.uid),
          fetchUserOrders(user.uid)
        ]);

        if (cloudCart.length > 0) state.cart = cloudCart;
        if (cloudWishlist.length > 0) state.wishlistIds = cloudWishlist;
        if (cloudOrders.length > 0) state.orders = cloudOrders;
        
        state.saveLocal();
        updateNavbar();
        updateShop();
      } catch (err) {
        console.warn('Sync from cloud notice:', err);
      }
    }
  });
}

// Start
initApp();
