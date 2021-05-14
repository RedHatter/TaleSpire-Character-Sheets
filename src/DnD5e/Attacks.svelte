<script lang="ts">
  import Dialog from '../components/Dialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Select from '../components/Select.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import { data, derived, Attack, AbilityType } from './model'
  import { enumToSelect, handDrawn } from '../utils'

  let showDialog = false

  let attack: Attack

  function edit(_attack: Attack) {
    attack = _attack
    showDialog = true
  }

  function add() {
    attack = new Attack()
    $data.attacks.push(attack)
    showDialog = true
  }

  function close() {
    $data = $data
    showDialog = false
  }

  function remove() {
    $data.attacks.splice($data.attacks.indexOf(attack), 1)
    close()
  }

  const items = enumToSelect(AbilityType)
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <TextField label="Name" bind:value={attack.name} />
    <div class="mt-6">Attack Roll</div>
    <div class="gap-2 flex items-center mb-2">
      <Select label="Ability" {items} bind:value={attack.attackAbility} />
      +
      <TextField class="w-20" type="number" label="Modifier" bind:value={attack.attackModifier} />
      +
      <Checkbox label="Proficient" bind:value={attack.proficient} />
    </div>

    <div class="mt-6">Damage</div>
    <div class="gap-2 flex items-center mb-2">
      <TextField class="w-20" label="Dice" placeholder="2d6" bind:value={attack.damageRoll} />
      +
      <Select label="Ability" {items} bind:value={attack.damageAbility} />
      +
      <TextField class="w-20" type="number" label="Modifier" bind:value={attack.damageModifier} />
    </div>
    <div class="gap-2 flex">
      <TextField class="flex-1 w-0" label="Type" placeholder="Slashing" bind:value={attack.damageType} />
      <TextField class="flex-1 w-0" label="Range" bind:value={attack.range} />
    </div>

    <div class="flex justify-between w-full">
      <button class="py-2 px-4 text-red-400 uppercase font-medium text-sm" on:click={remove}>Remove</button>
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}

<div class="grid gap-2 relative mb-3 p-2" use:handDrawn>
  <span>Name</span><span>Atk</span><span>Damage</span><span />
  {#each $data.attacks as attack, i}
    <span>{attack.name}</span>
    <span>{$derived.attacks[i].attackModifier}</span>
    <span>
      {$derived.attacks[i].fullDamageRoll}
      {attack.damageType}
    </span>
    <span class="material-icons ml-2 text-gray-400 text-sm" on:click={() => edit(attack)}>edit</span>
  {/each}
  <button class="col-span-3" on:click={add}>+</button>
  <span class="col-span-3 text-center">Attacks</span>
</div>

<style>
  .grid {
    grid-template-columns: 1fr auto 1fr auto;
  }
</style>
