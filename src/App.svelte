<script lang="ts">
  import localforage from 'localforage'
  import { extendPrototype } from 'localforage-getitems'
  extendPrototype(localforage)

  import Main from './Main.svelte'
</script>

{#await localforage.getItems() then items}
  <Main items={Object.values(items)} />
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
