<script lang="ts">
  import localforage from 'localforage'
  import { range, debounce } from '../utils'
  import { deriveData, DnD5eData, AbilityType, DiceType } from './model'
  import Attacks from './Attacks.svelte'
  import Trackers from './Trackers.svelte'
  import Features from './Features.svelte'
  import Equipment from './Equipment.svelte'
  import Tools from './Tools.svelte'
  import OtherProficiencies from './OtherProficiencies.svelte'
  import Skills from './Skills.svelte'
  import Container from '../components/Container.svelte'

  export let data: DnD5eData = new DnD5eData()

  const setItem = debounce(data => localforage.setItem(data.uid, data), 1000)

  $: derived = deriveData(data)
  $: setItem(data)
  $: console.log(data, derived)
</script>

<div class="flex items-center mb-3">
  <label class="p-4 w-1/3 border-t border-b border-gray-200 border-l">
    <input bind:value={data.name} class="w-full" />
    Character Name
  </label>
  <Container class="flex flex-wrap p-4 w-2/3">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="w-1/3">
      <div class="w-full border-b border-gray-200">
        <input bind:value={data.playerClass} />
        <select bind:value={data.level}>
          {#each range(1, 21) as n}
            <option value={n}>{n}</option>
          {/each}
        </select>
      </div>
      Class & Level
    </label>
    <label class="w-2/3">
      <input bind:value={data.background} class="w-full border-b border-gray-200" />
      Background
    </label>
    <label class="w-1/3">
      <input bind:value={data.race} class="w-full border-b border-gray-200" />
      Race
    </label>
    <label class="w-1/3">
      <input bind:value={data.alignment} class="w-full border-b border-gray-200" />
      Alignment
    </label>
    <label class="w-1/3">
      <input bind:value={data.exp} class="w-full border-b border-gray-200" />
      Experience Points
    </label>
  </Container>
</div>
<div class="grid grid-cols-3 gap-3">
  <div class="flex flex-wrap">
    <div class="pr-1.5 w-1/3">
      {#each Object.entries(derived.abilityScores) as [type, ability]}
        <Container class="mb-6">
          <label class="flex items-center flex-col">
            <span>{ability.name}</span>
            <span class="text-5xl">{ability.modifier}</span>
            <input
              class="-bottom-2 relative w-12 border border-gray-200 bg-white text-center text-2xl"
              type="number"
              bind:value={data.abilityScores[type]}
            />
          </label>
        </Container>
      {/each}
    </div>

    <div class="pl-1.5 w-2/3">
      <Container class="mb-3">
        <label class="flex px-4">
          <input type="checkbox" bind:checked={data.inspiration} />
          <span class="flex-grow text-center">Inspiration</span>
        </label>
      </Container>

      <Container class="mb-3">
        <label class="flex px-4">
          <input class="w-6 text-center" type="number" bind:value={data.proficiency} />
          <span class="flex-grow text-center">Proficiency Bonus</span>
        </label>
      </Container>

      <Container class="flex flex-col mb-3 pt-6 px-6" title="Saving Throws">
        {#each Object.entries(derived.savingThrows) as [type, value]}
          <label class="flex">
            <input class="mr-4" type="checkbox" bind:checked={data.savingThrows[type]} />
            <span class="mr-4">{value.modifier}</span>
            {value.name}
          </label>
        {/each}
      </Container>

      <Skills bind:data {derived} />
    </div>

    <Container class="flex mb-3 px-4 w-full">
      <span class="w-12">{10 + derived.skills.perception.modifier}</span>
      <span class="flex-grow text-center">passive wisdom (perception)</span>
    </Container>

    <Tools bind:data {derived} />
    <OtherProficiencies bind:data />
  </div>
  <div class="second">
    <Container area="ac" title="Armor Class" label>
      <input class="w-full text-center text-5xl" type="number" bind:value={data.armorClass} />
    </Container>
    <Container class="py-2 text-center" area="in" title="Initiative">
      <div class="w-full text-5xl">{derived.abilityScores[AbilityType.DEX].modifier}</div>
    </Container>
    <Container area="speed" title="Speed" label>
      <input class="w-full text-center text-5xl" type="number" bind:value={data.speed} />
    </Container>

    <Container class="flex flex-col w-full text-center" area="hp">
      <label class="flex w-full">
        Hit Point Maximum
        <input class="flex-grow ml-2 border-b border-gray-200 text-center" type="number" bind:value={data.hp.max} />
      </label>
      <label>
        <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.current} />
        Current Hit Points
      </label>
    </Container>

    <Container area="tmp" title="Temporary Hit Points" label>
      <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.temp} />
    </Container>

    <Container class="overflow-hidden text-center" area="hit">
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
    </Container>
    <Container class="flex overflow-hidden flex-col justify-around px-2" area="ds" title="Death Saves">
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
    </Container>

    <Attacks bind:data {derived} />
    <Equipment bind:data {derived} />
  </div>
  <div>
    <Container class="mb-3" title="Personality Traits">
      <textarea class="w-full" bind:value={data.traits} />
    </Container>
    <Container class="mb-3" title="Ideals">
      <textarea class="w-full" bind:value={data.ideals} />
    </Container>
    <Container class="mb-3" title="Bonds">
      <textarea class="w-full" bind:value={data.bonds} />
    </Container>
    <Container class="mb-3" title="Flaws">
      <textarea class="w-full" bind:value={data.flaws} />
    </Container>
    <Trackers bind:data />
    <Features bind:data />
  </div>
</div>

<style>
  .second {
    @apply grid gap-3;
    justify-content: start;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, max-content);
    grid-template-areas:
      'ac ac in in speed speed'
      'hp hp hp hp hp hp'
      'tmp tmp tmp tmp tmp tmp'
      'hit hit hit ds ds ds'
      'atk atk atk atk atk atk'
      'inv inv inv inv inv inv';
  }
</style>
