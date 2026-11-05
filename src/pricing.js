// src/pricing.js
// Single source of truth for tax, delivery fee, and order totals (FR-08).
export const TAX_RATE = 0.08;
export const DELIVERY_FEE = 3.99;

export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

export function calcTotals({ subtotal, orderType, tipPercent, customTip }) {
  const sub = round2(subtotal || 0);
  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;
  const tax = round2(sub * TAX_RATE);
  const tip =
    tipPercent === 'custom'
      ? round2(Math.max(0, parseFloat(customTip) || 0))
      : round2((sub * (Number(tipPercent) || 0)) / 100);
  const total = round2(sub + deliveryFee + tax + tip);
  return { subtotal: sub, deliveryFee, tax, tip, total };
}
