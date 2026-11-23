<script lang="ts">
  import Icon from './Icon.svelte'

  type Props = {
    class?: string
  }

  let { class: className = 'size-5 text-cherenkov' }: Props = $props()
</script>

<Icon class={className} label="reactorlog">
  <circle cx="12" cy="12" r="9" />
  <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
</Icon>
