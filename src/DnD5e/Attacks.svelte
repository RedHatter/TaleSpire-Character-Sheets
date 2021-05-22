<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Select from '../components/Select.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import { Attack, AbilityType } from './model'
  import type { DnD5eData, DnD5eDerivedData } from './model'
  import { enumToSelect } from '../utils'
  import Container from '../components/Container.svelte'

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

<Container class="relative" area="atk">
  <span
    class="material-icons right-2 top-2 absolute text-gray-400 text-sm cursor-pointer"
    on:click={() => (showDialog = true)}
  >
    edit
  </span>
  <div class="grid gap-2" title="Attacks">
    <span>Name</span><span>Atk</span><span>Damage</span><span />
    {#each data.attacks as attack, i}
      <span>{attack.name}</span>
      <span>{derived.attacks[i].attackModifier}</span>
      <span>
        {derived.attacks[i].fullDamageRoll}
        {attack.damageType}
      </span>
    {/each}
  </div>
</Container>

<style>
  .grid {
    grid-template-columns: 1fr auto 1fr auto;
  }
</style>
