<script lang="ts">
  import { onMount } from 'svelte'
  import ListChrome from '../base/ListChrome.svelte'
  import { navigate } from '../app/router'
  import { loadSites, sitesState } from './store'

  onMount(() => {
    void loadSites()
  })

  function openSite(id: string, event: MouseEvent) {
    event.preventDefault()
    navigate(`/sites/${encodeURIComponent(id)}`)
  }
</script>

{#if $sitesState.status === 'loading' || $sitesState.status === 'idle'}
  <p class="text-sm text-slate-500">Loading sites…</p>
{:else if $sitesState.status === 'error'}
  <div class="space-y-3">
    <p class="text-sm text-amber">{$sitesState.message}</p>
    <button
      type="button"
      class="border border-line bg-panel px-3 py-1.5 text-sm text-cherenkov hover:border-cherenkov"
      onclick={() => void loadSites()}
    >
      Retry
    </button>
  </div>
{:else if $sitesState.data.length === 0}
  <p class="text-sm text-slate-500">No sites yet. Run the API ingest, then retry.</p>
{:else}
  <ListChrome heading="Sites">
    <ul class="m-0 list-none p-0">
      {#each $sitesState.data as site (site.id)}
        <li>
          <a
            href={`/sites/${encodeURIComponent(site.id)}`}
            class="flex items-baseline justify-between gap-3 px-4 py-3 text-slate-100 no-underline hover:bg-slate-900/80"
            onclick={(event) => openSite(site.id, event)}
          >
            <span class="font-medium">{site.name}</span>
            <span class="text-xs text-slate-500">{site.state ?? site.location ?? ''}</span>
          </a>
        </li>
      {/each}
    </ul>
  </ListChrome>
{/if}
