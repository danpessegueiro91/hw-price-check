-- Expose only a caller-scoped boolean for the signed-in admin UI.
-- The actual privileged predicate remains in the private schema and RLS policies.
create or replace function public.is_catalog_image_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select private.is_catalog_image_admin();
$$;

revoke all on function public.is_catalog_image_admin() from public, anon;
grant execute on function public.is_catalog_image_admin() to authenticated;
