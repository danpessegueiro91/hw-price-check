PRAGMA foreign_keys = ON;

-- HW Price Check: complete first-party Cloudflare D1 schema.
-- Preserve legacy Supabase UUIDs as TEXT IDs during import.
-- Anonymous visitors are first-class guest users so their quota and local data
-- can be claimed by a registered account without losing ownership.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  auth_type TEXT NOT NULL DEFAULT 'email' CHECK (auth_type IN ('guest','email')),
  email TEXT COLLATE NOCASE UNIQUE,
  password_hash TEXT,
  password_salt TEXT,
  password_iterations INTEGER NOT NULL DEFAULT 310000,
  email_verified_at TEXT,
  display_name TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'pt',
  appearance TEXT NOT NULL DEFAULT 'dark' CHECK (appearance IN ('dark','light')),
  is_admin INTEGER NOT NULL DEFAULT 0 CHECK (is_admin IN (0,1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  CHECK ((auth_type = 'guest' AND email IS NULL AND password_hash IS NULL) OR
         (auth_type = 'email' AND email IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  last_seen_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_user ON auth_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_expiry ON auth_sessions(expires_at);
CREATE TABLE IF NOT EXISTS auth_email_tokens (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK (purpose IN ('verify_email','reset_password','claim_account')),
  expires_at TEXT NOT NULL,
  consumed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_auth_email_tokens_user ON auth_email_tokens(user_id, purpose);

CREATE TABLE IF NOT EXISTS user_data (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  payload TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS collection_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  year_series TEXT,
  asking_price REAL,
  shipping_cost REAL,
  estimated_value REAL,
  item_condition TEXT,
  identification TEXT,
  decision TEXT,
  evidence TEXT,
  photo_paths TEXT,
  purchased_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_collection_user ON collection_items(user_id, updated_at);
CREATE TABLE IF NOT EXISTS watchlist_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  max_price REAL,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist_items(user_id, created_at);

CREATE TABLE IF NOT EXISTS hw_usage_quota (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  anonymous_uses INTEGER NOT NULL DEFAULT 0,
  daily_uses INTEGER NOT NULL DEFAULT 0,
  daily_date TEXT,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS hw_user_entitlements (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free',
  daily_limit INTEGER NOT NULL DEFAULT 10,
  starts_at TEXT,
  expires_at TEXT,
  granted_at TEXT,
  granted_by TEXT,
  grant_note TEXT
);
CREATE TABLE IF NOT EXISTS hw_billing_subscriptions (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT,
  current_period_end TEXT,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  last_event_created INTEGER,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS hw_model_price_history (
  id TEXT PRIMARY KEY,
  model_key TEXT,
  model_name TEXT NOT NULL,
  variant_key TEXT,
  captured_at TEXT NOT NULL,
  currency TEXT,
  median_price REAL,
  p25_price REAL,
  p75_price REAL,
  min_price REAL,
  max_price REAL,
  sales_count INTEGER,
  source TEXT,
  query_text TEXT,
  sample_hash TEXT,
  model_year INTEGER,
  model_kind TEXT,
  source_currency TEXT,
  fx_rate_to_eur REAL,
  latest_sold_date TEXT,
  best_offer_accepted_count INTEGER
);
CREATE INDEX IF NOT EXISTS idx_market_model_captured ON hw_model_price_history(model_year, model_kind, model_name, captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_key_captured ON hw_model_price_history(model_key, captured_at DESC);

CREATE TABLE IF NOT EXISTS catalog_images (
  model_year INTEGER NOT NULL,
  model_kind TEXT NOT NULL,
  model_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY(model_year, model_kind, model_name)
);
CREATE TABLE IF NOT EXISTS catalog_image_admins (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS site_visitors (
  visitor_id TEXT PRIMARY KEY,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS auth_rate_limits (
  bucket TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  window_started_at INTEGER NOT NULL,
  blocked_until INTEGER
);

-- Never store API keys, Stripe secrets, or refresh tokens in D1.
-- Store them as Cloudflare Worker/Pages secrets.
