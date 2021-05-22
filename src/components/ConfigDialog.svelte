<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Dialog from '../components/Dialog.svelte'
  const dispatch = createEventDispatcher()

  export let items: Array<any>
  export let type: new () => any

  let clazz = ''
  export { clazz as class }

  let selected = items.length > 0 ? 0 : -1

  function add() {
    items.push(new type())
    selected = items.length - 1
    items = items
  }

  function remove() {
    items.splice(selected, 1)
    if (selected >= items.length) selected = -1
    items = items
  }
</script>

<Dialog on:close>
  <div class="flex">
    <ul class="w-52">
      {#each items as item, i}
        <li
          class:bg-blue-50={selected === i}
          class="py-2 px-4 hover:bg-blue-100 cursor-pointer"
          on:click={() => (selected = i)}
        >
          {item.name}
        </li>
      {/each}
      <li class="py-2 px-4 hover:bg-blue-100 text-center cursor-pointer" on:click={add}>+</li>
    </ul>
    {#if selected > -1}
      <div class={clazz}>
        <slot index={selected} />
      </div>
    {:else}
      <div class="w-96 flex items-center justify-center">Select an item to the right</div>
    {/if}
  </div>
  <div class="flex justify-between p-2">
    <button class="py-2 px-4 hover:bg-blue-100 text-red-400 uppercase font-medium text-sm" on:click={remove}>
      Remove
    </button>
    <button
      class="text-primary-400 py-2 px-4 hover:bg-blue-100 uppercase font-medium text-sm"
      on:click={() => dispatch('close')}
    >
      Close
    </button>
  </div>
</Dialog>
