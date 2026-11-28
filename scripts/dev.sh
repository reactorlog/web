#!/usr/bin/env bash
# Start the sibling reactorlog/api (if needed), then Vite.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_ROOT="$(cd "$ROOT/../api" && pwd)"
API_PID=""
STARTED_API=0

die() {
  echo "dev: $*" >&2
  exit 1
}

api_ok() {
  curl -sf --max-time 1 "http://127.0.0.1:8080/health" >/dev/null
}

cleanup() {
  if [[ "$STARTED_API" -eq 1 && -n "${API_PID}" ]]; then
    kill "$API_PID" 2>/dev/null || true
    wait "$API_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if [[ ! -d "$API_ROOT/.git" && ! -f "$API_ROOT/go.mod" ]]; then
  die "sibling api not found at ${API_ROOT}"
fi
if [[ ! -f "$API_ROOT/.env" ]]; then
  die "missing ${API_ROOT}/.env (see reactorlog/api README)"
fi

echo "dev: ensuring postgres in ${API_ROOT}"
(
  cd "$API_ROOT"
  docker compose up -d
)

if api_ok; then
  echo "dev: reusing api already healthy on :8080"
else
  echo "dev: migrating and starting sibling api on :8080"
  (
    cd "$API_ROOT"
    set -a
    # shellcheck disable=SC1091
    . ./.env
    set +a
    make migrate
  )
  (
    cd "$API_ROOT"
    set -a
    # shellcheck disable=SC1091
    . ./.env
    set +a
    exec go run ./cmd/reactorlog server
  ) &
  API_PID=$!
  STARTED_API=1

  for _ in $(seq 1 60); do
    if api_ok; then
      break
    fi
    if ! kill -0 "$API_PID" 2>/dev/null; then
      die "api process exited before becoming healthy"
    fi
    sleep 0.5
  done
  api_ok || die "api did not become healthy on :8080"
  echo "dev: api ready (pid ${API_PID})"
fi

cd "$ROOT"
echo "dev: starting vite on http://127.0.0.1:5173"
exec npx vite --host 127.0.0.1 --port 5173 "$@"
