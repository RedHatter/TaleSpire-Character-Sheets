<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Container from '../components/Container.svelte'
  import { Feature } from './model'
  import type { DnD5eData } from './model'

  export let data: DnD5eData

  let showDialog = false

  function close() {
    data = data
    showDialog = false
  }
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.features} type={Feature} let:index>
    <TextField label="Name" bind:value={data.features[index].name} />
    <TextField label="Source" bind:value={data.features[index].source} />
    <TextField label="Description" type="textarea" class="h-72 w-96" bind:value={data.features[index].description} />
  </ConfigDialog>
{/if}

<Container class="relative p-4" title="Features & Traits">
  <span
    class="material-icons right-2 top-2 absolute text-gray-400 text-sm cursor-pointer"
    on:click={() => (showDialog = true)}
  >
    edit
  </span>
  {#each data.features as feature}
    <label class="mb-4">
      <div class="text-lg">{feature.name}</div>
      <div class="text-sm">{feature.source}</div>
      <input type="checkbox" />
      <p class="whitespace-pre-wrap">{feature.description}</p>
    </label>
  {/each}
</Container>

<style>
  input[type='checkbox'],
  input[type='checkbox'] + p {
    display: none;
  }

  input[type='checkbox']:checked + p {
    display: block;
  }
</style>
