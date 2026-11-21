create table if not exists public.hw_model_price_history (
  id uuid primary key default gen_random_uuid(),
  model_key text not null,
  model_name text not null,
  variant_key text not null default '',
  captured_at timestamptz not null default now(),
  currency text not null default 'GBP',
  median_price numeric(12,2) not null check (median_price >= 0),
  p25_price numeric(12,2),
  p75_price numeric(12,2),
  min_price numeric(12,2),
  max_price numeric(12,2),
  sales_count integer not null default 0 check (sales_count >= 0),
  source text not null default 'Soldgraph eBay UK',
  query_text text not null,
  sample_hash text not null,
  created_at timestamptz not null default now(),
  constraint hw_model_price_history_snapshot_unique unique (model_key, sample_hash)
);
create index if not exists hw_model_price_history_model_time_idx
  on public.hw_model_price_history (model_key, captured_at);
alter table public.hw_model_price_history enable row level security;
drop policy if exists "Authenticated users can read model price history" on public.hw_model_price_history;
create policy "Authenticated users can read model price history"
  on public.hw_model_price_history for select to authenticated using (true);
revoke all on public.hw_model_price_history from anon, authenticated;
grant select on public.hw_model_price_history to authenticated;
grant all on public.hw_model_price_history to service_role;
