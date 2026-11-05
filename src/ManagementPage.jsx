// src/ManagementPage.jsx
// Menu storage and maintenance dashboard (FR-12).
// Restaurant owners can view, add, edit, change prices, and toggle menu items.
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { runWithOptionalColumns } from './supabaseHelpers';

const CATEGORIES = [
  { id: 'size', label: 'Sizes' },
  { id: 'crust', label: 'Crusts' },
  { id: 'veggie', label: 'Veggies' },
  { id: 'meat', label: 'Meats' },
  { id: 'beverage', label: 'Beverages' },
  { id: 'side', label: 'Sides' },
];

const OWNER_PIN = '1234';

export default function ManagementPage({ onExit, onMenuUpdated }) {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  const [activeCategory, setActiveCategory] = useState('size');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: 'size',
    price: '',
    description: '',
    image_url: '',
    available: true,
  });

  const loadItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('menu_items').select('*').order('name');
    if (!error && data) setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isUnlocked) loadItems();
  }, [isUnlocked, loadItems]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin.trim() === OWNER_PIN) {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. The default PIN is 1234.');
    }
  };

  /* BODY_PLACEHOLDER */
}
