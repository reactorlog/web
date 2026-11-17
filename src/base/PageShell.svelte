<script lang="ts">
  import type { Snippet } from 'svelte'
  import { navigate } from '../app/router'

  type Props = {
    title: string
    healthOk: boolean | null
    children: Snippet
  }

  let { title, healthOk, children }: Props = $props()
</script>

<div class="min-h-screen bg-page text-slate-200">
  <header class="border-b border-line bg-panel">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
      <div class="flex min-w-0 items-baseline gap-3">
        <a
          href="/"
          class="text-lg font-semibold tracking-tight text-cherenkov no-underline"
          onclick={(event) => {
            event.preventDefault()
            navigate('/')
          }}>reactorlog</a
        >
        <h1 class="truncate text-sm text-slate-400">{title}</h1>
      </div>
      <p class="shrink-0 text-xs text-slate-500" aria-live="polite">
        {#if healthOk === null}
          api …
        {:else if healthOk}
          api ok
        {:else}
          <span class="text-amber">api down</span>
        {/if}
      </p>
    </div>
  </header>
  <main class="mx-auto max-w-5xl px-4 py-6">
    {@render children()}
  </main>
</div>
