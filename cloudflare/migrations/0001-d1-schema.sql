PRAGMA foreign_keys = ON;

-- First-party Cloudflare D1 schema. UUIDs remain text to preserve legacy IDs.
-- This migration creates structure only; it does not alter or delete Supabase data.
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, legacy_auth_id TEXT UNIQUE,
 email TEXT NOT NULL COLLATE NOCASE UNIQUE, email_verified INTEGER NOT NULL DEFAULT 0 CHECK(email_verified IN(0,1)),
 display_name TEXT, preferred_language TEXT NOT NULL DEFAULT 'pt', appearance TEXT,
 password_hash TEXT, must_reset_password INTEGER NOT NULL DEFAULT 1 CHECK(must_reset_password IN(0,1)),
 disabled_at TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_sessions (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 token_hash TEXT NOT NULL UNIQUE, expires_at TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, last_seen_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expiry ON user_sessions(expires_at);
CREATE TABLE IF NOT EXISTS auth_tokens (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 token_hash TEXT NOT NULL UNIQUE, purpose TEXT NOT NULL CHECK(purpose IN('verify_email','reset_password','change_email')),
 expires_at TEXT NOT NULL, consumed_at TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_user_purpose ON auth_tokens(user_id,purpose);
CREATE TABLE IF NOT EXISTS user_data (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 payload TEXT NOT NULL DEFAULT '{"items":[],"watch":[]}' CHECK(json_valid(payload)), updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS collection_items (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, model TEXT NOT NULL,
 year_series TEXT, asking_price REAL NOT NULL DEFAULT 0 CHECK(asking_price>=0), shipping_cost REAL NOT NULL DEFAULT 0 CHECK(shipping_cost>=0),
 estimated_value REAL CHECK(estimated_value IS NULL OR estimated_value>=0),
 item_condition TEXT NOT NULL DEFAULT 'mint' CHECK(item_condition IN('mint','good','damaged','loose')),
 identification TEXT NOT NULL DEFAULT 'unknown' CHECK(identification IN('unknown','mainline','th','sth','premium')),
 decision TEXT NOT NULL DEFAULT 'check' CHECK(decision IN('check','buy','pass')),
 evidence TEXT, photo_paths TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(photo_paths)),
 purchased_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_collection_items_user ON collection_items(user_id);
CREATE TABLE IF NOT EXISTS watchlist_items (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, model TEXT NOT NULL,
 max_price REAL CHECK(max_price IS NULL OR max_price>=0), notes TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_watchlist_items_user ON watchlist_items(user_id);
CREATE TABLE IF NOT EXISTS usage_quota (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, anonymous_uses INTEGER NOT NULL DEFAULT 0 CHECK(anonymous_uses>=0),
 daily_uses INTEGER NOT NULL DEFAULT 0 CHECK(daily_uses>=0), daily_date TEXT NOT NULL DEFAULT(date('now')), updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_entitlements (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, tier TEXT NOT NULL DEFAULT 'free_account',
 daily_limit INTEGER CHECK(daily_limit IS NULL OR daily_limit>=0), starts_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, expires_at TEXT,
 granted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, granted_by TEXT REFERENCES users(id) ON DELETE SET NULL, grant_note TEXT
);
CREATE TABLE IF NOT EXISTS billing_subscriptions (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, stripe_customer_id TEXT UNIQUE, stripe_subscription_id TEXT UNIQUE,
 status TEXT NOT NULL DEFAULT 'inactive', current_period_end TEXT, cancel_at_period_end INTEGER NOT NULL DEFAULT 0 CHECK(cancel_at_period_end IN(0,1)),
 last_event_created INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS model_price_history (
 id TEXT PRIMARY KEY, model_key TEXT NOT NULL, model_name TEXT NOT NULL, variant_key TEXT NOT NULL DEFAULT '',
 captured_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, currency TEXT NOT NULL DEFAULT 'GBP', median_price REAL NOT NULL CHECK(median_price>=0),
 p25_price REAL, p75_price REAL, min_price REAL, max_price REAL, sales_count INTEGER NOT NULL DEFAULT 0 CHECK(sales_count>=0),
 source TEXT NOT NULL DEFAULT 'Soldgraph eBay UK', query_text TEXT NOT NULL, sample_hash TEXT NOT NULL,
 model_year INTEGER, model_kind TEXT, source_currency TEXT, fx_rate_to_eur REAL, latest_sold_date TEXT, best_offer_accepted_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_price_history_model_time ON model_price_history(model_key,captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_price_history_year_kind ON model_price_history(model_year,model_kind,captured_at DESC);
CREATE TABLE IF NOT EXISTS catalog_images (
 id TEXT PRIMARY KEY, model_year INTEGER NOT NULL, model_kind TEXT NOT NULL CHECK(model_kind IN('th','sth')),
 model_name TEXT NOT NULL, storage_path TEXT NOT NULL UNIQUE, alt_text TEXT, created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(model_year,model_kind,model_name)
);
CREATE TABLE IF NOT EXISTS catalog_image_admins (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_photos (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, object_key TEXT NOT NULL UNIQUE,
 content_type TEXT NOT NULL, byte_size INTEGER NOT NULL CHECK(byte_size>=0), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_photos_user ON user_photos(user_id);
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
 id TEXT PRIMARY KEY, email TEXT NOT NULL COLLATE NOCASE UNIQUE, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS site_visitors (
 visitor_id TEXT PRIMARY KEY, first_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS market_refresh_runs (
 id TEXT PRIMARY KEY, run_date TEXT NOT NULL UNIQUE, status TEXT NOT NULL, updated_count INTEGER NOT NULL DEFAULT 0,
 insufficient_count INTEGER NOT NULL DEFAULT 0, failed_count INTEGER NOT NULL DEFAULT 0, credits_charged INTEGER NOT NULL DEFAULT 0,
 report_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(report_json)), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS webhook_events (
 provider TEXT NOT NULL, event_id TEXT NOT NULL, event_created INTEGER NOT NULL DEFAULT 0,
 processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(provider,event_id)
);
