<script lang="ts">
  import type { Snippet } from 'svelte'
  import { navigate } from '../app/router'
  import BrandMark from './icons/BrandMark.svelte'

  type Props = {
    title: string
    children: Snippet
  }

  let { title, children }: Props = $props()
</script>

<div class="min-h-screen bg-page text-slate-200">
  <header class="border-b border-line bg-panel">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <a
        href="/"
        class="flex min-w-0 items-center gap-2 text-lg font-semibold tracking-tight no-underline"
        onclick={(event) => {
          event.preventDefault()
          navigate('/')
        }}
      >
        <BrandMark />
        <span
          ><span class="text-cherenkov">reactor</span><span class="text-amber">log</span></span
        >
      </a>
      <h1 class="truncate text-sm text-slate-400">{title}</h1>
    </div>
  </header>
  <main class="mx-auto max-w-7xl px-4 py-6">
    {@render children()}
  </main>
</div>
