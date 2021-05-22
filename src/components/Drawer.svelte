<script lang="ts">
  import { cubicOut } from 'svelte/easing'
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  function slide(node: Element, { delay = 0, duration = 400, easing = cubicOut } = {}) {
    return {
      delay,
      duration,
      easing,
      css: t => `transform: translate(-${(1 - t) * 100}%);`,
    }
  }

  function wrapper(node: Element, opts: any) {
    document.getElementsByTagName('main')[0].classList.remove('filter', 'blur')
    return slide(node, opts)
  }

  onMount(() => document.getElementsByTagName('main')[0].classList.add('filter', 'blur'))
</script>

<div class="fixed inset-0 z-40" on:click={() => dispatch('close')}>
  <div in:slide out:wrapper class="fixed top-0 bottom-0 left-0 p-2 w-64 bg-white shadow" on:click|stopPropagation>
    <slot />
  </div>
</div>
