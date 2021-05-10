<script lang="ts">
  import Dialog from 'smelte/src/components/Dialog'
  import TextField from 'smelte/src/components/TextField'
  import Button from 'smelte/src/components/Button'
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

<Dialog bind:value={showDialog}>
  <TextField label="Name" bind:value={feature.name} />
  <TextField label="Source" bind:value={feature.source} />
  <TextField label="Description" bind:value={feature.description} textarea />

  <div class="flex justify-between w-full" slot="actions">
    <Button text color="red" on:click={remove}>Remove</Button>
    <Button text on:click={close}>Done</Button>
  </div>
</Dialog>

<div class="p-4 border">
  {#each $data.features as feature}
    <label class="mb-4">
      <div class="relative text-lg">
        {feature.name}
        <span class="material-icons absolute right-0 text-gray-400 text-sm" on:click={() => edit(feature)}>edit</span>
      </div>
      <div class="text-sm">{feature.source}</div>
      <input type="checkbox" />
      <p class="whitespace-pre-wrap">
        {feature.description}
      </p>
    </label>
  {/each}
  <button class="w-full" on:click={add}>+</button>
  <div class="text-center">Features & Traits</div>
</div>

<style>
  input[type='checkbox'],
  input[type='checkbox'] + p {
    display: none;
  }

  input[type='checkbox']:checked + p {
    display: block;
  }
</style>
