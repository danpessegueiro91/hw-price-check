create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.site_visitors (
  visitor_id uuid primary key,
  first_seen_at timestamptz not null default pg_catalog.now(),
  last_seen_at timestamptz not null default pg_catalog.now()
);

alter table private.site_visitors enable row level security;
revoke all on table private.site_visitors from public, anon, authenticated;

create or replace function public.register_site_visitor(p_visitor_id uuid)
returns bigint
language plpgsql
security definer
set search_path = pg_catalog, private
as $function$
declare
  visitor_count bigint;
begin
  if p_visitor_id is null or p_visitor_id = '00000000-0000-0000-0000-000000000000'::uuid then
    raise exception 'A valid visitor identifier is required';
  end if;

  insert into private.site_visitors(visitor_id)
  values (p_visitor_id)
  on conflict (visitor_id)
  do update set last_seen_at = pg_catalog.now();

  select count(*) into visitor_count from private.site_visitors;
  return visitor_count;
end;
$function$;

revoke all on function public.register_site_visitor(uuid) from public, anon, authenticated;
grant execute on function public.register_site_visitor(uuid) to anon, authenticated;
