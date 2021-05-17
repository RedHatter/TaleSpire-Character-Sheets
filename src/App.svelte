<script lang="ts">
  import localforage from 'localforage'
  import { extendPrototype } from 'localforage-getitems'
  extendPrototype(localforage)

  import DnD5eSheet from './DnD5e/Sheet.svelte'
  import Drawer from './components/Drawer.svelte'

  let character: number
</script>

{#await localforage.getItems() then items}
<main class="flex flex-col my-4 mx-auto container">
    <DnD5eSheet data={Object.values(items)[character ?? 0]} />
</main>
{/await}

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  label {
    cursor: pointer;
  }

  input {
    background-color: transparent;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  select {
    background: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
</style>
