create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_email_format check (email = lower(trim(email)) and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);
create unique index if not exists newsletter_subscribers_email_unique on public.newsletter_subscribers (email);
alter table public.newsletter_subscribers enable row level security;
drop policy if exists "Allow newsletter signup" on public.newsletter_subscribers;
create policy "Allow newsletter signup" on public.newsletter_subscribers
for insert to anon, authenticated
with check (char_length(email) between 6 and 254);
revoke all on public.newsletter_subscribers from public, anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
