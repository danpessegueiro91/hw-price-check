# Supabase exit plan — complete dependency inventory

**Target:** no Supabase runtime, SDK, project URL, Auth, Postgres, Storage, Edge Functions, scheduled jobs, or admin RPC dependency in the deployed HW Price Check site.

External providers such as Gemini, Soldgraph, Stripe and Frankfurter may remain. They must be called server-to-server by Cloudflare Pages Functions/Workers; browser code must call only same-origin /api/* endpoints.

## Replacement map

| Current Supabase capability | First-party replacement |
|---|---|
| Supabase Auth: anonymous visitors | D1 guest user + secure HttpOnly session cookie; preserve the 3-use guest allowance and allow guest-to-account claiming |
| Email/password signup and login | Cloudflare Pages Functions + D1 users + PBKDF2 password hashes |
| Email confirmation, resend, password reset, email change | D1 one-time tokens + transactional email provider via server-side adapter |
| Sessions, getSession/getUser, signOut, auth state | D1 hashed session tokens, /api/auth/me, /api/auth/logout, frontend auth events |
| User metadata/preferences | D1 users fields and authenticated profile/preferences endpoints |
| user_data select/upsert | /api/user-data backed by D1; preserve existing JSON payload shape |
| get_my_hw_plan, entitlements and quotas | D1 entitlement and usage tables + atomic quota endpoint |
| register_site_visitor RPC | Privacy-conscious first-party visitor endpoint + D1 aggregate/deduplication |
| hw_billing_subscriptions | D1 billing subscription records |
| hw-billing Edge Function | /api/billing/* Pages Functions calling Stripe server-side |
| hw-stripe-webhook Edge Function | Cloudflare Worker/Pages webhook with raw-body signature verification and D1 idempotency |
| hw-identify Edge Function | /api/identify calling Gemini server-side, preserving multimodal prompts, model fallback and quota semantics |
| hw-marketplace-search Edge Function | /api/marketplace-search calling Soldgraph server-side, preserving supported marketplaces and polling |
| hw-sold-comps Edge Function | /api/sold-comps calling Soldgraph, normalizing completed sales, saving snapshots and enforcing quotas |
| hw-daily-market-refresh Edge Function/cron | Cloudflare Cron Trigger/Worker; refresh Soldgraph and Frankfurter data into D1 |
| hw_model_price_history | D1 history table + same-origin read API |
| catalog_images table and admin RPC | D1 metadata + D1 admin role checks |
| Supabase Storage hw-catalog | Static catalogue assets in the repository/Pages for known images; Cloudflare Images or R2 only if dynamic uploads are genuinely needed and configured |
| Supabase Storage public URLs | Local /assets/catalog/... URLs or first-party Cloudflare asset URLs |
| newsletter_subscribers | D1 table + server-side confirmation/double-opt-in endpoint |
| is_catalog_image_admin RPC | Authenticated /api/admin/* endpoints with D1 role checks |
| Supabase JS CDN/client | Remove from index.html; native fetch('/api/...') client module |
| Supabase environment variables/keys | Remove from frontend/build; provider credentials remain Cloudflare secrets only |

## User experience and data invariants

- Keep the current site features and visual behaviour; this is an infrastructure migration, not a product redesign.
- Preserve collection and watchlist JSON shape, user IDs, profile preferences, language/theme, Premium status, billing history and market history.
- Preserve guest access and its current limits; guest data must be claimable on registration/login.
- Never migrate password plaintext. Existing accounts require a secure email-based claim/reset path.
- Preserve the existing admin identity explicitly during import; never make the first registrant an administrator.
- Keep the 30 existing catalogue photos local and verify each live URL. No Supabase Storage URLs may remain in production.
- Do not require R2 or Cloudflare Images for the current static photo library. Evaluate dynamic photo hosting separately against account billing requirements.

## Required implementation stages

1. Finish the Cloudflare schema and API contract, including guest accounts, account claiming, email tokens, quotas, admin roles and billing.
2. Port all six Edge Functions and their complete behaviour, including provider error handling, quotas, polling, FX conversion, webhook verification and scheduled refresh.
3. Replace every Supabase call in app-core.js, catalog.js, index.html and any other assets with the first-party API. Search the whole repository, not only the main scripts.
4. Implement email delivery, scheduled jobs, and a safe static/dynamic catalogue image upload strategy.
5. Export all Supabase data and image objects, import into D1/Cloudflare assets, and verify counts, IDs, ownership, checksums and photo URLs.
6. Deploy a separate staging Pages environment with D1 bindings and secrets. Run browser and API tests for guest, signup, confirmation, login, logout, password reset, collection sync, quotas, Premium, billing, webhook, identification, marketplace search, sold comps, admin photo management, newsletter and daily refresh.
7. Only after staging passes, switch production frontend and backend together. Verify production assets contain zero Supabase URL/SDK/Auth/DB/Storage/Functions references and smoke-test the live site.
8. Keep Supabase intact as a read-only rollback source for a defined observation period. Decommission only after the production cutover is stable and backups are verified.

## Cutover blockers / configuration

- Create D1 and bind it as DB in the Pages project.
- Configure Cloudflare secrets for Gemini, Soldgraph, Stripe API, Stripe webhook signing and the selected email provider.
- Configure a Cloudflare Cron Trigger for daily refresh.
- Confirm the email provider and sender domain before enabling verification/reset flows.
- Do not assume an R2 bucket or paid Cloudflare Images plan exists. Static catalogue photos are already in the repository.
- No Supabase project, table, bucket, function or secret is to be deleted before all cutover gates pass.
