<script lang="ts">
  import ConfigDialog from '../components/ConfigDialog.svelte'
  import TextField from '../components/TextField.svelte'
  import Paper from '../components/Paper.svelte'
  import Cog from '../components/Cog.svelte'
  import { Effect, EffectModifier, AbilityType, OtherStats } from './model'
  import type { DnD5eData } from './model'
  import Select from '../components/Select.svelte'
  import { enumToSelect } from '../utils'
  import Accordion from '../components/Accordion.svelte'

  export let data: DnD5eData

  let showDialog = false

  function close() {
    showDialog = false
    data = data
  }

  function addModifier(effect: Effect) {
    effect.modifiers.push(new EffectModifier())
    data = data
  }

  function removeModifier(effect: Effect, index: number) {
    effect.modifiers.splice(index, 1)
    data = data
  }

  const items = enumToSelect(AbilityType)
</script>

{#if showDialog}
  <ConfigDialog on:close={close} bind:items={data.effects} type={Effect} let:index class="flex">
    <div>
      <TextField label="Name" bind:value={data.effects[index].name} />
      <TextField label="Source" bind:value={data.effects[index].source} />
      <TextField label="Duration" bind:value={data.effects[index].duration} />
      <TextField label="Description" type="textarea" class="h-72 w-96" bind:value={data.effects[index].description} />
    </div>
    <div class="m-4">
      <span>Stat Modifiers</span>
      <ul class="w-60">
        {#each data.effects[index].modifiers as modifier, i}
          <li class="flex items-center">
            <Select
              class="mr-2"
              label="Stat"
              items={[
                {
                  text: 'Ability Scores',
                  items,
                },
                {
                  text: 'Other Stats',
                  items: [
                    { text: 'Armor Class', value: OtherStats.AC },
                    { text: 'Speed', value: OtherStats.SPEED },
                  ],
                },
              ]}
              bind:value={modifier.stat}
            />
            =
            <TextField label="Expression" placeholder="STR + 2" bind:value={modifier.expr} />
            <span class="material-icons text-sm cursor-pointer" on:click={() => removeModifier(data.effects[index], i)}>
              clear
            </span>
          </li>
        {/each}
        <li
          class="py-2 px-4 hover:bg-blue-100 text-center cursor-pointer"
          on:click={() => addModifier(data.effects[index])}
        >
          +
        </li>
      </ul>
    </div>
  </ConfigDialog>
{/if}

<Paper class="relative mb-4 p-4" title="Active Effects">
  <Cog bind:value={showDialog} />
  {#each data.effects as effect}
    <Accordion title={effect.name} subtitle="{effect.source} ({effect.duration})" content={effect.description} />
  {/each}
</Paper>
