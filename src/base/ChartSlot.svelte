<script lang="ts">
  import ChartIcon from './icons/ChartIcon.svelte'

  type SeriesPoint = { t: string; v: number }

  type Props = {
    label?: string
    series?: SeriesPoint[]
  }

  let { label = 'Power series', series = [] }: Props = $props()
</script>

<section class="border border-line bg-panel px-4 py-6" aria-label={label}>
  {#if series.length === 0}
    <p class="flex items-center gap-2 text-sm text-slate-500">
      <ChartIcon class="size-4 text-slate-600" />
      {label}: no series yet
    </p>
  {:else}
    <p class="flex items-center gap-2 text-sm text-slate-400">
      <ChartIcon class="size-4 text-cherenkov" />
      {label}: {series.length} points
    </p>
  {/if}
</section>
