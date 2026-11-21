create index if not exists collection_items_user_id_idx
  on public.collection_items (user_id);

create index if not exists watchlist_items_user_id_idx
  on public.watchlist_items (user_id);

create index if not exists hw_user_entitlements_granted_by_idx
  on public.hw_user_entitlements (granted_by);

drop policy if exists hw_usage_quota_select_own on public.hw_usage_quota;
create policy hw_usage_quota_select_own
  on public.hw_usage_quota
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists hw_user_entitlements_select_own on public.hw_user_entitlements;
create policy hw_user_entitlements_select_own
  on public.hw_user_entitlements
  for select to authenticated
  using ((select auth.uid()) = user_id);
