create table if not exists public.hw_usage_quota (
  user_id uuid primary key references auth.users(id) on delete cascade,
  anonymous_uses integer not null default 0 check (anonymous_uses >= 0),
  daily_uses integer not null default 0 check (daily_uses >= 0),
  daily_date date not null default ((now() at time zone 'utc')::date),
  updated_at timestamptz not null default now()
);

alter table public.hw_usage_quota enable row level security;
revoke all on table public.hw_usage_quota from anon, authenticated;

create or replace function public.consume_hw_usage()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_is_anonymous boolean := coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false);
  v_row public.hw_usage_quota%rowtype;
  v_today date := (now() at time zone 'utc')::date;
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

  if v_is_anonymous then
    if v_row.anonymous_uses >= 3 then
      return jsonb_build_object(
        'allowed', false,
        'reason', 'guest_limit',
        'tier', 'guest',
        'used', v_row.anonymous_uses,
        'limit', 3,
        'remaining', 0
      );
    end if;

    update public.hw_usage_quota
       set anonymous_uses = anonymous_uses + 1,
           updated_at = now()
     where user_id = v_user_id
     returning * into v_row;

    return jsonb_build_object(
      'allowed', true,
      'tier', 'guest',
      'used', v_row.anonymous_uses,
      'limit', 3,
      'remaining', greatest(0, 3 - v_row.anonymous_uses)
    );
  end if;

  if v_row.daily_date <> v_today then
    update public.hw_usage_quota
       set daily_date = v_today,
           daily_uses = 0,
           updated_at = now()
     where user_id = v_user_id
     returning * into v_row;
  end if;

  if v_row.daily_uses >= 10 then
    return jsonb_build_object(
      'allowed', false,
      'reason', 'daily_limit',
      'tier', 'free_account',
      'used', v_row.daily_uses,
      'limit', 10,
      'remaining', 0
    );
  end if;

  update public.hw_usage_quota
     set daily_uses = daily_uses + 1,
         updated_at = now()
   where user_id = v_user_id
   returning * into v_row;

  return jsonb_build_object(
    'allowed', true,
    'tier', 'free_account',
    'used', v_row.daily_uses,
    'limit', 10,
    'remaining', greatest(0, 10 - v_row.daily_uses)
  );
end;
$$;

revoke all on function public.consume_hw_usage() from public, anon;
grant execute on function public.consume_hw_usage() to authenticated;
