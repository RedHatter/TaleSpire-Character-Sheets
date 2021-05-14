<script lang="ts">
  import { data, OtherProficiency, OtherProficiencyType } from './model'
  import { enumToSelect, handDrawn } from '../utils'
  import Dialog from '../components/Dialog.svelte'
  import Select from '../components/Select.svelte'
  import TextField from '../components/TextField.svelte'

  let showDialog = false

  let proficiency: OtherProficiency

  function edit(_proficiency: OtherProficiency) {
    proficiency = _proficiency
    showDialog = true
  }

  function add() {
    proficiency = new OtherProficiency()
    $data.proficiencies.push(proficiency)
    showDialog = true
  }

  function close() {
    $data = $data
    showDialog = false
  }

  function remove() {
    $data.proficiencies.splice($data.proficiencies.indexOf(proficiency), 1)
    close()
  }

  const items = enumToSelect(OtherProficiencyType)
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <div class="gap-2 flex mb-4">
      <Select label="Type" {items} bind:value={proficiency.type} />
      <TextField label="Proficiency" placeholder="Common, Elvish" bind:value={proficiency.name} />
      <TextField label="Source" placeholder="Race: Elf" bind:value={proficiency.source} />
    </div>

    <div class="flex justify-between w-full">
      <button class="py-2 px-4 text-red-400 uppercase font-medium text-sm" on:click={remove}>Remove</button>
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}

<div class="grid p-2 w-full" use:handDrawn>
  <span>Type</span><span>Proficiency</span><span />
  {#each $data.proficiencies as proficiency}
    <span>{OtherProficiencyType[proficiency.type]}</span>
    <span>{proficiency.name}</span>
    <span class="material-icons ml-2 text-gray-400 text-sm" on:click={() => edit(proficiency)}>edit</span>
  {/each}
  <button class="col-span-3" on:click={add}>+</button>
</div>

<style>
  .grid {
    grid-template-columns: 1fr 1fr auto;
  }
</style>
