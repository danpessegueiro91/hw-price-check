-- HW Price Check: first-party image library for the public TH/STH catalog.
create table if not exists public.catalog_images (
  id uuid primary key default gen_random_uuid(),
  model_year integer not null,
  model_kind text not null check (model_kind in ('th','sth')),
  model_name text not null,
  storage_path text not null unique,
  alt_text text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (model_year, model_kind, model_name)
);
alter table public.catalog_images enable row level security;
drop policy if exists "Catalog images are publicly readable" on public.catalog_images;
create policy "Catalog images are publicly readable" on public.catalog_images for select using (true);

create table if not exists public.catalog_image_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.catalog_image_admins enable row level security;
revoke all on public.catalog_image_admins from anon, authenticated;

-- Initial catalog administrator account.
insert into public.catalog_image_admins (user_id)
select id from auth.users
where id = 'b712588a-cdb5-4471-baa7-d90e83f9dd68'::uuid
on conflict (user_id) do nothing;

create or replace function public.is_catalog_image_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.catalog_image_admins
    where user_id = auth.uid()
  );
$$;
revoke all on function public.is_catalog_image_admin() from public;
grant execute on function public.is_catalog_image_admin() to anon, authenticated;

drop policy if exists "Signed-in users can add catalog images" on public.catalog_images;
drop policy if exists "Signed-in users can update catalog images" on public.catalog_images;
drop policy if exists "Signed-in users can delete catalog images" on public.catalog_images;
drop policy if exists "Catalog admins can add catalog images" on public.catalog_images;
drop policy if exists "Catalog admins can update catalog images" on public.catalog_images;
drop policy if exists "Catalog admins can delete catalog images" on public.catalog_images;
create policy "Catalog admins can add catalog images" on public.catalog_images for insert to authenticated with check (public.is_catalog_image_admin());
create policy "Catalog admins can update catalog images" on public.catalog_images for update to authenticated using (public.is_catalog_image_admin()) with check (public.is_catalog_image_admin());
create policy "Catalog admins can delete catalog images" on public.catalog_images for delete to authenticated using (public.is_catalog_image_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('hw-catalog', 'hw-catalog', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public=true, file_size_limit=5242880, allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif'];

drop policy if exists "Public can view HW catalog photos" on storage.objects;
create policy "Public can view HW catalog photos" on storage.objects for select using (bucket_id = 'hw-catalog');
drop policy if exists "Signed-in users can upload HW catalog photos" on storage.objects;
drop policy if exists "Signed-in users can update HW catalog photos" on storage.objects;
drop policy if exists "Signed-in users can delete HW catalog photos" on storage.objects;
drop policy if exists "Catalog admins can upload HW catalog photos" on storage.objects;
drop policy if exists "Catalog admins can update HW catalog photos" on storage.objects;
drop policy if exists "Catalog admins can delete HW catalog photos" on storage.objects;
create policy "Catalog admins can upload HW catalog photos" on storage.objects for insert to authenticated with check (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
create policy "Catalog admins can update HW catalog photos" on storage.objects for update to authenticated using (bucket_id = 'hw-catalog' and public.is_catalog_image_admin()) with check (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
create policy "Catalog admins can delete HW catalog photos" on storage.objects for delete to authenticated using (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
