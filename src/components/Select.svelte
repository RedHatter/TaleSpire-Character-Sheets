<script lang="ts">
  interface Option {
    value: any
    text: string
  }

  export let items: Array<Option>
  export let label: string

  export let value: any
</script>

<label class="relative block pt-2 border-b border-gray-200">
  <div class="ml-2 text-gray-600 text-xs pointer-events-none">{label}</div>
  <select class="pr-8 pb-2 pl-1 w-full" bind:value>
    {#each items as { value, text }}
      <option {value}>{text}</option>
    {/each}
  </select>
  <div class="h-0.5 absolute right-0 bottom w-full bg-blue-500" />
  <span class="material-icons bottom-2 right-1 absolute text-gray-400">arrow_drop_down</span>
</label>

<style>
  select + div {
    transition: transform 250ms;
    transform: scaleX(0);
  }

  select:focus ~ div {
    transform: scaleX(1);
  }

  span {
    transition: transform 250ms;
    transform: rotate(0);
  }

  select:focus:hover ~ span {
    transform: rotate(180deg);
  }
</style>
