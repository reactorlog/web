<script lang="ts">
  import ChartSlot from '../base/ChartSlot.svelte'
  import { navigate } from '../app/router'
  import ReactorList from '../reactors/ReactorList.svelte'
  import { loadSite, siteDetailState } from './store'

  type Props = {
    id: string
  }

  let { id }: Props = $props()

  $effect(() => {
    void loadSite(id)
  })
</script>

{#if $siteDetailState.status === 'loading' || $siteDetailState.status === 'idle'}
  <p class="text-sm text-slate-500">Loading site…</p>
{:else if $siteDetailState.status === 'error'}
  <div class="space-y-3">
    <p class="text-sm text-amber">{$siteDetailState.message}</p>
    {#if $siteDetailState.message === 'site not found'}
      <a
        href="/"
        class="text-sm"
        onclick={(event) => {
          event.preventDefault()
          navigate('/')
        }}>Back to sites</a
      >
    {:else}
      <button
        type="button"
        class="border border-line bg-panel px-3 py-1.5 text-sm text-cherenkov hover:border-cherenkov"
        onclick={() => void loadSite(id)}
      >
        Retry
      </button>
    {/if}
  </div>
{:else}
  {@const site = $siteDetailState.data}
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
      <h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-100">{site.name}</h2>
      <p class="mt-1 text-sm text-slate-400">
        {[site.location, site.state].filter(Boolean).join(' · ') || 'Location unknown'}
      </p>
    </div>

    <ReactorList reactors={site.reactors} />
    <ChartSlot />
  </div>
{/if}
