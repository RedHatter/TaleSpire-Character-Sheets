<script lang="ts">
  import DnD5eSheet from './DnD5e/Sheet.svelte'
</script>

<main class="flex flex-col my-4 mx-auto container">
  <DnD5eSheet />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  label {
    cursor: pointer;
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
