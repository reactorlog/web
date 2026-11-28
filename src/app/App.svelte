<script lang="ts">
  import { onMount } from 'svelte'
  import PageShell from '../base/PageShell.svelte'
  import SiteDetailPage from '../sites/SiteDetailPage.svelte'
  import SitesListPage from '../sites/SitesListPage.svelte'
  import { route, startRouter } from './router'

  onMount(() => startRouter())

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

<PageShell title={titleFor($route.name)}>
  {#if $route.name === 'sites'}
    <SitesListPage />
  {:else if $route.name === 'site'}
    <SiteDetailPage id={$route.id} />
  {:else}
    <div class="space-y-2">
      <p class="text-sm text-slate-400">That path is not a page.</p>
      <a href="/" class="text-sm">Back to sites</a>
    </div>
  {/if}
</PageShell>
