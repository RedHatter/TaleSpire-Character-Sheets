<script context="module" lang="ts">
  import { writable } from 'svelte/store'

  export enum Theme {
    SIMPLE = 'simple',
    FANCY = 'fancy',
  }

  export const theme = writable(Theme.SIMPLE)
</script>

<script lang="ts">
  import Dialog from './components/Dialog.svelte'
  import Select from './components/Select.svelte'
  import Checkbox from './components/Checkbox.svelte'

  let darkmode = false
  $: document.body.classList.toggle('dark', darkmode)
</script>

<Dialog on:close class="flex">
  <Select
    label="Theme"
    items={[
      { text: 'Simple', value: Theme.SIMPLE },
      { text: 'Fancy', value: Theme.FANCY },
    ]}
    bind:value={$theme}
  />
  <Checkbox label="Dark Mode" bind:value={darkmode} />
</Dialog>
