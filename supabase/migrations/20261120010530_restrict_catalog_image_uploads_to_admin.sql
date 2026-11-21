create table if not exists public.catalog_image_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.catalog_image_admins enable row level security;
revoke all on public.catalog_image_admins from anon, authenticated;

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
create policy "Catalog admins can add catalog images" on public.catalog_images for insert to authenticated with check (public.is_catalog_image_admin());
create policy "Catalog admins can update catalog images" on public.catalog_images for update to authenticated using (public.is_catalog_image_admin()) with check (public.is_catalog_image_admin());
create policy "Catalog admins can delete catalog images" on public.catalog_images for delete to authenticated using (public.is_catalog_image_admin());

drop policy if exists "Signed-in users can upload HW catalog photos" on storage.objects;
drop policy if exists "Signed-in users can update HW catalog photos" on storage.objects;
drop policy if exists "Signed-in users can delete HW catalog photos" on storage.objects;
create policy "Catalog admins can upload HW catalog photos" on storage.objects for insert to authenticated with check (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
create policy "Catalog admins can update HW catalog photos" on storage.objects for update to authenticated using (bucket_id = 'hw-catalog' and public.is_catalog_image_admin()) with check (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
create policy "Catalog admins can delete HW catalog photos" on storage.objects for delete to authenticated using (bucket_id = 'hw-catalog' and public.is_catalog_image_admin());
