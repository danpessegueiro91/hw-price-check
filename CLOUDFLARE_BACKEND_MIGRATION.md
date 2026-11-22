# Cloudflare-native backend migration

This folder contains the first-party D1 schema for replacing the Supabase database and auth layer.

## Current migration state

- The schema preserves Supabase UUIDs as text primary keys so exported ownership references remain stable.
- It covers account records/sessions, user payloads, collection/watchlist data, quotas, entitlements, Stripe subscriptions and webhook idempotency, market history, catalogue image metadata, newsletter subscribers and visitor counts.
- Passwords are deliberately not imported as plaintext or copied from Supabase Auth. Existing accounts need a verified password-reset / account-claim flow before the new login becomes authoritative.
- Supabase must remain enabled until data export, import, account recovery, API parity, and live smoke tests have passed.

## Apply to Cloudflare D1

Create a D1 database in the Cloudflare account, bind it to the Pages project as `DB`, then apply:

```sh
npx wrangler d1 execute hwpc-production --remote --file=migrations/0001_hwpc_d1.sql
```

The D1 database name and ID must come from the actual Cloudflare account; do not invent them or commit credentials.

## Secrets still required

Store provider secrets as Cloudflare secrets, never in browser JavaScript or D1: Gemini API key, Soldgraph API key, Stripe secret key, Stripe webhook signing secret, and a strong session-signing/pepper secret. These keep external providers behind the first-party API; they are not Supabase dependencies.

## Cutover gates

1. Export and checksum all Supabase rows and the 30 catalogue image objects.
2. Import data preserving user IDs and verify row counts and ownership.
3. Implement and test auth/session/password reset, data APIs, quotas, market APIs, catalogue admin/upload, Stripe checkout/portal/webhook, and scheduled refresh.
4. Run browser tests against a staging Pages deployment with D1 bound.
5. Switch the frontend to the first-party API; assert no Supabase URL, SDK, function invocation, auth, DB or Storage references remain in production assets.
6. Verify live sign-up, login, save/load/delete, quota, admin upload, image rendering, billing webhook and market refresh.
7. Keep the Supabase project read-only as rollback backup for an agreed period; only then consider decommissioning it.
