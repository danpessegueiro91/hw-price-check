-- Daily TH/STH sold-price refresh infrastructure.
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

alter table public.hw_model_price_history
  add column if not exists model_year integer,
  add column if not exists model_kind text,
  add column if not exists source_currency text,
  add column if not exists fx_rate_to_eur numeric;

create index if not exists hw_model_price_history_latest_idx
  on public.hw_model_price_history (model_year, model_kind, model_name, captured_at desc);

drop policy if exists "Public can read market price history" on public.hw_model_price_history;
create policy "Public can read market price history"
  on public.hw_model_price_history for select to anon, authenticated using (true);
grant select on public.hw_model_price_history to anon, authenticated;
grant insert on public.hw_model_price_history to service_role;

create table if not exists public.hw_market_refresh_auth (
  id integer primary key default 1 check (id = 1),
  token_hash text not null,
  updated_at timestamptz not null default now()
);
alter table public.hw_market_refresh_auth enable row level security;
revoke all on public.hw_market_refresh_auth from anon, authenticated;
grant select, insert, update, delete on public.hw_market_refresh_auth to service_role;

do $$
declare
  refresh_token text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  if not exists (select 1 from vault.decrypted_secrets where name = 'hw_market_refresh_token') then
    perform vault.create_secret(refresh_token, 'hw_market_refresh_token', 'Private token for daily HW Price Check market refresh');
    insert into public.hw_market_refresh_auth(id, token_hash)
    values (1, encode(extensions.digest(refresh_token, 'sha256'), 'hex'))
    on conflict (id) do update set token_hash = excluded.token_hash, updated_at = now();
  end if;
end $$;

select cron.schedule(
  'hw-daily-market-refresh',
  '30 5 * * *',
  $job$
    select net.http_post(
      url := 'https://hvxszwbszrigeznmmkeb.supabase.co/functions/v1/hw-daily-market-refresh',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-hw-refresh-token', (select decrypted_secret from vault.decrypted_secrets where name = 'hw_market_refresh_token')
      ),
      body := jsonb_build_object('trigger', 'cron', 'requested_at', now()),
      timeout_milliseconds := 10000
    );
  $job$
);
