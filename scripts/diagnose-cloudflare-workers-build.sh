#!/usr/bin/env bash
set -euo pipefail

API="https://api.cloudflare.com/client/v4"
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
CF_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
GITHUB_TOKEN_VALUE="${GITHUB_TOKEN:-}"
GITHUB_REPOSITORY_VALUE="${GITHUB_REPOSITORY:-}"
GITHUB_HEAD_SHA_VALUE="${GITHUB_HEAD_SHA:-}"

if [[ -z "$ACCOUNT_ID" || -z "$CF_TOKEN" || -z "$GITHUB_TOKEN_VALUE" || -z "$GITHUB_REPOSITORY_VALUE" || -z "$GITHUB_HEAD_SHA_VALUE" ]]; then
  echo "Cloudflare diagnostics skipped: a required Actions token or commit reference is unavailable."
  exit 0
fi

echo "Reading the Cloudflare build ID attached to this pull request commit..."
checks_response="$(curl --silent --show-error --location \
  --header "Authorization: Bearer $GITHUB_TOKEN_VALUE" \
  --header "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY_VALUE/commits/$GITHUB_HEAD_SHA_VALUE/check-runs?per_page=100")" || {
    echo "Could not read GitHub check-runs for this commit."
    exit 0
  }

build_uuid="$(jq -r '.check_runs[]? | select(.name == "Workers Builds: hw-price-check") | .external_id // empty' <<<"$checks_response" | head -n 1)"
if [[ -z "$build_uuid" || "$build_uuid" == "null" ]]; then
  echo "No Cloudflare Workers Build ID is attached to this exact commit yet."
  exit 0
fi

echo "Cloudflare Build ID: $build_uuid"
response="$(curl --silent --show-error --location \
  --header "Authorization: Bearer $CF_TOKEN" \
  --header "Content-Type: application/json" \
  --write-out $'\n%{http_code}' \
  "$API/accounts/$ACCOUNT_ID/builds/builds/$build_uuid/logs")" || {
    echo "Cloudflare log request failed at transport level."
    exit 0
  }

status="${response##*$'\n'}"
body="${response%$'\n'*}"

if [[ "$status" != "200" ]]; then
  echo "Cloudflare Builds API returned HTTP $status while reading this build's logs."
  if [[ "$status" == "401" || "$status" == "403" ]]; then
    echo "The existing CLOUDFLARE_API_TOKEN does not have permission to read Workers Build logs."
  fi
  jq -c '{success,errors}' <<<"$body" 2>/dev/null || true
  exit 0
fi

if ! jq -e '.success == true' >/dev/null 2>&1 <<<"$body"; then
  echo "Cloudflare returned an unsuccessful log response:"
  jq -c '{success,errors}' <<<"$body" 2>/dev/null || true
  exit 0
fi

echo "Cloudflare build log (sensitive values redacted):"
jq -r '.. | strings' <<<"$body" \
  | tail -n 200 \
  | sed -E \
      -e 's/(Bearer )[A-Za-z0-9._-]+/\1[REDACTED]/g' \
      -e 's/(sk_(live|test)_)[A-Za-z0-9]+/\1[REDACTED]/g' \
      -e 's/(sb_publishable_)[A-Za-z0-9_-]+/\1[REDACTED]/g' \
      -e 's/(api[_ -]?key[=: ]+)[^ ]+/\1[REDACTED]/Ig' \
      -e 's/[A-Za-z0-9_-]{40,}/[REDACTED_LONG_TOKEN]/g' \
  | tail -n 120
