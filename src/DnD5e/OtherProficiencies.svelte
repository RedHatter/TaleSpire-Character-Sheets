<script lang="ts">
  import { OtherProficiency, OtherProficiencyType } from './model'
  import type { DnD5eData } from './model'
  import { enumToSelect } from '../utils'
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import Select from '../components/Select.svelte'
  import TextField from '../components/TextField.svelte'
  import Container from '../components/Container.svelte'

  export let data: DnD5eData

  let showDialog = false

  function close() {
    data = data
    showDialog = false
  }

  const items = enumToSelect(OtherProficiencyType)
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.proficiencies} type={OtherProficiency} let:index>
    <div class="gap-2 flex mb-4">
      <Select label="Type" {items} bind:value={data.proficiencies[index].type} />
      <TextField label="Proficiency" placeholder="Common, Elvish" bind:value={data.proficiencies[index].name} />
      <TextField label="Source" placeholder="Race: Elf" bind:value={data.proficiencies[index].source} />
    </div>
  </ConfigDialog>
{/if}

<Container class="relative w-full" title="Other Proficiencies">
  <span
    class="material-icons right-2 top-2 absolute text-gray-400 text-sm cursor-pointer"
    on:click={() => (showDialog = true)}
  >
    edit
  </span>
  <div class="grid grid-cols-2">
    <span>Type</span><span>Proficiency</span>
    {#each data.proficiencies as proficiency}
      <span>{OtherProficiencyType[proficiency.type]}</span>
      <span>{proficiency.name}</span>
    {/each}
  </div>
</Container>
