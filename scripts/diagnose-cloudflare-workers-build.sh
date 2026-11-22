#!/usr/bin/env bash
set -euo pipefail

API="https://api.cloudflare.com/client/v4"
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
TOKEN="${CLOUDFLARE_API_TOKEN:-}"

if [[ -z "$ACCOUNT_ID" || -z "$TOKEN" ]]; then
  echo "Cloudflare diagnostics skipped: required GitHub Actions secret is unavailable."
  exit 0
fi

get_api() {
  local path="$1"
  local response status body
  response="$(curl --silent --show-error --location \
    --header "Authorization: Bearer $TOKEN" \
    --header "Content-Type: application/json" \
    --write-out $'\n%{http_code}' \
    "$API/accounts/$ACCOUNT_ID/$path")" || {
      echo "Cloudflare API request failed at transport level."
      return 1
    }
  status="${response##*$'\n'}"
  body="${response%$'\n'*}"
  if [[ "$status" != "200" ]]; then
    echo "Cloudflare API returned HTTP $status for a read-only diagnostic request."
    if [[ "$status" == "401" || "$status" == "403" ]]; then
      echo "The existing CLOUDFLARE_API_TOKEN does not have the required read permissions for Workers Builds diagnostics."
    fi
    return 1
  fi
  if ! jq -e '.success == true' >/dev/null 2>&1 <<<"$body"; then
    echo "Cloudflare API returned an unsuccessful response:"
    jq -c '{success,errors}' <<<"$body" 2>/dev/null || true
    return 1
  fi
  printf '%s' "$body"
}

echo "Checking access to the Worker script list..."
scripts="$(get_api "workers/scripts")" || exit 0
worker_tag="$(jq -r '.result[]? | select(.id == "hw-price-check") | .tag' <<<"$scripts" | head -n 1)"

if [[ -z "$worker_tag" || "$worker_tag" == "null" ]]; then
  echo "The Worker 'hw-price-check' is not visible to this token, or it does not exist in this account."
  exit 0
fi

echo "Worker found. Reading its latest Workers Build..."
builds="$(get_api "builds/workers/$worker_tag/builds")" || exit 0
build_uuid="$(jq -r '(.result // []) | if type == "array" then (.[0].build_uuid // .[0].id // empty) else (.build_uuid // .id // empty) end' <<<"$builds")"

if [[ -z "$build_uuid" || "$build_uuid" == "null" ]]; then
  echo "No Workers Build record was returned for this Worker."
  jq -c '.result' <<<"$builds" | head -c 2000
  exit 0
fi

echo "Latest build ID: $build_uuid"
logs="$(get_api "builds/builds/$build_uuid/logs")" || exit 0

echo "Latest build log (sensitive token patterns redacted):"
jq -r '.. | strings' <<<"$logs" \
  | tail -n 160 \
  | sed -E \
      -e 's/(Bearer )[A-Za-z0-9._-]+/\1[REDACTED]/g' \
      -e 's/(sk_(live|test)_)[A-Za-z0-9]+/\1[REDACTED]/g' \
      -e 's/(sb_publishable_)[A-Za-z0-9_-]+/\1[REDACTED]/g' \
      -e 's/(api[_ -]?key[=: ]+)[^ ]+/\1[REDACTED]/Ig' \
  | tail -n 100
