<script lang="ts">
  import ChartSlot from '../base/ChartSlot.svelte'
  import EmptyState from '../base/EmptyState.svelte'
  import SiteIcon from '../base/icons/SiteIcon.svelte'
  import { navigate } from '../app/router'
  import ReactorList from '../reactors/ReactorList.svelte'
  import { siteDetailScreen } from './screen'
  import { loadSite, siteDetailState } from './store'

  type Props = {
    id: string
  }

  let { id }: Props = $props()

  $effect(() => {
    void loadSite(id)
  })

  const screen = $derived(siteDetailScreen($siteDetailState))
</script>

{#if screen.kind === 'loading'}
  <p class="text-sm text-slate-500">Loading site…</p>
{:else if screen.kind === 'empty'}
  <div class="space-y-4">
    <EmptyState message={screen.message}>
      {#snippet icon()}
        <SiteIcon class="size-10 text-slate-600" />
      {/snippet}
    </EmptyState>
    <a
      href="/"
      class="inline-block text-sm"
      onclick={(event) => {
        event.preventDefault()
        navigate('/')
      }}>Back to sites</a
    >
  </div>
{:else}
  {@const site = screen.site}
  <div class="space-y-6">
    <div>
      <a
        href="/"
        class="text-xs text-slate-500"
        onclick={(event) => {
          event.preventDefault()
          navigate('/')
        }}>Sites</a
      >
      <div class="mt-2 flex items-start gap-3">
        <SiteIcon class="mt-1 size-6 shrink-0 text-cherenkov" />
        <div class="min-w-0">
          <h2 class="text-2xl font-semibold tracking-tight text-slate-100">{site.name}</h2>
          <p class="mt-1 text-sm text-slate-400">
            {[site.location, site.state].filter(Boolean).join(' · ') || 'Location unknown'}
          </p>
        </div>
      </div>
    </div>

    <ReactorList reactors={site.reactors} />
    <ChartSlot />
  </div>
{/if}
