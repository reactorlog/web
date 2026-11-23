<script lang="ts">
  import { onMount } from 'svelte'
  import EmptyState from '../base/EmptyState.svelte'
  import ListChrome from '../base/ListChrome.svelte'
  import SiteIcon from '../base/icons/SiteIcon.svelte'
  import { navigate } from '../app/router'
  import { sitesScreen } from './screen'
  import { loadSites, sitesState } from './store'

  onMount(() => {
    void loadSites()
  })

  function openSite(id: string, event: MouseEvent) {
    event.preventDefault()
    navigate(`/sites/${encodeURIComponent(id)}`)
  }

  const screen = $derived(sitesScreen($sitesState))
</script>

{#if screen.kind === 'loading'}
  <p class="text-sm text-slate-500">Loading sites…</p>
{:else if screen.kind === 'empty'}
  <EmptyState message={screen.message}>
    {#snippet icon()}
      <SiteIcon class="size-10 text-slate-600" />
    {/snippet}
  </EmptyState>
{:else}
  <ListChrome heading="Sites">
    <ul class="m-0 list-none p-0">
      {#each screen.sites as site (site.id)}
        <li>
          <a
            href={`/sites/${encodeURIComponent(site.id)}`}
            class="flex items-center justify-between gap-3 px-4 py-3 text-slate-100 no-underline hover:bg-slate-900/80"
            onclick={(event) => openSite(site.id, event)}
          >
            <span class="flex min-w-0 items-center gap-3">
              <SiteIcon class="size-4 shrink-0 text-cherenkov" />
              <span class="truncate font-medium">{site.name}</span>
            </span>
            <span class="shrink-0 text-xs text-slate-500"
              >{site.state ?? site.location ?? ''}</span
            >
          </a>
        </li>
      {/each}
    </ul>
  </ListChrome>
{/if}
