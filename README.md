# reactorlog web

TypeScript SPA for browsing reactorlog sites and reactors. Talks to the sibling
[`reactorlog/api`](https://github.com/reactorlog/api) over HTTP.

## Run locally

Requires Node (Vite stack), Go matching `../api/go.mod`, Docker Compose, and a
sibling checkout of `reactorlog/api` at `../api` with a root `.env`.

```sh
npm install
npm run dev
```

`npm run dev` starts postgres (via `../api` compose) if needed, migrates, starts
the API on `:8080` when it is not already healthy, then runs Vite on
`http://127.0.0.1:5173`. Vite proxies `/api/*` to that API with the `/api`
prefix stripped.

Use `npm run dev:web` only when you already manage the API yourself.

Optional data load (NRC must be reachable):

```sh
cd ../api && make ingest-nrc
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Sibling API (if needed) + Vite with proxy |
| `npm run dev:web` | Vite only |
| `npm run build` | Production bundle in `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm test` | Vitest (parse + store) |
| `npm run check` | `svelte-check` and `tsc` |

## Layout

| Path | Responsibility |
| --- | --- |
| `src/app` | Shell, client router, theme tokens |
| `src/base` | PageShell, list chrome, ChartSlot |
| `src/sites` | Types, HTTP client, store, pages |
| `src/reactors` | Reactor types and list presentation |
| `scripts/dev.sh` | Local stack: api + vite |
