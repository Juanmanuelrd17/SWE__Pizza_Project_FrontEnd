// src/DrinksSidesPage.jsx
// Beverages and sides selection page (FR-06).
import { useState } from 'react';
import { MenuItemImage } from './MenuIcon';
import { makeExtraItem } from './orderItems';

export default function DrinksSidesPage({
  menu,
  cart,
  onAddExtra,
  onChangeExtraQuantity,
  onBackToBuilder,
  onProceedToReview,
}) {
  const [activeTab, setActiveTab] = useState('all');

  const beverages = menu.beverages || [];
  const sides = menu.sides || [];
  const allItems = [
    ...beverages.map((b) => ({ ...b, itemType: 'beverage' })),
    ...sides.map((s) => ({ ...s, itemType: 'side' })),
  ];

  const visibleItems =
    activeTab === 'beverage'
      ? beverages.map((b) => ({ ...b, itemType: 'beverage' }))
      : activeTab === 'side'
      ? sides.map((s) => ({ ...s, itemType: 'side' }))
      : allItems;

  const quantityFor = (type, name) => {
    const id = `${type}:${name}`;
    const found = cart.find((c) => c.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="bg-stone-900/85 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200/80">Step 03</span>
          <h2 className="text-2xl font-serif uppercase tracking-wider text-stone-100 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-200 text-stone-950 text-xs font-bold font-mono">
              3
            </span>
            Beverages &amp; Sides
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Complete your meal with fresh hearth-fired sides and ice-cold craft beverages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToBuilder}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-stone-100 border border-stone-800 hover:border-stone-600 rounded-xl px-3.5 py-2 transition-all cursor-pointer"
          >
            ← Back to Pizza
          </button>
          <button
            type="button"
            onClick={onProceedToReview}
            disabled={cart.length === 0}
            className="text-xs uppercase tracking-wider font-bold text-stone-950 bg-amber-200 hover:bg-amber-100 disabled:opacity-40 rounded-xl px-4 py-2 transition-all cursor-pointer shadow-md"
          >
            Review &amp; Pay →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-800/80 pb-3">
        {[
          { id: 'all', label: `All Items (${allItems.length})` },
          { id: 'beverage', label: `Beverages (${beverages.length})` },
          { id: 'side', label: `Sides (${sides.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-200 text-stone-950 shadow-md font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleItems.map((item) => {
          const qty = quantityFor(item.itemType, item.name);
          const itemId = `${item.itemType}:${item.name}`;
          return (
            <div
              key={itemId}
              className="rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                <MenuItemImage item={item} type={item.itemType} />
                <div className="p-4 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-stone-100 text-sm">{item.name}</h3>
                    <span className="font-mono text-amber-200 font-bold text-xs shrink-0">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-stone-400 font-light">{item.description}</p>
                  )}
                </div>
              </div>
              <div className="p-4 pt-0">
                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => onAddExtra(makeExtraItem(item.itemType, item.name, item.price, 1))}
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-amber-200 hover:text-stone-950 text-amber-200 border border-amber-200/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Add to Order
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-stone-900 border border-amber-200/40 rounded-xl px-2 py-1">
                    <button
                      type="button"
                      onClick={() => onChangeExtraQuantity(itemId, -1)}
                      className="w-8 h-8 rounded-lg bg-stone-800 text-amber-200 text-base font-bold flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-mono text-xs font-bold text-stone-100">{qty} in cart</span>
                    <button
                      type="button"
                      onClick={() => onChangeExtraQuantity(itemId, +1)}
                      className="w-8 h-8 rounded-lg bg-amber-200 text-stone-950 text-base font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToBuilder}
          className="text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 cursor-pointer"
        >
          ← Customize another pizza
        </button>
        <button
          type="button"
          onClick={onProceedToReview}
          disabled={cart.length === 0}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-200 hover:bg-amber-100 disabled:opacity-40 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-200/10"
        >
          Proceed to Review &amp; Pay →
        </button>
      </div>
    </div>
  );
}
