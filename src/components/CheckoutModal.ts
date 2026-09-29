import { StoredCartItem, StoredOrderItem, placeOrderInDb } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';
import { formatINR } from '../utils/currency';
import { FREE_SHIPPING_THRESHOLD_INR, STANDARD_SHIPPING_FEE_INR } from './CartDrawer';

export interface CheckoutModalProps {
  cartItems: StoredCartItem[];
  onOrderCompleted: (order: StoredOrderItem) => void;
}

const INDIAN_STATES = [
  'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana',
  'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Kerala', 'Rajasthan',
  'Haryana', 'Punjab', 'Madhya Pradesh', 'Bihar', 'Odisha',
  'Andhra Pradesh', 'Assam', 'Goa', 'Uttarakhand', 'Jharkhand'
];

export function openCheckoutModal(props: CheckoutModalProps) {
  const user = getCurrentUser();
  const subtotal = props.cartItems.reduce((acc, item) => acc + ((item.priceINR || item.price || 0) * item.quantity), 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_INR || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE_INR;
  const total = subtotal + shipping;

  let selectedPaymentMethod = 'upi';
  let isSubmitting = false;
  let orderCompleted = false;
  let confirmedOrder: StoredOrderItem | null = null;

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'checkout-modal-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';

  function render() {
    if (orderCompleted && confirmedOrder) {
      modalOverlay.innerHTML = `
        <div class="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl text-center space-y-5 my-auto">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <div>
            <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Order Confirmed • India Express
            </span>
            <h3 class="font-display font-bold text-2xl text-white mt-1">
              Thank You for Your Order!
            </h3>
            <p class="text-xs text-stone-400 mt-2">
              Your SoleWise footwear is booked. Dispatching via BlueDart / Delhivery Express with our material-care passport.
            </p>
          </div>

          <!-- Order Credentials Box -->
          <div class="p-5 rounded-2xl bg-stone-950 border border-stone-850 text-left space-y-2.5 text-xs">
            <div class="flex justify-between">
              <span class="text-stone-400">Order Reference:</span>
              <span class="font-mono font-bold text-white">${confirmedOrder.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-400">Courier Tracking Code:</span>
              <span class="font-mono text-orange-400 font-bold">${confirmedOrder.trackingNumber}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-400">Total Billed (INR):</span>
              <span class="font-bold text-white text-sm">${formatINR(confirmedOrder.totalAmountINR || confirmedOrder.totalAmount || 0)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-400">Payment Mode:</span>
              <span class="font-mono text-stone-200">Demo Instant Checkout</span>
            </div>
            <div class="flex justify-between pt-1 border-t border-stone-850">
              <span class="text-stone-400">Delivery Address:</span>
              <span class="text-stone-300 truncate max-w-[220px]">${confirmedOrder.shippingAddress}</span>
            </div>
          </div>

          <button id="close-confirmed-btn" class="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-600/30">
            Continue Exploring SoleWise
          </button>
        </div>
      `;

      modalOverlay.querySelector('#close-confirmed-btn')?.addEventListener('click', () => {
        modalOverlay.remove();
      });
      return;
    }

    modalOverlay.innerHTML = `
      <div class="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold uppercase">
              Secure Demo Checkout • India (₹ INR)
            </span>
            <h3 class="font-display font-bold text-lg text-white">Review & Place Order</h3>
          </div>

          <button id="close-checkout-btn" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <div class="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-300">
          
          <!-- Shipping Address Details for India -->
          <div class="space-y-3">
            <h4 class="font-display font-bold text-sm text-white flex items-center gap-1.5">
              <span>1. Delivery Destination (India)</span>
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">Full Name</label>
                <input id="chk-name" type="text" value="${user?.displayName || 'Aarav Sharma'}" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">Mobile Number (+91)</label>
                <input id="chk-phone" type="tel" value="9876543210" placeholder="10-digit mobile number" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">Email Address</label>
                <input id="chk-email" type="email" value="${user?.email || 'aarav.sharma@example.in'}" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">Flat, House No., Building</label>
                <input id="chk-flat" type="text" value="Flat 402, Nilgiri Heights" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono text-stone-400 mb-1">Street Address & Landmark</label>
              <input id="chk-address" type="text" value="12th Main Road, Indiranagar, Near BDA Complex" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">City</label>
                <input id="chk-city" type="text" value="Bengaluru" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">State</label>
                <select id="chk-state" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500">
                  ${INDIAN_STATES.map(st => `
                    <option value="${st}" ${st === 'Karnataka' ? 'selected' : ''}>${st}</option>
                  `).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-mono text-stone-400 mb-1">PIN Code (6 digits)</label>
                <input id="chk-pin" type="text" value="560038" maxlength="6" class="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 px-3 text-stone-200 focus:outline-none focus:border-orange-500" required />
              </div>
            </div>
          </div>

          <!-- Payment Simulation for India -->
          <div class="space-y-3 pt-4 border-t border-stone-800">
            <div class="flex items-center justify-between">
              <h4 class="font-display font-bold text-sm text-white">
                2. Payment Method (Demo Simulation)
              </h4>
              <span class="text-[10px] text-amber-400 font-mono">Demo Mode • No Real Charges</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label class="p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedPaymentMethod === 'upi' ? 'bg-orange-500/10 border-orange-500' : 'bg-stone-950 border-stone-800 hover:border-stone-700'}">
                <div class="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="upi" ${selectedPaymentMethod === 'upi' ? 'checked' : ''} class="text-orange-600 focus:ring-0" />
                  <div>
                    <span class="font-bold text-white text-xs block">UPI (GPay / PhonePe / Paytm)</span>
                    <span class="text-[10px] text-stone-400">Instant Demo QR / VPA</span>
                  </div>
                </div>
                <span class="text-xs">⚡</span>
              </label>

              <label class="p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedPaymentMethod === 'card' ? 'bg-orange-500/10 border-orange-500' : 'bg-stone-950 border-stone-800 hover:border-stone-700'}">
                <div class="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="card" ${selectedPaymentMethod === 'card' ? 'checked' : ''} class="text-orange-600 focus:ring-0" />
                  <div>
                    <span class="font-bold text-white text-xs block">Cards (RuPay / Visa / MC)</span>
                    <span class="text-[10px] text-stone-400">Credit or Debit Card</span>
                  </div>
                </div>
                <span class="text-xs">💳</span>
              </label>

              <label class="p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedPaymentMethod === 'netbanking' ? 'bg-orange-500/10 border-orange-500' : 'bg-stone-950 border-stone-800 hover:border-stone-700'}">
                <div class="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="netbanking" ${selectedPaymentMethod === 'netbanking' ? 'checked' : ''} class="text-orange-600 focus:ring-0" />
                  <div>
                    <span class="font-bold text-white text-xs block">NetBanking (HDFC / SBI / ICICI)</span>
                    <span class="text-[10px] text-stone-400">All major Indian banks</span>
                  </div>
                </div>
                <span class="text-xs">🏦</span>
              </label>

              <label class="p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedPaymentMethod === 'cod' ? 'bg-orange-500/10 border-orange-500' : 'bg-stone-950 border-stone-800 hover:border-stone-700'}">
                <div class="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="cod" ${selectedPaymentMethod === 'cod' ? 'checked' : ''} class="text-orange-600 focus:ring-0" />
                  <div>
                    <span class="font-bold text-white text-xs block">Cash on Delivery (COD Demo)</span>
                    <span class="text-[10px] text-stone-400">Pay upon courier delivery</span>
                  </div>
                </div>
                <span class="text-xs">💵</span>
              </label>
            </div>
          </div>

          <!-- Order Summary Breakdown -->
          <div class="space-y-2 pt-4 border-t border-stone-800">
            <h4 class="font-display font-bold text-sm text-white mb-2">Order Items (${props.cartItems.length})</h4>
            
            <div class="max-h-36 overflow-y-auto space-y-2 pr-1">
              ${props.cartItems.map(item => {
                const itemPrice = item.priceINR || item.price || 0;
                return `
                  <div class="flex items-center justify-between text-xs py-1 border-b border-stone-850">
                    <span class="truncate max-w-[280px]">${item.productName} (${item.size}) x${item.quantity}</span>
                    <span class="font-mono text-white font-semibold">${formatINR(itemPrice * item.quantity)}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="pt-2 text-xs space-y-1">
              <div class="flex justify-between text-stone-400">
                <span>Subtotal (Inclusive of all taxes):</span>
                <span class="font-mono text-white">${formatINR(subtotal)}</span>
              </div>
              <div class="flex justify-between text-stone-400">
                <span>Express Delivery across India:</span>
                <span class="font-mono text-white">${shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-850">
                <span>Grand Total (INR):</span>
                <span class="text-orange-400 font-display text-base">${formatINR(total)}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Place Order Button -->
        <div class="p-5 border-t border-stone-800 bg-stone-950/80 shrink-0">
          <button id="confirm-order-btn" class="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}">
            ${isSubmitting ? 'Generating Verification & Dispatch...' : `Confirm & Place Order (${formatINR(total)})`}
          </button>
        </div>

      </div>
    `;

    modalOverlay.querySelector('#close-checkout-btn')?.addEventListener('click', () => modalOverlay.remove());

    modalOverlay.querySelectorAll('input[name="payment"]').forEach(input => {
      input.addEventListener('change', (e) => {
        selectedPaymentMethod = (e.target as HTMLInputElement).value;
        render();
      });
    });

    modalOverlay.querySelector('#confirm-order-btn')?.addEventListener('click', async () => {
      if (isSubmitting) return;
      isSubmitting = true;
      render();

      const nameInput = modalOverlay.querySelector('#chk-name') as HTMLInputElement | null;
      const phoneInput = modalOverlay.querySelector('#chk-phone') as HTMLInputElement | null;
      const emailInput = modalOverlay.querySelector('#chk-email') as HTMLInputElement | null;
      const flatInput = modalOverlay.querySelector('#chk-flat') as HTMLInputElement | null;
      const addressInput = modalOverlay.querySelector('#chk-address') as HTMLInputElement | null;
      const cityInput = modalOverlay.querySelector('#chk-city') as HTMLInputElement | null;
      const stateSelect = modalOverlay.querySelector('#chk-state') as HTMLSelectElement | null;
      const pinInput = modalOverlay.querySelector('#chk-pin') as HTMLInputElement | null;

      const fullAddress = `${flatInput?.value || ''}, ${addressInput?.value || ''}, ${cityInput?.value || 'Bengaluru'}, ${stateSelect?.value || 'Karnataka'} - ${pinInput?.value || '560038'}`;

      const order: StoredOrderItem = {
        id: 'SW-IN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        userId: user?.uid || 'guest_' + Date.now(),
        items: props.cartItems.map(c => {
          const itemPrice = c.priceINR || c.price || 0;
          return {
            productId: c.productId,
            productName: c.productName,
            brandName: c.brandName,
            priceINR: itemPrice,
            price: itemPrice,
            size: c.size,
            color: c.color,
            quantity: c.quantity,
            imageUrl: c.imageUrl
          };
        }),
        totalAmountINR: total,
        totalAmount: total,
        currency: 'INR',
        status: 'Order Confirmed',
        recipientName: nameInput?.value || 'Aarav Sharma',
        shippingAddress: fullAddress,
        phoneNumber: phoneInput?.value || '+91 9876543210',
        trackingNumber: 'DEL-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: new Date().toISOString()
      };

      try {
        await placeOrderInDb(order);
      } catch (err) {
        console.warn('Saved local order:', err);
      }

      props.onOrderCompleted(order);
      confirmedOrder = order;
      orderCompleted = true;
      isSubmitting = false;
      render();
    });
  }

  render();
  document.body.appendChild(modalOverlay);
}
