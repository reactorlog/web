<script lang="ts">
  import Icon from './Icon.svelte'

  type Props = {
    class?: string
  }

  let { class: className = 'size-4 text-slate-500' }: Props = $props()
</script>

<Icon class={className}>
  <!-- Cooling-tower silhouette: site / plant -->
  <path d="M7 21h10" />
  <path d="M8 21V10l-2-5h12l-2 5v11" />
  <path d="M9.5 10h5" />
  <path d="M10 6.5c.6 1 1.4 1.5 2 1.5s1.4-.5 2-1.5" />
</Icon>
