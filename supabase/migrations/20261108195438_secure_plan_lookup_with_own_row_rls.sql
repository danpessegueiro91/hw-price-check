drop policy if exists hw_usage_quota_select_own on public.hw_usage_quota;
create policy hw_usage_quota_select_own
  on public.hw_usage_quota
  for select
  to authenticated
  using (auth.uid() = user_id);

grant select on public.hw_usage_quota to authenticated;

drop policy if exists hw_user_entitlements_select_own on public.hw_user_entitlements;
create policy hw_user_entitlements_select_own
  on public.hw_user_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

grant select on public.hw_user_entitlements to authenticated;

create or replace function public.get_my_hw_plan()
returns jsonb
language plpgsql
security invoker
set search_path to ''
as $function$
declare
  v_user_id uuid := auth.uid();
  v_daily_uses integer := 0;
  v_daily_date date;
  v_tier text := 'free_account';
  v_limit integer := 10;
  v_expires_at timestamptz := null;
  v_today date := (now() at time zone 'utc')::date;
  v_unlimited boolean := false;
begin
  if v_user_id is null then
    raise exception 'authentication_required';
  end if;

  select q.daily_uses, q.daily_date
    into v_daily_uses, v_daily_date
  from public.hw_usage_quota q
  where q.user_id = v_user_id;

  if not found or v_daily_date is null or v_daily_date <> v_today then
    v_daily_uses := 0;
  end if;

  select e.tier, e.daily_limit, e.expires_at
    into v_tier, v_limit, v_expires_at
  from public.hw_user_entitlements e
  where e.user_id = v_user_id
    and e.starts_at <= now()
    and (e.expires_at is null or e.expires_at > now())
  limit 1;

  if not found then
    v_tier := 'free_account';
    v_limit := 10;
    v_expires_at := null;
  end if;

  v_unlimited := v_tier = 'premium' and v_limit is null;

  return jsonb_build_object(
    'allowed', true,
    'tier', v_tier,
    'used', v_daily_uses,
    'limit', v_limit,
    'remaining', case when v_unlimited then null else greatest(0, v_limit - v_daily_uses) end,
    'unlimited', v_unlimited,
    'expires_at', v_expires_at
  );
end;
$function$;

revoke all on function public.get_my_hw_plan() from public, anon;
grant execute on function public.get_my_hw_plan() to authenticated, service_role;
