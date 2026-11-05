// src/orderItems.js
// Cart item helpers. A cart item is a pizza (no `type` or type 'pizza'),
// a 'beverage', or a 'side'. Every item has `id` and `price` (line total, string).
//
// Beverages/sides are saved in the existing `order_items` columns so no schema
// change is required:  size = 'Beverage' | 'Side', crust = item name,
// sauce = 'Qty N', toppings = [], price = line total.

export const EXTRA_LABELS = { beverage: 'Beverage', side: 'Side' };
export const MAX_EXTRA_QUANTITY = 20;

export const isPizza = (item) => !item.type || item.type === 'pizza';

export const makeExtraItem = (type, name, unitPrice, quantity = 1) => ({
  id: `${type}:${name}`,
  type,
  name,
  unitPrice,
  quantity,
  price: (unitPrice * quantity).toFixed(2),
});

export const setExtraQuantity = (item, quantity) => ({
  ...item,
  quantity,
  price: (item.unitPrice * quantity).toFixed(2),
});

export const cartCountOf = (cart) =>
  cart.reduce((count, item) => count + (isPizza(item) ? 1 : item.quantity), 0);

export function cartItemToRow(item, orderId) {
  if (isPizza(item)) {
    return {
      order_id: orderId,
      size: item.size.label,
      crust: item.crust.label,
      sauce: item.sauce.label,
      toppings: [...(item.selectedMeats || []), ...(item.selectedVeggies || [])].map((t) => t.name),
      price: parseFloat(item.price),
    };
  }
  return {
    order_id: orderId,
    size: EXTRA_LABELS[item.type],
    crust: item.name,
    sauce: `Qty ${item.quantity}`,
    toppings: [],
    price: parseFloat(item.price),
  };
}

export const isExtraRow = (row) => row.size === 'Beverage' || row.size === 'Side';

const quantityOfRow = (row) => parseInt(String(row.sauce || '').replace(/\D/g, ''), 10) || 1;

// Turns a saved order_items row (an extra) back into a cart item.
export function rowToExtraItem(row) {
  const type = row.size === 'Side' ? 'side' : 'beverage';
  const quantity = Math.min(quantityOfRow(row), MAX_EXTRA_QUANTITY);
  const lineTotal = parseFloat(row.price) || 0;
  const unitPrice = lineTotal / quantityOfRow(row);
  return makeExtraItem(type, row.crust, unitPrice, quantity);
}

// Title/detail text for a saved order_items row in the past-orders list.
export function describeOrderRow(row) {
  if (isExtraRow(row)) {
    return { title: `${quantityOfRow(row)} × ${row.crust}`, detail: row.size };
  }
  return {
    title: `${row.size} • ${row.crust}`,
    detail: `Sauce: ${row.sauce}${row.toppings?.length > 0 ? ` | Toppings: ${row.toppings.join(', ')}` : ''}`,
  };
}
