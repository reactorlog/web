<script lang="ts">
  type SeriesPoint = { t: string; v: number }

  type Props = {
    label?: string
    series?: SeriesPoint[]
  }

  let { label = 'Power series', series = [] }: Props = $props()
</script>

<section
  class="border border-line bg-panel px-4 py-6"
  aria-label={label}
>
  {#if series.length === 0}
    <p class="text-sm text-slate-500">{label}: no series yet</p>
  {:else}
    <p class="text-sm text-slate-400">{label}: {series.length} points</p>
  {/if}
</section>
