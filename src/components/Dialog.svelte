<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { quadOut, quadIn } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
</script>

<div
  in:fade={{ duration: 200, easing: quadIn }}
  out:fade={{ duration: 200, easing: quadOut }}
  class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
  on:click={() => dispatch('close')}
>
  <div
    on:click|stopPropagation
    in:scale={{ duration: 150, easing: quadIn, delay: 150 }}
    class="p-4 rounded bg-white shadow"
  >
    <slot />
  </div>
</div>
