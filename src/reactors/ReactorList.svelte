<script lang="ts">
  import type { Reactor } from './types'
  import ListChrome from '../base/ListChrome.svelte'

  type Props = {
    reactors: Reactor[]
  }

  let { reactors }: Props = $props()
</script>

<ListChrome heading="Reactors">
  {#if reactors.length === 0}
    <p class="px-4 py-3 text-sm text-slate-500">No reactors for this site.</p>
  {:else}
    <ul class="list-none p-0 m-0">
      {#each reactors as reactor (reactor.id)}
        <li class="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
          <div>
            <p class="text-sm text-slate-100">
              Unit {reactor.unit_number}
              <span class="text-slate-500">·</span>
              {reactor.reactor_type}
            </p>
            <p class="font-mono text-xs text-slate-500">docket {reactor.docket_number}</p>
          </div>
          {#if reactor.design}
            <p class="text-xs text-slate-400">{reactor.design}</p>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</ListChrome>
