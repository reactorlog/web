<script lang="ts">
  import Icon from './Icon.svelte'

  type Props = {
    class?: string
  }

  let { class: className = 'size-4 text-slate-500' }: Props = $props()
</script>

<Icon class={className}>
  <!-- Containment / unit glyph -->
  <circle cx="12" cy="12" r="3" />
  <ellipse cx="12" cy="12" rx="8" ry="3.5" transform="rotate(60 12 12)" />
  <ellipse cx="12" cy="12" rx="8" ry="3.5" transform="rotate(-60 12 12)" />
  <ellipse cx="12" cy="12" rx="8" ry="3.5" />
</Icon>
