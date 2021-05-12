<script lang="ts">
  export let value: string | number
  export let label: string
  export let type: string = 'text'
  export let placeholder: string = ''

  let clazz = ''
  export { clazz as class }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="{clazz} relative flex border-b border-gray-200">
  {#if type === 'number'}
    <input {placeholder} type="number" class="caret-primary-500 pt-6 px-4 pb-2 w-full" bind:value />
  {:else if type === 'textarea'}
    <textarea class="caret-primary-500 mt-8 px-4 pb-2 w-full" bind:value />
  {:else}
    <input {placeholder} class="caret-primary-500 pt-6 px-4 pb-2 w-full" bind:value />
  {/if}
  <span
    class:hasValue={value !== undefined && value !== ''}
    class="top-4 left-4 color-gray-600 absolute block text-gray-600 pointer-events-none">{label}</span
  >
  <div class="-bottom-0.5 h-0.5 absolute right-0 w-full bg-blue-500" />
</label>

<style>
  span {
    transition: transform 250ms;
    transform: scale(1) translateY(0);
  }

  input::placeholder {
    opacity: 0;
    transition: opacity 250ms;
  }

  input:focus::placeholder {
    opacity: 1;
  }

  input:focus ~ span,
  span.hasValue {
    transform: scale(0.75) translateY(-0.5rem);
    transform-origin: top left;
  }

  div {
    transition: transform 250ms;
    transform: scaleX(0);
  }

  input:focus ~ div {
    transform: scaleX(1);
  }
</style>
