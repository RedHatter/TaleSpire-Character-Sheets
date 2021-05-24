<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Select from '../components/Select.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import Cog from '../components/Cog.svelte'
  import { Attack, AbilityType } from './model'
  import type { DnD5eData, DnD5eDerivedData } from './model'
  import { enumToSelect } from '../utils'
  import Paper from '../components/Paper.svelte'

  export let data: DnD5eData
  export let derived: DnD5eDerivedData

  let showDialog = false

  function close() {
    data = data
    showDialog = false
  }

  const items = enumToSelect(AbilityType)
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.attacks} type={Attack} let:index>
    <TextField label="Name" bind:value={data.attacks[index].name} />
    <div class="mt-6">Attack Roll</div>
    <div class="gap-2 flex items-center mb-2">
      <Select label="Ability" {items} bind:value={data.attacks[index].attackAbility} />
      +
      <TextField class="w-20" type="number" label="Modifier" bind:value={data.attacks[index].attackModifier} />
      +
      <Checkbox label="Proficient" bind:value={data.attacks[index].proficient} />
    </div>

    <div class="mt-6">Damage</div>
    <div class="gap-2 flex items-center mb-2">
      <TextField class="w-20" label="Dice" placeholder="2d6" bind:value={data.attacks[index].damageRoll} />
      +
      <Select label="Ability" {items} bind:value={data.attacks[index].damageAbility} />
      +
      <TextField class="w-20" type="number" label="Modifier" bind:value={data.attacks[index].damageModifier} />
    </div>
    <div class="gap-2 flex">
      <TextField class="flex-1 w-0" label="Type" placeholder="Slashing" bind:value={data.attacks[index].damageType} />
      <TextField class="flex-1 w-0" label="Range" bind:value={data.attacks[index].range} />
    </div>
  </ConfigDialog>
{/if}

<Paper class="relative" area="atk" title="Attacks">
  <Cog bind:value={showDialog} />
  <div class="table">
    <span class="header">Name</span><span class="header">Atk</span><span class="header">Damage</span>
    {#each data.attacks as attack, i}
      <span>{attack.name}</span>
      <span>{derived.attacks[i].attackModifier}</span>
      <span>
        {derived.attacks[i].fullDamageRoll}
        {attack.damageType}
      </span>
    {/each}
  </div>
</Paper>

<style>
  .table {
    grid-template-columns: 1fr auto 1fr;
  }
</style>
