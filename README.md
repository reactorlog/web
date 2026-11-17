# reactorlog web

TypeScript SPA for browsing reactorlog sites and reactors. Talks to the sibling
[`reactorlog/api`](https://github.com/reactorlog/api) over HTTP.

## Run locally

Requires Node matching an LTS that can install the pinned Vite stack, and a
running API on `HTTP_ADDR` (default `:8080`).

```sh
cd ../api
docker compose up -d
make migrate
make ingest-nrc
make run
```

In this repo:

```sh
npm install
npm run dev
```

Vite serves the app and proxies `/api/*` to `http://127.0.0.1:8080` with the
`/api` prefix stripped, so the browser stays same-origin.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with API proxy |
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
