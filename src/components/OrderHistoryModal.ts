import { StoredOrderItem } from '../firebase/firestore';
import { formatINR } from '../utils/currency';

export interface OrderHistoryModalProps {
  orders: StoredOrderItem[];
}

export function openOrderHistoryModal(props: OrderHistoryModalProps) {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'orders-modal-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';

  modalOverlay.innerHTML = `
    <div class="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
        <div>
          <span class="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">Customer Ledger</span>
          <h3 class="font-display font-bold text-lg text-white">Your Order History</h3>
        </div>

        <button id="close-orders-btn" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Orders List -->
      <div class="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
        ${props.orders.length === 0 ? `
          <div class="text-center py-12 text-stone-400 space-y-2">
            <p class="font-display font-bold text-base text-stone-300">No previous orders found</p>
            <p class="text-xs">Your completed orders and tracking numbers will be archived here.</p>
          </div>
        ` : `
          ${props.orders.map(order => `
            <div class="p-4 rounded-2xl bg-stone-950 border border-stone-850 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-850">
                <div>
                  <span class="font-mono font-bold text-white text-sm">${order.id}</span>
                  <span class="text-stone-400 text-[11px] block">${new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="text-right">
                  <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                    ${order.status}
                  </span>
                  <span class="block text-stone-400 text-[10px] font-mono mt-0.5">Tracking: ${order.trackingNumber}</span>
                </div>
              </div>

              <!-- Items in order -->
              <div class="space-y-1.5">
                ${order.items.map(item => `
                  <div class="flex items-center justify-between text-stone-300">
                    <span class="truncate max-w-[280px]">${item.productName} (${item.size}) x${item.quantity}</span>
                    <span class="font-mono text-white font-bold">${formatINR((item.priceINR || item.price || 0) * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>

              <div class="pt-2 border-t border-stone-850 flex items-center justify-between text-stone-400 text-[11px]">
                <span>Delivering to: ${order.shippingAddress}</span>
                <span class="font-display font-bold text-orange-400 text-sm">Total: ${formatINR(order.totalAmountINR || order.totalAmount || 0)}</span>
              </div>
            </div>
          `).join('')}
        `}
      </div>

    </div>
  `;

  modalOverlay.querySelector('#close-orders-btn')?.addEventListener('click', () => modalOverlay.remove());
  document.body.appendChild(modalOverlay);
}
