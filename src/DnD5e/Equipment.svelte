<script lang="ts">
  import Dialog from '../components/Dialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Select from '../components/Select.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import Container from '../components/Container.svelte'
  import { data, derived, Item, ItemType } from './model'
  import { enumToSelect } from '../utils'

  let showDialog = false
  let item: Item

  function edit(_item: Item) {
    item = _item
    showDialog = true
  }

  function add() {
    item = new Item()
    $data.equipment.push(item)
    showDialog = true
  }

  function close() {
    $data = $data
    showDialog = false
  }

  function remove() {
    $data.equipment.splice($data.equipment.indexOf(item), 1)
    close()
  }

  const types = enumToSelect(ItemType)

  let { copper, silver, electrum, gold, platinum } = $derived.coin

  function resetCoin() {
    copper = $derived.coin.copper
    silver = $derived.coin.silver
    electrum = $derived.coin.electrum
    gold = $derived.coin.gold
    platinum = $derived.coin.platinum
  }

  $: $data.coin = copper + silver * 10 + electrum * 50 + gold * 100 + platinum * 1000
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <TextField label="name" bind:value={item.name} />
    <div class="gap-2 flex my-4">
      <TextField class="w-16" label="Count" type="number" bind:value={item.count} />
      <TextField class="w-16" label="Weight" type="number" bind:value={item.weight} />
      <Select label="Type" items={types} bind:value={item.type} />
      <Checkbox label="Equiped" disabled={item.type !== ItemType.Equipment} bind:value={item.isEquipped} />
    </div>
    <TextField class="w-96 h-72" label="description" type="textarea" bind:value={item.description} />

    <div class="flex justify-between w-full">
      <button class="py-2 px-4 text-red-400 uppercase font-medium text-sm" on:click={remove}>Remove</button>
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}
<Container area="inv" title="Equipment">
  <div class="grid grid-cols-5">
    <label>CP <input class="w-full" type="number" bind:value={copper} on:blur={resetCoin} /></label>
    <label>SP <input class="w-full" type="number" bind:value={silver} on:blur={resetCoin} /></label>
    <label>EP <input class="w-full" type="number" bind:value={electrum} on:blur={resetCoin} /></label>
    <label>GP <input class="w-full" type="number" bind:value={gold} on:blur={resetCoin} /></label>
    <label>PP <input class="w-full" type="number" bind:value={platinum} on:blur={resetCoin} /></label>
  </div>
  <div class="grid gap-2 items">
    <span>Count</span><span>Name</span><span>Weight</span><span />
    {#each $data.equipment.filter(o => o.type === ItemType.Equipment) as item}
      <label class:unequiped={!item.isEquipped} class="contents">
        <span>{item.count}</span>
        <span>{item.name}</span>
        <span>
          {item.weight}
        </span>
        <span class="material-icons ml-2 text-gray-400 text-sm" on:click={() => edit(item)}>edit</span>
        <input class="hidden" type="checkbox" />
        <span class="col-span-3">{item.description}</span>
      </label>
    {/each}
    {#each $data.equipment.filter(o => o.type === ItemType.Item) as item}
      <label class="contents">
        <span>{item.count}</span>
        <span>{item.name}</span>
        <span>
          {item.weight}
        </span>
        <span class="material-icons ml-2 text-gray-400 text-sm" on:click={() => edit(item)}>edit</span>
        <input class="hidden" type="checkbox" />
        <span class="col-span-3">{item.description}</span>
      </label>
    {/each}
  </div>
  <button on:click={add}>+</button>
  <div class="text-center">
    <div>Total Weight</div>
    <div class="text-2xl">{$derived.totalWeight}</div>
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
