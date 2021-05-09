<script lang="ts">
  import DnD5eSheet from './DnD5e/Sheet.svelte'
</script>

<main class="container mx-auto flex flex-col my-4">
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
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: none;
    cursor: pointer;
  }
</style>
