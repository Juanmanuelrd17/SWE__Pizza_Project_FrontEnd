// src/useMenu.js
// Loads the live menu from Supabase `menu_items` and falls back to the static
// menuData.js lists for any category that has no rows (FR-12).
import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import {
  SIZES,
  CRUSTS,
  VEGGIE_OPTIONS,
  MEAT_OPTIONS,
  BEVERAGE_OPTIONS,
  SIDE_OPTIONS,
} from './menuData';

export const STATIC_MENU = {
  sizes: SIZES,
  crusts: CRUSTS,
  veggies: VEGGIE_OPTIONS,
  meats: MEAT_OPTIONS,
  beverages: BEVERAGE_OPTIONS,
  sides: SIDE_OPTIONS,
  source: 'static',
};

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export function buildMenu(rows) {
  // If a category has rows at all, the database is the source of truth for it
  // (items flagged unavailable are hidden). Empty categories use the static fallback.
  const section = (categories, mapRow, fallback) => {
    const all = rows.filter((r) => categories.includes(r.category));
    if (all.length === 0) return fallback;
    return all.filter((r) => r.available !== false).map(mapRow);
  };

  return {
    sizes: section(
      ['size'],
      (r) => ({ id: r.id, label: r.name, price: toNumber(r.price), description: r.description || '' }),
      SIZES
    ).sort((a, b) => a.price - b.price),
    crusts: section(
      ['crust'],
      (r) => ({ id: r.id, label: r.name, tag: r.description || 'Signature' }),
      CRUSTS
    ),
    veggies: section(
      ['veggie', 'vegetable'],
      (r) => ({ id: r.id, name: r.name, price: toNumber(r.price) }),
      VEGGIE_OPTIONS
    ),
    meats: section(
      ['meat'],
      (r) => ({ id: r.id, name: r.name, price: toNumber(r.price) }),
      MEAT_OPTIONS
    ),
    beverages: section(
      ['beverage'],
      (r) => ({
        id: r.id,
        name: r.name,
        price: toNumber(r.price),
        description: r.description || '',
        image_url: r.image_url || null,
      }),
      BEVERAGE_OPTIONS
    ),
    sides: section(
      ['side'],
      (r) => ({
        id: r.id,
        name: r.name,
        price: toNumber(r.price),
        description: r.description || '',
        image_url: r.image_url || null,
      }),
      SIDE_OPTIONS
    ),
    source: 'db',
  };
}

export default function useMenu() {
  const [menu, setMenu] = useState(STATIC_MENU);

  const reload = useCallback(async () => {
    const { data, error } = await supabase.from('menu_items').select('*');
    if (error) {
      console.warn('Could not load menu_items from DB, using fallback menuData:', error.message);
      return;
    }
    setMenu(data && data.length > 0 ? buildMenu(data) : STATIC_MENU);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { menu, reload };
}
