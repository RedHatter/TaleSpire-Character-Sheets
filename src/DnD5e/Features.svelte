<script lang="ts">
  import Dialog from '../components/Dialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Container from '../components/Container.svelte'
  import { data, Feature } from './model'
  import type { DnD5eData } from './model'

  let showDialog = false

  let feature: Feature

  function edit(_feature: Feature) {
    feature = _feature
    showDialog = true
  }

  function add() {
    feature = new Feature()
    $data.features.push(feature)
    showDialog = true
  }

  function close() {
    $data = $data
    showDialog = false
  }

  function remove() {
    $data.features.splice($data.features.indexOf(feature), 1)
    close()
  }
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <TextField label="Name" bind:value={feature.name} />
    <TextField label="Source" bind:value={feature.source} />
    <TextField label="Description" type="textarea" class="w-96 h-72" bind:value={feature.description} />

    <div class="flex justify-between w-full" slot="actions">
      <button class="py-2 px-4 text-red-400 uppercase font-medium text-sm" on:click={remove}>Remove</button>
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}

<Container class="p-4" title="Features & Traits">
  {#each $data.features as feature}
    <label class="mb-4">
      <div class="relative text-lg">
        {feature.name}
        <span
          class="material-icons absolute right-0 text-gray-400 text-sm"
          on:click|stopPropagation={() => edit(feature)}>edit</span
        >
      </div>
      <div class="text-sm">{feature.source}</div>
      <input type="checkbox" />
      <p class="whitespace-pre-wrap">
        {feature.description}
      </p>
    </label>
  {/each}
  <button class="w-full" on:click={add}>+</button>
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
