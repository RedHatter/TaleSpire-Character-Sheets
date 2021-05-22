<script lang="ts">
  import { fly } from 'svelte/transition'
  import { createEventDispatcher, onMount } from 'svelte'
  import { portal } from '../utils'
  const dispatch = createEventDispatcher()

  let clazz = ''
  export { clazz as class }

  onMount(() => {
    document.getElementsByTagName('main')[0].classList.add('filter', 'blur')
    history.pushState('dialog', null)
  })

  function wrapper(node: Element, opts: any) {
    document.getElementsByTagName('main')[0].classList.remove('filter', 'blur')
    if (history.state === 'dialog') history.back()

    return fly(node, opts)
  }

  function close() {
    dispatch('close')
  }
</script>

<svelte:window on:keydown={e => e.key == 'Escape' && close()} on:popstate={close} />

<div use:portal class="fixed inset-0 z-50 flex overflow-auto items-center justify-center" on:click={close}>
  <div
    on:click|stopPropagation
    in:fly={{ duration: 300, y: -50 }}
    out:wrapper={{ duration: 300, y: -50 }}
    class="{clazz} rounded bg-white shadow"
  >
    <slot />
  </div>
</div>
