<script lang="ts">
  import { onMount } from 'svelte'
  import PageShell from '../base/PageShell.svelte'
  import SiteDetailPage from '../sites/SiteDetailPage.svelte'
  import SitesListPage from '../sites/SitesListPage.svelte'
  import { fetchHealth } from '../sites/client'
  import { route, startRouter } from './router'

  let healthOk = $state<boolean | null>(null)

  onMount(() => {
    const stop = startRouter()
    void refreshHealth()
    const timer = window.setInterval(() => {
      void refreshHealth()
    }, 30_000)
    return () => {
      stop()
      window.clearInterval(timer)
    }
  })

  async function refreshHealth() {
    healthOk = await fetchHealth()
  }

  function titleFor(name: string): string {
    if (name === 'sites') {
      return 'Sites'
    }
    if (name === 'site') {
      return 'Site'
    }
    return 'Not found'
  }
</script>

<PageShell title={titleFor($route.name)} {healthOk}>
  {#if $route.name === 'sites'}
    <SitesListPage />
  {:else if $route.name === 'site'}
    <SiteDetailPage id={$route.id} />
  {:else}
    <div class="space-y-2">
      <p class="text-sm text-amber">That path is not a page.</p>
      <a href="/" class="text-sm">Back to sites</a>
    </div>
  {/if}
</PageShell>
