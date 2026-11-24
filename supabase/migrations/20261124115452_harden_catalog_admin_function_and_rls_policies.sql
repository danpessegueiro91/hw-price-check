-- Keep the privileged catalogue-admin predicate outside the exposed public API schema.
-- Its only intended callers are authenticated RLS policies.
create schema if not exists private;

create or replace function private.is_catalog_image_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.catalog_image_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_catalog_image_admin() from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_catalog_image_admin() to authenticated;

drop policy if exists "Catalog admins can add catalog images" on public.catalog_images;
drop policy if exists "Catalog admins can update catalog images" on public.catalog_images;
drop policy if exists "Catalog admins can delete catalog images" on public.catalog_images;

create policy "Catalog admins can add catalog images"
  on public.catalog_images for insert to authenticated
  with check (private.is_catalog_image_admin());

create policy "Catalog admins can update catalog images"
  on public.catalog_images for update to authenticated
  using (private.is_catalog_image_admin())
  with check (private.is_catalog_image_admin());

create policy "Catalog admins can delete catalog images"
  on public.catalog_images for delete to authenticated
  using (private.is_catalog_image_admin());

drop policy if exists "Catalog admins can upload HW catalog photos" on storage.objects;
drop policy if exists "Catalog admins can update HW catalog photos" on storage.objects;
drop policy if exists "Catalog admins can delete HW catalog photos" on storage.objects;

create policy "Catalog admins can upload HW catalog photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'hw-catalog' and private.is_catalog_image_admin());

create policy "Catalog admins can update HW catalog photos"
  on storage.objects for update to authenticated
  using (bucket_id = 'hw-catalog' and private.is_catalog_image_admin())
  with check (bucket_id = 'hw-catalog' and private.is_catalog_image_admin());

create policy "Catalog admins can delete HW catalog photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'hw-catalog' and private.is_catalog_image_admin());

revoke all on function public.is_catalog_image_admin() from public, anon, authenticated;
drop function public.is_catalog_image_admin();

-- The public read policy already includes authenticated users, so the old
-- authenticated-only SELECT policy is redundant.
drop policy if exists "Authenticated users can read model price history"
  on public.hw_model_price_history;

create index if not exists catalog_images_created_by_idx
  on public.catalog_images (created_by);
