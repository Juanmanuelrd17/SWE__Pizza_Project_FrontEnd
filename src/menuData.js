// src/menuData.js
export const SIZES = [
  { id: 'small', label: 'Small (10")', price: 10.99, description: 'Personal 6-slice pie' },
  { id: 'medium', label: 'Medium (12")', price: 13.99, description: 'Great for 2 people (8 slices)' },
  { id: 'large', label: 'Large (14")', price: 16.99, description: 'Family favorite (8 large slices)' },
  { id: 'xlarge', label: 'X-Large (16")', price: 19.99, description: 'Party size (12 slices)' },
];

export const CRUSTS = [
  { id: 'hand-tossed', label: 'Classic Hand-Tossed', tag: 'Traditional' },
  { id: 'thin-crispy', label: 'Thin & Crispy', tag: 'Extra Crunch' },
  { id: 'stone-thick', label: 'Stone-Baked Thick', tag: 'Chewy & Airy' },
  { id: 'garlic-parm', label: 'Garlic Butter Herb', tag: 'House Special' },
];

export const SAUCE_LEVELS = [
  { id: 'light', label: 'Light Sauce' },
  { id: 'normal', label: 'Normal Sauce' },
  { id: 'extra', label: 'Extra Sauce' },
];

export const VEGGIE_OPTIONS = [
  { id: 'mushrooms', name: 'Fresh Mushrooms', price: 1.25 },
  { id: 'red-onions', name: 'Caramelized Red Onion', price: 1.00 },
  { id: 'bell-peppers', name: 'Green Bell Peppers', price: 1.00 },
  { id: 'black-olives', name: 'Kalamata Black Olives', price: 1.25 },
  { id: 'spinach', name: 'Baby Spinach', price: 1.25 },
  { id: 'roma-tomatoes', name: 'Sliced Roma Tomatoes', price: 1.25 },
];

export const MEAT_OPTIONS = [
  { id: 'pepperoni', name: 'Artisan Pepperoni', price: 1.75 },
  { id: 'italian-sausage', name: 'Spicy Italian Sausage', price: 1.75 },
  { id: 'bacon', name: 'Smoked Crispy Bacon', price: 2.00 },
  { id: 'grilled-chicken', name: 'Herbed Grilled Chicken', price: 2.00 },
  { id: 'prosciutto', name: 'Dry-Cured Prosciutto', price: 2.50 },
  { id: 'meatballs', name: 'Handcrafted Beef Meatballs', price: 2.00 },
];

export const BEVERAGE_OPTIONS = [
  { id: 'cola', name: 'Classic Cola (20 oz)', price: 2.49, description: 'Ice-cold fountain cola', icon: 'soda' },
  { id: 'lemon-lime', name: 'Lemon-Lime Soda (20 oz)', price: 2.49, description: 'Crisp and citrusy', icon: 'soda' },
  { id: 'root-beer', name: 'Root Beer (20 oz)', price: 2.49, description: 'Creamy, old-fashioned root beer', icon: 'soda' },
  { id: 'iced-tea', name: 'Fresh Brewed Iced Tea', price: 2.29, description: 'Sweet or unsweet', icon: 'coffee' },
  { id: 'lemonade', name: 'House Lemonade', price: 2.79, description: 'Squeezed daily', icon: 'coffee' },
  { id: 'bottled-water', name: 'Bottled Spring Water', price: 1.49, description: '16.9 oz bottle', icon: 'water' },
];

export const SIDE_OPTIONS = [
  { id: 'garlic-knots', name: 'Garlic Knots (6)', price: 4.99, description: 'Brushed with garlic butter and parmesan', icon: 'bread' },
  { id: 'breadsticks', name: 'Cheesy Breadsticks', price: 5.99, description: 'With marinara for dipping', icon: 'bread' },
  { id: 'wings', name: 'Hickory Wings (8)', price: 8.99, description: 'Smoked, then fired in the stone oven', icon: 'wings' },
  { id: 'house-salad', name: 'House Garden Salad', price: 5.49, description: 'Greens, tomato, red onion, olives', icon: 'salad' },
  { id: 'caesar-salad', name: 'Caesar Salad', price: 5.99, description: 'Romaine, parmesan, house croutons', icon: 'salad' },
];