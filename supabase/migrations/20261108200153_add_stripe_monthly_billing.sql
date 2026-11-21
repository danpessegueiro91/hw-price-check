create table if not exists public.hw_billing_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  last_event_created bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hw_billing_subscriptions enable row level security;

drop policy if exists "Users can view their own billing subscription" on public.hw_billing_subscriptions;
create policy "Users can view their own billing subscription"
  on public.hw_billing_subscriptions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.hw_billing_subscriptions from anon, authenticated;
grant select on table public.hw_billing_subscriptions to authenticated;
grant all on table public.hw_billing_subscriptions to service_role;
