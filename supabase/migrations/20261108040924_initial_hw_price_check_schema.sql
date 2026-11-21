create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  model text not null,
  year_series text,
  asking_price numeric(10,2) not null default 0 check (asking_price >= 0),
  shipping_cost numeric(10,2) not null default 0 check (shipping_cost >= 0),
  estimated_value numeric(10,2) check (estimated_value is null or estimated_value >= 0),
  item_condition text not null default 'mint' check (item_condition in ('mint','good','damaged','loose')),
  identification text not null default 'unknown' check (identification in ('unknown','mainline','th','sth','premium')),
  decision text not null default 'check' check (decision in ('check','buy','pass')),
  evidence text,
  photo_paths text[] not null default '{}',
  purchased_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  model text not null,
  max_price numeric(10,2) check (max_price is null or max_price >= 0),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.collection_items enable row level security;
alter table public.watchlist_items enable row level security;

grant select, insert, update, delete on public.collection_items to authenticated;
grant select, insert, update, delete on public.watchlist_items to authenticated;

drop policy if exists "Users manage their own collection items" on public.collection_items;
create policy "Users manage their own collection items"
on public.collection_items for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users manage their own watchlist items" on public.watchlist_items;
create policy "Users manage their own watchlist items"
on public.watchlist_items for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('hw-photos', 'hw-photos', false, 10485760, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do update
set public = false,
    file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/heic'];

drop policy if exists "Users read their own Hot Wheels photos" on storage.objects;
create policy "Users read their own Hot Wheels photos"
on storage.objects for select to authenticated
using (bucket_id = 'hw-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users upload their own Hot Wheels photos" on storage.objects;
create policy "Users upload their own Hot Wheels photos"
on storage.objects for insert to authenticated
with check (bucket_id = 'hw-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users update their own Hot Wheels photos" on storage.objects;
create policy "Users update their own Hot Wheels photos"
on storage.objects for update to authenticated
using (bucket_id = 'hw-photos' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'hw-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users delete their own Hot Wheels photos" on storage.objects;
create policy "Users delete their own Hot Wheels photos"
on storage.objects for delete to authenticated
using (bucket_id = 'hw-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
