<script lang="ts">
  import { fly } from 'svelte/transition'
  import { createEventDispatcher, onMount } from 'svelte'
  import { portal } from '../utils'
  const dispatch = createEventDispatcher()

  onMount(() => {
    const main = document.getElementsByTagName('main')[0]
    main.classList.add('filter', 'blur')
    return () => main.classList.remove('filter', 'blur')
  })
</script>

<div
  use:portal
  class="fixed inset-0 z-50 flex overflow-auto items-center justify-center"
  on:click={() => dispatch('close')}
>
  <div on:click|stopPropagation transition:fly={{ duration: 300, y: -50 }} class="p-4 rounded bg-white shadow">
    <slot />
  </div>
</div>
