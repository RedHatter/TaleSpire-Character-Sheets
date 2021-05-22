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

  input,
  textarea {
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

  .dark {
    background-color: #121212;
    color: rgba(255, 255, 255, 0.6);
  }

  .dark * {
    border-color: rgba(255, 255, 255, 0.16);
  }

  .dark .text-gray-600 {
    color: rgba(255, 255, 255, 0.38);
  }

  .dark .bg-white {
    background-color: #121212;
  }

  .dark .shadow {
    background-color: #383838;
  }
</style>
