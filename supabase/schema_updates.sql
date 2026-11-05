-- supabase/schema_updates.sql
-- Run this once in the Supabase SQL editor. The app still works without it
-- (it retries without the new columns), but check/cash amounts, delivery notes,
-- account type and drink/side images are only saved after these columns exist.

-- Orders: record how much was tendered and the check number (FR-09)
alter table public.orders add column if not exists amount_tendered numeric(10,2);
alter table public.orders add column if not exists check_number text;

-- Customers: delivery notes and charge-account type (FR-02)
alter table public.customers add column if not exists delivery_notes text;
alter table public.customers add column if not exists charge_account_type text;

-- Menu: photos and an on/off switch for the management page (FR-12)
alter table public.menu_items add column if not exists image_url text;
alter table public.menu_items add column if not exists available boolean not null default true;

-- Seed a starter drinks & sides menu if none exists. Edit prices in the Manage page.
insert into public.menu_items (name, category, price, description)
select v.name, v.category, v.price, v.description
from (values
  ('Classic Cola (20 oz)', 'beverage', 2.49, 'Ice-cold fountain cola'),
  ('Lemon-Lime Soda (20 oz)', 'beverage', 2.49, 'Crisp and citrusy'),
  ('Root Beer (20 oz)', 'beverage', 2.49, 'Creamy, old-fashioned root beer'),
  ('Fresh Brewed Iced Tea', 'beverage', 2.29, 'Sweet or unsweet'),
  ('House Lemonade', 'beverage', 2.79, 'Squeezed daily'),
  ('Bottled Spring Water', 'beverage', 1.49, '16.9 oz bottle'),
  ('Garlic Knots (6)', 'side', 4.99, 'Brushed with garlic butter and parmesan'),
  ('Cheesy Breadsticks', 'side', 5.99, 'With marinara for dipping'),
  ('Hickory Wings (8)', 'side', 8.99, 'Smoked, then fired in the stone oven'),
  ('House Garden Salad', 'side', 5.49, 'Greens, tomato, red onion, olives'),
  ('Caesar Salad', 'side', 5.99, 'Romaine, parmesan, house croutons')
) as v(name, category, price, description)
where not exists (select 1 from public.menu_items where category in ('beverage', 'side'));

-- Management page: the browser uses the public anon key, so menu_items needs write
-- policies. WARNING: these let anyone with the anon key edit the menu; the PIN on the
-- Manage page is a UI gate only. For real security use Supabase Auth instead.
alter table public.menu_items enable row level security;
drop policy if exists "menu_items read" on public.menu_items;
drop policy if exists "menu_items write" on public.menu_items;
create policy "menu_items read" on public.menu_items for select using (true);
create policy "menu_items write" on public.menu_items for all using (true) with check (true);
