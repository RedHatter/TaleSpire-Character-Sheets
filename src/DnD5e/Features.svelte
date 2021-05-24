<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Paper from '../components/Paper.svelte'
  import Accordion from '../components/Accordion.svelte'
  import Cog from '../components/Cog.svelte'
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

<Paper class="relative p-4" title="Features & Traits">
  <Cog bind:value={showDialog} />
  {#each data.features as feature}
    <Accordion title={feature.name} subtitle={feature.source} content={feature.description} />
  {/each}
</Paper>
