create table if not exists public.hw_user_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tier text not null default 'premium' check (tier = 'premium'),
  daily_limit integer null,
  starts_at timestamptz not null default now(),
  expires_at timestamptz null,
  granted_at timestamptz not null default now(),
  granted_by uuid null references auth.users(id) on delete set null,
  grant_note text null,
  constraint hw_user_entitlements_daily_limit_check
    check (daily_limit is null or daily_limit >= 0)
);

alter table public.hw_user_entitlements enable row level security;

revoke all on table public.hw_user_entitlements from public, anon, authenticated;
grant all on table public.hw_user_entitlements to service_role;

create or replace function public.consume_hw_usage(p_user_id uuid, p_is_anonymous boolean)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_row public.hw_usage_quota%rowtype;
  v_tier text := 'free_account';
  v_limit integer := 10;
  v_expires_at timestamptz := null;
  v_today date := (now() at time zone 'utc')::date;
  v_unlimited boolean := false;
begin
  if p_user_id is null then
    raise exception 'user_id_required';
  end if;

  insert into public.hw_usage_quota (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select * into v_row
  from public.hw_usage_quota
  where user_id = p_user_id
  for update;

  if p_is_anonymous then
    if v_row.anonymous_uses >= 3 then
      return jsonb_build_object(
        'allowed', false, 'reason', 'guest_limit', 'tier', 'guest',
        'used', v_row.anonymous_uses, 'limit', 3, 'remaining', 0,
        'unlimited', false
      );
    end if;

    update public.hw_usage_quota
       set anonymous_uses = anonymous_uses + 1, updated_at = now()
     where user_id = p_user_id
     returning * into v_row;

    return jsonb_build_object(
      'allowed', true, 'tier', 'guest', 'used', v_row.anonymous_uses,
      'limit', 3, 'remaining', greatest(0, 3 - v_row.anonymous_uses),
      'unlimited', false
    );
  end if;

  if v_row.daily_date <> v_today then
    update public.hw_usage_quota
       set daily_date = v_today, daily_uses = 0, updated_at = now()
     where user_id = p_user_id
     returning * into v_row;
  end if;

  select e.tier, e.daily_limit, e.expires_at
    into v_tier, v_limit, v_expires_at
  from public.hw_user_entitlements e
  where e.user_id = p_user_id
    and e.starts_at <= now()
    and (e.expires_at is null or e.expires_at > now())
  limit 1;

  if not found then
    v_tier := 'free_account';
    v_limit := 10;
    v_expires_at := null;
  end if;

  v_unlimited := v_tier = 'premium' and v_limit is null;

  if not v_unlimited and v_row.daily_uses >= v_limit then
    return jsonb_build_object(
      'allowed', false,
      'reason', case when v_tier = 'premium' then 'premium_daily_limit' else 'daily_limit' end,
      'tier', v_tier,
      'used', v_row.daily_uses,
      'limit', v_limit,
      'remaining', 0,
      'unlimited', false,
      'expires_at', v_expires_at
    );
  end if;

  update public.hw_usage_quota
     set daily_uses = daily_uses + 1, updated_at = now()
   where user_id = p_user_id
   returning * into v_row;

  return jsonb_build_object(
    'allowed', true,
    'tier', v_tier,
    'used', v_row.daily_uses,
    'limit', v_limit,
    'remaining', case when v_unlimited then null else greatest(0, v_limit - v_row.daily_uses) end,
    'unlimited', v_unlimited,
    'expires_at', v_expires_at
  );
end;
$function$;

revoke all on function public.consume_hw_usage(uuid, boolean) from public, anon, authenticated;
grant execute on function public.consume_hw_usage(uuid, boolean) to service_role;

create or replace function public.get_my_hw_plan()
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_user_id uuid := auth.uid();
  v_row public.hw_usage_quota%rowtype;
  v_tier text := 'free_account';
  v_limit integer := 10;
  v_expires_at timestamptz := null;
  v_today date := (now() at time zone 'utc')::date;
  v_unlimited boolean := false;
begin
  if v_user_id is null then
    raise exception 'authentication_required';
  end if;

  insert into public.hw_usage_quota (user_id)
  values (v_user_id)
  on conflict (user_id) do nothing;

  select * into v_row
  from public.hw_usage_quota
  where user_id = v_user_id
  for update;

  if v_row.daily_date <> v_today then
    update public.hw_usage_quota
       set daily_date = v_today, daily_uses = 0, updated_at = now()
     where user_id = v_user_id
     returning * into v_row;
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
    'used', v_row.daily_uses,
    'limit', v_limit,
    'remaining', case when v_unlimited then null else greatest(0, v_limit - v_row.daily_uses) end,
    'unlimited', v_unlimited,
    'expires_at', v_expires_at
  );
end;
$function$;

revoke all on function public.get_my_hw_plan() from public, anon;
grant execute on function public.get_my_hw_plan() to authenticated;
