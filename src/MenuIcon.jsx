// src/MenuIcon.jsx
// Consistent vector icons (lucide-react) and a fixed-ratio image box for menu items,
// so pictures are never stretched: photos use object-cover inside a 4:3 box.
import { useState } from 'react';
import {
  Pizza,
  Wheat,
  Leaf,
  Drumstick,
  CupSoda,
  GlassWater,
  Coffee,
  Salad,
  Sandwich,
} from 'lucide-react';

const ICONS = {
  pizza: Pizza,
  crust: Wheat,
  veggie: Leaf,
  meat: Drumstick,
  soda: CupSoda,
  water: GlassWater,
  coffee: Coffee,
  salad: Salad,
  bread: Sandwich,
  wings: Drumstick,
};

export default function MenuIcon({ kind = 'pizza', className = 'w-6 h-6' }) {
  const Icon = ICONS[kind] || Pizza;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}

export function iconForItem(item, type) {
  if (item.icon) return item.icon;
  const name = item.name || '';
  if (type === 'side') {
    if (/wing|chicken/i.test(name)) return 'wings';
    if (/salad/i.test(name)) return 'salad';
    return 'bread';
  }
  if (/water/i.test(name)) return 'water';
  if (/tea|coffee|lemonade/i.test(name)) return 'coffee';
  return 'soda';
}

export function MenuItemImage({ item, type }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = item.image_url && !failed;

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
      {showPhoto ? (
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <MenuIcon kind={iconForItem(item, type)} className="w-12 h-12 text-amber-200/80" />
      )}
    </div>
  );
}
