<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Select from '../components/Select.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import Container from '../components/Container.svelte'
  import Cog from '../components/Cog.svelte'
  import { Item, ItemType } from './model'
  import type { DnD5eData, DnD5eDerivedData } from './model'
  import { enumToSelect } from '../utils'

  export let data: DnD5eData
  export let derived: DnD5eDerivedData

  let showDialog = false

  function close() {
    data = data
    showDialog = false
  }

  const types = enumToSelect(ItemType)

  let { copper, silver, electrum, gold, platinum } = derived.coin

  function resetCoin() {
    copper = derived.coin.copper
    silver = derived.coin.silver
    electrum = derived.coin.electrum
    gold = derived.coin.gold
    platinum = derived.coin.platinum
  }

  $: data.coin = copper + silver * 10 + electrum * 50 + gold * 100 + platinum * 1000
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.equipment} type={Item} let:index>
    <TextField label="name" bind:value={data.equipment[index].name} />
    <div class="gap-2 flex my-4">
      <TextField class="w-16" label="Count" type="number" bind:value={data.equipment[index].count} />
      <TextField class="w-16" label="Weight" type="number" bind:value={data.equipment[index].weight} />
      <Select label="Type" items={types} bind:value={data.equipment[index].type} />
      <Checkbox
        label="Equiped"
        disabled={data.equipment[index].type !== ItemType.Equipment}
        bind:value={data.equipment[index].isEquipped}
      />
    </div>
    <TextField class="h-72 w-96" label="description" type="textarea" bind:value={data.equipment[index].description} />
  </ConfigDialog>
{/if}
<Container class="relative" area="inv" title="Equipment">
  <Cog bind:value={showDialog} />
  <div class="grid grid-cols-5">
    <label>CP <input class="w-full" type="number" bind:value={copper} on:blur={resetCoin} /></label>
    <label>SP <input class="w-full" type="number" bind:value={silver} on:blur={resetCoin} /></label>
    <label>EP <input class="w-full" type="number" bind:value={electrum} on:blur={resetCoin} /></label>
    <label>GP <input class="w-full" type="number" bind:value={gold} on:blur={resetCoin} /></label>
    <label>PP <input class="w-full" type="number" bind:value={platinum} on:blur={resetCoin} /></label>
  </div>
  <div class="grid gap-2 items">
    <span>Count</span><span>Name</span><span>Weight</span><span />
    {#each data.equipment.filter(o => o.type === ItemType.Equipment) as item}
      <label class:unequiped={!item.isEquipped} class="contents">
        <span>{item.count}</span>
        <span>{item.name}</span>
        <span>
          {item.weight}
        </span>
        <input class="hidden" type="checkbox" />
        <span class="col-span-3">{item.description}</span>
      </label>
    {/each}
    {#each data.equipment.filter(o => o.type === ItemType.Item) as item}
      <label class="contents">
        <span>{item.count}</span>
        <span>{item.name}</span>
        <span>
          {item.weight}
        </span>
        <input class="hidden" type="checkbox" />
        <span class="col-span-3">{item.description}</span>
      </label>
    {/each}
  </div>
  <div class="text-center">
    <div>Total Weight</div>
    <div class="text-2xl">{derived.totalWeight}</div>
  </div>
</Container>

<style>
  .items {
    grid-template-columns: auto 1fr auto auto;
  }

  .unequiped span {
    opacity: 0.5;
  }

  input[type='checkbox'] + span {
    display: none;
  }

  input[type='checkbox']:checked + span {
    display: block;
  }
</style>
