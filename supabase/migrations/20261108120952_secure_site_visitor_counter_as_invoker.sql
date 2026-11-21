grant usage on schema private to anon, authenticated;
grant select, insert on table private.site_visitors to anon, authenticated;

drop policy if exists site_visitors_select_counter on private.site_visitors;
create policy site_visitors_select_counter
  on private.site_visitors
  for select
  to anon, authenticated
  using (true);

drop policy if exists site_visitors_insert_counter on private.site_visitors;
create policy site_visitors_insert_counter
  on private.site_visitors
  for insert
  to anon, authenticated
  with check (
    visitor_id is not null
    and visitor_id <> '00000000-0000-0000-0000-000000000000'::uuid
  );

create or replace function public.register_site_visitor(p_visitor_id uuid)
returns bigint
language plpgsql
security invoker
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
  on conflict (visitor_id) do nothing;

  select count(*) into visitor_count from private.site_visitors;
  return visitor_count;
end;
$function$;

revoke all on function public.register_site_visitor(uuid) from public;
grant execute on function public.register_site_visitor(uuid) to anon, authenticated;
