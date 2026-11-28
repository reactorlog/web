<script lang="ts">
  type Props = {
    class?: string
  }

  let { class: className = 'size-5' }: Props = $props()
</script>

<img
  src="/favicon.svg"
  alt=""
  class={className}
  width="20"
  height="20"
  decoding="async"
/>
