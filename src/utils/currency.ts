/**
 * Indian Rupee (INR / ₹) Currency Utility
 * Handles Indian number formatting (e.g. ₹4,999, ₹12,999, ₹1,25,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Formats original price with strikethrough and discount percentage badge
 */
export function calculateDiscount(priceINR: number, originalPriceINR?: number): number {
  if (!originalPriceINR || originalPriceINR <= priceINR) return 0;
  return Math.round(((originalPriceINR - priceINR) / originalPriceINR) * 100);
}
