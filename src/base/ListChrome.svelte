<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    heading: string
    children: Snippet
  }

  let { heading, children }: Props = $props()
</script>

<section>
  <h2 class="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">{heading}</h2>
  <div class="divide-y divide-line border border-line bg-panel">
    {@render children()}
  </div>
</section>
