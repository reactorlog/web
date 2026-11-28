<script lang="ts">
  type Props = {
    class?: string
    label?: string
    children: import('svelte').Snippet
  }

  let { class: className = 'size-4', label, children }: Props = $props()
</script>

<svg
  class={className}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden={label ? undefined : true}
  role={label ? 'img' : undefined}
  aria-label={label}
>
  {@render children()}
</svg>
