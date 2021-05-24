<script lang="ts">
  import localforage from 'localforage'
  import { range, debounce } from '../utils'
  import { deriveData, DnD5eData, AbilityType, DiceType } from './model'
  import Title from '../components/Title.svelte'
  import Attacks from './Attacks.svelte'
  import Trackers from './Trackers.svelte'
  import Features from './Features.svelte'
  import Equipment from './Equipment.svelte'
  import Tools from './Tools.svelte'
  import OtherProficiencies from './OtherProficiencies.svelte'
  import Skills from './Skills.svelte'
  import Paper from '../components/Paper.svelte'
  import Effects from './Effects.svelte'

  export let data: DnD5eData

  const setItem = debounce(data => localforage.setItem(data.uid, data), 1000)

  $: derived = deriveData(data)
  $: setItem(data)
  $: console.log(data, derived)
</script>

<div class="flex items-center mb-4">
  <label class="p-4 w-1/3 border-t border-b border-gray-200 border-l">
    <input bind:value={data.name} class="w-full" />
    Character Name
  </label>
  <Paper class="grid grid-cols-3 gap-y-2 p-4 w-2/3">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      <div class="flex w-full border-b border-gray-200">
        <input bind:value={data.playerClass} />
        <select class="flex-grow" bind:value={data.level}>
          {#each range(1, 21) as n}
            <option value={n}>{n}</option>
          {/each}
        </select>
      </div>
      <span class="text-sm">Class & Level</span>
    </label>
    <label class="col-span-2">
      <input bind:value={data.background} class="w-full border-b border-gray-200" />
      <span class="text-sm">Background</span>
    </label>
    <label>
      <input bind:value={data.race} class="w-full border-b border-gray-200" />
      <span class="text-sm">Race</span>
    </label>
    <label>
      <input bind:value={data.alignment} class="w-full border-b border-gray-200" />
      <span class="text-sm">Alignment</span>
    </label>
    <label>
      <input bind:value={data.exp} class="w-full border-b border-gray-200" />
      <span class="text-sm">Experience Points</span>
    </label>
  </Paper>
</div>
<div class="grid grid-cols-3 gap-4">
  <div class="flex flex-wrap">
    <div class="pr-2 w-1/3">
      {#each Object.entries(derived.abilityScores) as [type, ability]}
        <Paper class="mb-4">
          <label class="flex items-center flex-col">
            <span>{ability.name}</span>
            <span class="my-1 text-5xl">{ability.modifier}</span>
            <input class="text-center text-2xl" type="number" bind:value={data.abilityScores[type]} />
          </label>
        </Paper>
      {/each}
    </div>

    <div class="pl-2 w-2/3">
      <Paper class="mb-4">
        <label class="flex px-4">
          <input type="checkbox" bind:checked={data.inspiration} />
          <span class="flex-grow text-center">Inspiration</span>
        </label>
      </Paper>

      <Paper class="mb-4">
        <label class="flex px-4">
          <input class="w-6 text-center" type="number" bind:value={data.proficiency} />
          <span class="flex-grow text-center">Proficiency Bonus</span>
        </label>
      </Paper>

      <Paper class="flex flex-col mb-4 pt-6 px-6" title="Saving Throws">
        {#each Object.entries(derived.savingThrows) as [type, value]}
          <label class="flex">
            <input class="text-dark mr-4" type="checkbox" bind:checked={data.savingThrows[type]} />
            <span class="mr-4">{value.modifier}</span>
            {value.name}
          </label>
        {/each}
      </Paper>

      <Skills bind:data {derived} />
    </div>

    <Paper class="flex mb-4 px-4 w-full">
      <span class="w-12">{10 + derived.skills.perception.modifier}</span>
      <span class="flex-grow text-center">passive wisdom (perception)</span>
    </Paper>

    <Tools bind:data {derived} />
    <OtherProficiencies bind:data />
  </div>
  <div class="second">
    <Paper class="grid grid-cols-3 gap-2 text-center" area="stats">
      <div>
        <Title value="Armor Class" />
        <div class="text-5xl">{derived.armorClass}</div>
      </div>
      <div class="px-2 pb-2 border-r border-l">
        <Title value="Initiative" />
        <div class="text-5xl">{derived.abilityScores[AbilityType.DEX].modifier}</div>
      </div>
      <div>
        <Title value="Speed" />
        <div class="text-5xl">{derived.speed}</div>
      </div>
    </Paper>

    <Paper class="flex flex-col w-full text-center" area="hp">
      <label class="flex w-full">
        Hit Point Maximum
        <input class="flex-grow ml-2 border-b border-gray-200 text-center" type="number" bind:value={data.hp.max} />
      </label>
      <label>
        <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.current} />
        <Title value="Current Hit Points" />
      </label>
    </Paper>

    <Paper area="tmp" title="Temporary Hit Points" label>
      <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.temp} />
    </Paper>

    <Paper class="overflow-hidden text-center" area="hit">
      <label class="flex">
        Total
        <input
          class="overflow-hidden flex-1 ml-2 border-b border-gray-200 text-center"
          type="number"
          bind:value={data.hitDice.max}
        />
      </label>
      <input class="w-full text-center text-2xl" type="number" bind:value={data.hitDice.current} />
      Hit Dice (<select class="w-7" bind:value={data.hitDice.type}>
        {#each Object.entries(DiceType).filter(o => typeof o[1] === 'number') as [label, value]}
          <option {value}>{label}</option>
        {/each}
      </select>)
    </Paper>
    <Paper class="flex overflow-hidden flex-col justify-around px-2" area="ds" title="Death Saves">
      <div class="flex" on:click={e => (data.deathSaves.success = (data.deathSaves.success + 1) % 4)}>
        <span class="w-1/2">Success</span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.success >= 1 ? 'check_box' : 'check_box_outline_blank'}
        </span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.success >= 2 ? 'check_box' : 'check_box_outline_blank'}
        </span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.success >= 3 ? 'check_box' : 'check_box_outline_blank'}
        </span>
      </div>
      <div class="flex" on:click={e => (data.deathSaves.failure = (data.deathSaves.failure + 1) % 4)}>
        <span class="w-1/2">Failure</span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.failure >= 1 ? 'disabled_by_default' : 'check_box_outline_blank'}
        </span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.failure >= 2 ? 'disabled_by_default' : 'check_box_outline_blank'}
        </span>
        <span class="material-icons pointer-events-none">
          {data.deathSaves.failure >= 3 ? 'disabled_by_default' : 'check_box_outline_blank'}
        </span>
      </div>
    </Paper>

    <Attacks bind:data {derived} />
    <Equipment bind:data {derived} />
  </div>
  <div>
    <Effects bind:data />
    <!-- <Paper class="mb-3" title="Personality Traits">
      <textarea class="w-full" bind:value={data.traits} />
    </Paper>
    <Paper class="mb-3" title="Ideals">
      <textarea class="w-full" bind:value={data.ideals} />
    </Paper>
    <Paper class="mb-3" title="Bonds">
      <textarea class="w-full" bind:value={data.bonds} />
    </Paper>
    <Paper class="mb-3" title="Flaws">
      <textarea class="w-full" bind:value={data.flaws} />
    </Paper> -->
    <Trackers bind:data />
    <Features bind:data />
  </div>
</div>

<style>
  .second {
    @apply grid gap-4;
    justify-content: start;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, max-content);
    grid-template-areas:
      'stats stats'
      'hp hp'
      'tmp tmp'
      'hit ds'
      'atk atk'
      'inv inv';
  }
</style>
