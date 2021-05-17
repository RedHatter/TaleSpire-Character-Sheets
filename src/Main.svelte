<script lang="ts">
  import DnD5eSheet from './DnD5e/Sheet.svelte'
  import Drawer from './components/Drawer.svelte'
  import { DnD5eData } from './DnD5e/model'

  export let items: Array<DnD5eData>

  let showDrawer = false
  let character = items[0] ?? new DnD5eData()

  function select(item: DnD5eData) {
    character = item
    showDrawer = false
  }

  function add() {
    items.push(new DnD5eData())
    items = items
  }
</script>

<button class="material-icons m-2 text-gray-200" on:click={() => (showDrawer = true)}> menu </button>

{#if showDrawer}
  <Drawer on:close={() => (showDrawer = false)}>
    <span>Characters</span>
    <ul class="ml-2">
      {#each items as item}
        <li on:click={() => select(item)}>{item.name}</li>
      {/each}
      <li on:click={add}>+</li>
    </ul>
  </Drawer>
{/if}

<main class="flex flex-col my-4 mx-auto container">
  <DnD5eSheet data={character} />
</main>
