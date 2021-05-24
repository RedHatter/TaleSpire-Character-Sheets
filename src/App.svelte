<script lang="ts">
  import localforage from 'localforage'
  import { extendPrototype } from 'localforage-getitems'
  extendPrototype(localforage)

  import { theme } from './Settings.svelte'
  import Main from './Main.svelte'
</script>

<div class={$theme}>
  {#await localforage.getItems() then items}
    <Main items={Object.values(items)} />
  {/await}
</div>

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

  body {
    color: rgba(0, 0, 0, 0.82);
  }

  .text-light {
    color: rgba(0, 0, 0, 0.62);
  }

  .table {
    @apply grid gap-y-2 gap-x-4;
  }

  .table .header {
    @apply text-xs;
  }

  .material,
  .simple {
    letter-spacing: 0.01071em;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }

  .material {
    background-color: #f5f5f5;
  }

  .material .paper {
    @apply elevation-1 rounded;
    background-color: white;
  }

  .material .accordion {
    @apply elevation-1;
    background-color: white;
  }

  .material * {
    border-color: rgba(0, 0, 0, 0.08);
  }

  .simple .paper {
    @apply border rounded;
  }

  .simple .accordion {
    @apply border;
  }

  .fancy {
    font-family: 'Eczar', 'Helvetica', 'Arial', sans-serif;
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
