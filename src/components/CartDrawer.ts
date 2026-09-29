import { StoredCartItem } from '../firebase/firestore';
import { formatINR } from '../utils/currency';

export interface CartDrawerProps {
  items: StoredCartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onClose: () => void;
}

export const FREE_SHIPPING_THRESHOLD_INR = 7999;
export const STANDARD_SHIPPING_FEE_INR = 299;

export function openCartDrawer(props: CartDrawerProps) {
  let drawerOverlay = document.getElementById('cart-drawer-overlay');
  if (drawerOverlay) drawerOverlay.remove();

  drawerOverlay = document.createElement('div');
  drawerOverlay.id = 'cart-drawer-overlay';
  drawerOverlay.className = 'fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn';

  function render() {
    const subtotal = props.items.reduce((sum, item) => sum + ((item.priceINR || item.price || 0) * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_INR || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE_INR;
    const total = subtotal + shipping;

    drawerOverlay!.innerHTML = `
      <div class="relative w-full max-w-md h-full bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
        
        <!-- Drawer Header -->
        <div class="p-5 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <h3 class="font-display font-bold text-lg text-white">Your Shopping Bag</h3>
            <span class="text-xs text-stone-400 font-mono">(${props.items.length})</span>
          </div>

          <button id="close-cart-btn" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Free Shipping Progress for India -->
        <div class="p-3 bg-stone-950 border-b border-stone-850 text-xs text-stone-300 shrink-0">
          ${subtotal >= FREE_SHIPPING_THRESHOLD_INR ? `
            <div class="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span>✓ You qualify for Free Express Delivery across India</span>
            </div>
          ` : `
            <div class="flex items-center justify-between text-stone-400">
              <span>Add ${formatINR(FREE_SHIPPING_THRESHOLD_INR - subtotal)} more for Free Express Delivery</span>
              <span class="font-mono text-[11px]">${Math.round((subtotal / FREE_SHIPPING_THRESHOLD_INR) * 100)}%</span>
            </div>
            <div class="w-full h-1.5 bg-stone-800 rounded-full mt-1.5 overflow-hidden">
              <div class="h-full bg-orange-500 rounded-full transition-all" style="width: ${Math.min((subtotal / FREE_SHIPPING_THRESHOLD_INR) * 100, 100)}%"></div>
            </div>
          `}
        </div>

        <!-- Cart Items List -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          ${props.items.length === 0 ? `
            <div class="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div class="w-16 h-16 rounded-2xl bg-stone-800/60 flex items-center justify-center text-stone-500">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h4 class="font-display font-bold text-white text-base">Your bag is empty</h4>
              <p class="text-xs text-stone-400 max-w-xs">
                Browse our verified shoe catalog to inspect real materials and add footwear to your bag.
              </p>
            </div>
          ` : `
            ${props.items.map(item => {
              const itemPrice = item.priceINR || item.price || 0;
              return `
              <div class="flex items-start gap-3 p-3 rounded-2xl bg-stone-950/70 border border-stone-850">
                <img src="${item.imageUrl}" alt="${item.productName}" class="w-16 h-16 rounded-xl object-cover bg-stone-900 shrink-0" />
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-1">
                    <div>
                      <span class="text-[10px] font-mono text-stone-400 uppercase">${item.brandName}</span>
                      <h5 class="font-display font-bold text-xs text-white truncate">${item.productName}</h5>
                    </div>
                    <span class="font-display font-bold text-xs text-white shrink-0">${formatINR(itemPrice * item.quantity)}</span>
                  </div>

                  <div class="text-[11px] text-stone-400 mt-1 flex items-center gap-2 font-mono">
                    <span>Size: ${item.size}</span>
                    <span>•</span>
                    <span class="truncate">${item.color}</span>
                  </div>

                  <!-- Quantity Controls & Remove -->
                  <div class="flex items-center justify-between mt-3 pt-2 border-t border-stone-850">
                    <div class="flex items-center gap-2 bg-stone-900 rounded-lg border border-stone-800 p-0.5">
                      <button data-qty-dec="${item.id}" class="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white text-xs">-</button>
                      <span class="text-xs font-mono font-bold text-white px-1">${item.quantity}</span>
                      <button data-qty-inc="${item.id}" class="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white text-xs">+</button>
                    </div>

                    <button data-remove-id="${item.id}" class="text-[11px] text-rose-400 hover:text-rose-300 transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            `;
            }).join('')}
          `}
        </div>

        <!-- Checkout Summary (Footer) -->
        ${props.items.length > 0 ? `
          <div class="p-5 border-t border-stone-800 bg-stone-950/80 space-y-3 shrink-0">
            <div class="space-y-1.5 text-xs text-stone-300">
              <div class="flex justify-between">
                <span>Subtotal (Inclusive of GST)</span>
                <span class="font-mono text-white">${formatINR(subtotal)}</span>
              </div>
              <div class="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span class="font-mono text-white">${shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-stone-850 text-sm font-bold text-white">
                <span>Total Amount (INR)</span>
                <span class="font-display text-orange-400 font-extrabold text-base">${formatINR(total)}</span>
              </div>
            </div>

            <button id="checkout-btn" class="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition flex items-center justify-center gap-2">
              <span>Proceed to Checkout • ${formatINR(total)}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        ` : ''}

      </div>
    `;

    // Listeners
    drawerOverlay!.querySelector('#close-cart-btn')?.addEventListener('click', () => {
      drawerOverlay!.remove();
      props.onClose();
    });

    drawerOverlay!.querySelectorAll('[data-qty-dec]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-qty-dec')!;
        const currentItem = props.items.find(i => i.id === id);
        if (currentItem) {
          if (currentItem.quantity > 1) {
            props.onUpdateQuantity(id, currentItem.quantity - 1);
          } else {
            props.onRemoveItem(id);
          }
          render();
        }
      });
    });

    drawerOverlay!.querySelectorAll('[data-qty-inc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-qty-inc')!;
        const currentItem = props.items.find(i => i.id === id);
        if (currentItem) {
          props.onUpdateQuantity(id, currentItem.quantity + 1);
          render();
        }
      });
    });

    drawerOverlay!.querySelectorAll('[data-remove-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-remove-id')!;
        props.onRemoveItem(id);
        render();
      });
    });

    drawerOverlay!.querySelector('#checkout-btn')?.addEventListener('click', () => {
      drawerOverlay!.remove();
      props.onProceedToCheckout();
    });
  }

  render();
  document.body.appendChild(drawerOverlay);
}
