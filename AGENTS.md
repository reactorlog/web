# Project stage

Pre-release sibling of `reactorlog/api`. Prefer the smallest change that keeps
the HTTP contract honest. Do not invent parallel schemas in this repo.

# Source of truth

This app consumes the plant-list HTTP API. Authoritative definitions live in the
sibling checkout at `../api` (GitHub `reactorlog/api`), not in this tree.

| Concern | Path in `../api` |
| --- | --- |
| JSON response shapes | `internal/api/types.go` |
| Routes and status codes | `internal/api/handler.go` |
| SQL / store queries behind the API | `internal/api/store.go` and embedded SQL there |
| Database schema | `migrations/sql/` |
| Local API runbook | `README.md` |

When changing `src/sites/**` or `src/reactors/**` parsers, clients, stores, or
pages, re-read the matching `../api` files first and update the TypeScript
mirrors and tests in the same change. Do not treat the web types as the
schema.

Dev proxy: Vite rewrites `/api/*` to `http://127.0.0.1:8080/*`.
