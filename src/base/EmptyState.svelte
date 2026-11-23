<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    message: string
    icon?: Snippet
  }

  let { message, icon }: Props = $props()
</script>

<div
  class="flex flex-col items-center justify-center gap-3 border border-line bg-panel px-6 py-16 text-center"
  role="status"
>
  {#if icon}
    <span class="text-slate-500">{@render icon()}</span>
  {/if}
  <p class="text-sm text-slate-400">{message}</p>
</div>
