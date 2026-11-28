<script lang="ts">
  type Props = {
    class?: string
  }

  let { class: className = 'size-4 text-slate-500' }: Props = $props()
</script>

<svg
  class={className}
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path
    d="M1.2 21.8
       C2.2 15.5 3.0 10.8 3.5 7.8
       C3.8 5.4 3.3 3.6 2.9 2.6
       H8.2
       C7.8 3.6 7.3 5.4 7.6 7.8
       C8.1 10.8 8.9 15.5 9.9 21.8 Z"
  />
  <path
    d="M13.4 21.8
       C14.4 14.5 15.2 9.5 15.7 6.2
       C16.0 3.9 15.5 2.4 15.1 1.5
       H20.8
       C20.4 2.4 19.9 3.9 20.2 6.2
       C20.7 9.5 21.5 14.5 22.5 21.8 Z"
  />
  <rect x="0.6" y="21.2" width="22.8" height="1.5" rx="0.2" />
</svg>
