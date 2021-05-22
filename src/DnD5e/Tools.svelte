<script lang="ts">
  import Select from '../components/Select.svelte'
  import TextField from '../components/TextField.svelte'
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import Cog from '../components/Cog.svelte'
  import { AbilityType, CustomSkill, SkillProficiencyType } from './model'
  import type { DnD5eData, DnD5eDerivedData } from './model'
  import { enumToSelect } from '../utils'
  import Container from '../components/Container.svelte'

  export let data: DnD5eData
  export let derived: DnD5eDerivedData

  let showDialog = false

  const items = enumToSelect(AbilityType)

  function close() {
    data = data
    showDialog = false
  }
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.tools} type={CustomSkill} let:index>
    <TextField class="mb-2" label="Name" placeholder="Thieves' Tools" bind:value={data.tools[index].name} />
    <div class="gap-2 flex mb-2">
      <Select
        class="flex-1"
        label="Proficient"
        items={[
          { value: SkillProficiencyType.None, text: 'None' },
          { value: SkillProficiencyType.Proficient, text: 'Proficient' },
          { value: SkillProficiencyType.Expertise, text: 'Expertise' },
          { value: SkillProficiencyType.JackOfAllTrades, text: 'Jack of All Trades' },
        ]}
        bind:value={data.tools[index].proficient}
      />
      <Select class="flex-1" label="Ability" {items} bind:value={data.tools[index].ability} />
    </div>
    <TextField class="h-72 w-96" type="textarea" label="Description" bind:value={data.tools[index].description} />
  </ConfigDialog>
{/if}

<Container class="relative mb-3 w-full" title="Tool Proficiencies & Custom Skills">
  <Cog bind:value={showDialog} />
  <div class="grid gap-2">
    <span>Tool</span><span>Pro</span><span>Ability</span><span />
    {#each data.tools as tool, key}
      <label class="contents">
        <span>{tool.name}</span>
        <span>{derived.tools[key].modifier}</span>
        <span>{derived.tools[key].ability}</span>
        <input class="hidden" type="checkbox" />
        <div class="col-span-4">{tool.description}</div>
      </label>
    {/each}
  </div>
</Container>

<style>
  .grid {
    grid-template-columns: 1fr auto 1fr auto;
  }

  input[type='checkbox']:checked + div {
    display: block;
  }

  input[type='checkbox'] + div {
    display: none;
  }
</style>
