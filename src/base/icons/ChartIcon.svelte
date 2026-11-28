<script lang="ts">
  import Icon from './Icon.svelte'

  type Props = {
    class?: string
  }

  let { class: className = 'size-4 text-slate-500' }: Props = $props()
</script>

<Icon class={className}>
  <path d="M4 19V5" />
  <path d="M4 19h16" />
  <path d="M8 15l3-4 3 2 4-6" />
</Icon>
