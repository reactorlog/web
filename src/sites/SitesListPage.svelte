<script lang="ts">
  import { onMount } from 'svelte'
  import EmptyState from '../base/EmptyState.svelte'
  import SiteIcon from '../base/icons/SiteIcon.svelte'
  import { navigate } from '../app/router'
  import {
    SITES_NO_MATCH_MESSAGE,
    buildSitesListModel,
    sitesScreen,
    type SitesControls,
  } from './screen'
  import { loadSites, sitesState } from './store'
  import type { Site } from './types'

  onMount(() => {
    void loadSites()
  })

  let query = $state('')
  let stateFilter = $state<'all' | string>('all')

  const screen = $derived(sitesScreen($sitesState))
  const controls = $derived<SitesControls>({ query, stateFilter })
  const model = $derived(
    screen.kind === 'list' ? buildSitesListModel(screen.sites, controls) : null,
  )

  function openSite(id: string, event: MouseEvent) {
    event.preventDefault()
    navigate(`/sites/${encodeURIComponent(id)}`)
  }

  function locationLabel(site: Site): string {
    return [site.city, site.state].filter(Boolean).join(' · ')
  }

  function reactorLabel(count: number): string {
    if (count === 1) {
      return '1 reactor'
    }
    return `${count} reactors`
  }
</script>

{#if screen.kind === 'loading'}
  <p class="text-sm text-slate-500">Loading sites…</p>
{:else if screen.kind === 'empty'}
  <EmptyState message={screen.message}>
    {#snippet icon()}
      <SiteIcon class="size-10 text-slate-600" />
    {/snippet}
  </EmptyState>
{:else if model}
  <div class="space-y-4">
    <div class="flex flex-col gap-3 md:flex-row md:items-center">
      <input
        class="w-full border border-line bg-panel px-3 py-2.5 text-sm text-zinc-100 placeholder:text-slate-500 outline-none focus:border-cherenkov"
        type="search"
        placeholder="Filter by name or state"
        autocomplete="off"
        bind:value={query}
      />
      <label class="sr-only" for="sites-state-filter">State</label>
      <select
        id="sites-state-filter"
        class="sites-state-filter w-full border border-line py-2.5 pl-3 pr-11 text-sm text-zinc-100 outline-none focus:border-cherenkov md:w-auto md:min-w-32"
        bind:value={stateFilter}
      >
        <option value="all">All states</option>
        {#each model.facetStates as state (state)}
          <option value={state}>{state}</option>
        {/each}
      </select>
    </div>

    {#if model.noMatches}
      <p class="text-sm text-slate-500">{SITES_NO_MATCH_MESSAGE}</p>
    {:else}
      <ul
        class="m-0 list-none divide-y divide-line border border-line bg-panel p-0 md:grid md:grid-cols-2 md:gap-3 md:divide-y-0 md:border-0 md:bg-transparent lg:grid-cols-3"
      >
        {#each model.visible as site (site.id)}
          {@const place = locationLabel(site)}
          <li class="md:border md:border-line md:bg-panel">
            <a
              href={`/sites/${encodeURIComponent(site.id)}`}
              class="flex items-center justify-between gap-3 px-4 py-3 text-zinc-100 no-underline hover:bg-white/5 md:block md:min-h-18"
              onclick={(event) => openSite(site.id, event)}
            >
              <span class="flex min-w-0 items-center gap-3 md:mb-1 md:items-start">
                <SiteIcon class="size-4 shrink-0 text-cherenkov md:mt-0.5" />
                <span class="truncate font-medium">{site.name}</span>
              </span>
              <span class="shrink-0 text-xs text-slate-500 md:pl-7">
                {#if place}
                  <span class="block">{place}</span>
                {/if}
                <span class="block">{reactorLabel(site.reactor_count)}</span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}

<style>
  /* Native select arrows ignore padding; own the mark so inset is real. */
  :global(select.sites-state-filter) {
    appearance: none;
    -webkit-appearance: none;
    background-color: var(--color-panel);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m4 6 4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1.25rem center;
    background-size: 1rem 1rem;
  }
</style>
