create table if not exists public.hw_market_search_cache (
  cache_key text primary key,
  payload jsonb not null,
  captured_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists hw_market_search_cache_expires_at_idx
  on public.hw_market_search_cache (expires_at);

alter table public.hw_market_search_cache enable row level security;

revoke all on table public.hw_market_search_cache from anon, authenticated;
grant all on table public.hw_market_search_cache to service_role;
