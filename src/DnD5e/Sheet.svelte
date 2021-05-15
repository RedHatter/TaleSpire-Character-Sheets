<script>
  import { range } from '../utils'
  import { AbilityType, CustomSkill, data, derived, DiceType } from './model'
  import Attacks from './Attacks.svelte'
  import Trackers from './Trackers.svelte'
  import Features from './Features.svelte'
  import Equipment from './Equipment.svelte'
  import Tools from './Tools.svelte'
  import OtherProficiencies from './OtherProficiencies.svelte'
  import Skills from './Skills.svelte'
  import Container from '../components/Container.svelte'

  $: console.log($data)
</script>

<div class="flex items-center mb-3">
  <label class="p-4 w-1/3 border-t border-b border-gray-200 border-l">
    <input bind:value={$data.name} class="w-full" />
    Character Name
  </label>
  <Container class="flex flex-wrap p-4 w-2/3">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="w-1/3">
      <div class="w-full border-b border-gray-200">
        <input bind:value={$data.playerClass} />
        <select bind:value={$data.level}>
          {#each range(1, 21) as n}
            <option value={n}>{n}</option>
          {/each}
        </select>
      </div>
      Class & Level
    </label>
    <label class="w-2/3">
      <input bind:value={$data.background} class="w-full border-b border-gray-200" />
      Background
    </label>
    <label class="w-1/3">
      <input bind:value={$data.race} class="w-full border-b border-gray-200" />
      Race
    </label>
    <label class="w-1/3">
      <input bind:value={$data.alignment} class="w-full border-b border-gray-200" />
      Alignment
    </label>
    <label class="w-1/3">
      <input bind:value={$data.exp} class="w-full border-b border-gray-200" />
      Experience Points
    </label>
  </Container>
</div>
<div class="flex">
  <div class="pr-1.5 flex flex-1 flex-wrap">
    <div class="pr-1.5 w-1/3">
      {#each Object.entries($derived.abilityScores) as [type, ability]}
        <Container class="mb-6">
          <label class="flex items-center flex-col">
            <span>{ability.name}</span>
            <span class="text-5xl">{ability.modifier}</span>
            <input
              class="-bottom-2 relative w-12 border border-gray-200 bg-white text-center text-2xl"
              type="number"
              bind:value={$data.abilityScores[type]}
            />
          </label>
        </Container>
      {/each}
    </div>

    <div class="pl-1.5 w-2/3">
      <Container class="mb-3">
        <label class="flex px-4">
          <input type="checkbox" bind:checked={$data.inspiration} />
          <span class="flex-grow text-center">Inspiration</span>
        </label>
      </Container>

      <Container class="mb-3">
        <label class="flex px-4">
          <input class="w-6 text-center" type="number" bind:value={$data.proficiency} />
          <span class="flex-grow text-center">Proficiency Bonus</span>
        </label>
      </Container>

      <Container class="flex flex-col mb-3 pt-6 px-6">
        {#each Object.entries($derived.savingThrows) as [type, value]}
          <label class="flex">
            <input class="mr-4" type="checkbox" bind:checked={$data.savingThrows[type]} />
            <span class="mr-4">{value.modifier}</span>
            {value.name}
          </label>
        {/each}
        <span class="my-2 text-center">Saving Throws</span>
      </Container>

      <Skills />
    </div>

    <Container class="flex mb-3 px-4 w-full">
      <span class="w-12">{10 + $derived.skills.perception.modifier}</span>
      <span class="flex-grow text-center">passive wisdom (perception)</span>
    </Container>

    <Tools />
    <OtherProficiencies />
  </div>
  <div class="px-1.5 flex-1">
    <div class="flex">
      <Container class="flex-1 mb-3">
        <label class="block text-center">
          <input class="w-full text-center text-5xl" type="number" bind:value={$data.armorClass} /> Armor Class
        </label>
      </Container>
      <Container class="flex-1 mx-3 mb-3 py-2 text-center">
        <div class="w-full text-5xl">{$derived.abilityScores[AbilityType.DEX].modifier}</div>
        Initiative
      </Container>
      <Container class="flex-1 mb-3">
        <label class="block text-center">
          <input class="w-full text-center text-5xl" type="number" bind:value={$data.speed} /> Speed
        </label>
      </Container>
    </div>

    <Container class="flex flex-col mb-3 w-full text-center">
      <label class="flex w-full">
        Hit Point Maximum
        <input class="flex-grow ml-2 border-b border-gray-200 text-center" type="number" bind:value={$data.hp.max} />
      </label>
      <label>
        <input class="w-full text-center text-5xl" type="number" bind:value={$data.hp.current} />
        Current Hit Points
      </label>
    </Container>

    <Container class="mb-3">
      <label class="block w-full text-center">
        <input class="w-full text-center text-5xl" type="number" bind:value={$data.hp.temp} />
        Temporary Hit Points
      </label>
    </Container>

    <div class="flex mb-3">
      <Container class="mr-1.5 overflow-hidden flex-1 text-center">
        <label class="flex">
          Total
          <input
            class="overflow-hidden flex-1 ml-2 border-b border-gray-200 text-center"
            type="number"
            bind:value={$data.hitDice.max}
          />
        </label>
        <input class="w-full text-center text-2xl" type="number" bind:value={$data.hitDice.current} />
        Hit Dice (<select class="w-7" bind:value={$data.hitDice.type}>
          {#each Object.entries(DiceType).filter(o => typeof o[1] === 'number') as [label, value]}
            <option {value}>{label}</option>
          {/each}
        </select>)
      </Container>
      <Container class="ml-1.5 flex overflow-hidden flex-1 flex-col justify-around px-2">
        <span class="flex" on:click={e => ($data.deathSaves.success = ($data.deathSaves.success + 1) % 4)}>
          <span class="w-1/2">Success</span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.success >= 1 ? 'check_box' : 'check_box_outline_blank'}
          </span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.success >= 2 ? 'check_box' : 'check_box_outline_blank'}
          </span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.success >= 3 ? 'check_box' : 'check_box_outline_blank'}
          </span>
        </span>
        <span class="flex" on:click={e => ($data.deathSaves.failure = ($data.deathSaves.failure + 1) % 4)}>
          <span class="w-1/2">Failure</span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.failure >= 1 ? 'disabled_by_default' : 'check_box_outline_blank'}
          </span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.failure >= 2 ? 'disabled_by_default' : 'check_box_outline_blank'}
          </span>
          <span class="material-icons pointer-events-none">
            {$data.deathSaves.failure >= 3 ? 'disabled_by_default' : 'check_box_outline_blank'}
          </span>
        </span>
        <span class="text-center">Death Saves</span>
      </Container>
    </div>

    <Attacks />
    <Equipment />
  </div>
  <div class="pl-1.5 flex-1">
    <Container class="mb-3">
      <textarea class="w-full" bind:value={$data.traits} />
      <div class="text-center">Personality Traits</div>
    </Container>
    <Container class="mb-3">
      <textarea class="w-full" bind:value={$data.ideals} />
      <div class="text-center">Ideals</div>
    </Container>
    <Container class="mb-3">
      <textarea class="w-full" bind:value={$data.bonds} />
      <div class="text-center">Bonds</div>
    </Container>
    <Container class="mb-3">
      <textarea class="w-full" bind:value={$data.flaws} />
      <div class="text-center">Flaws</div>
    </Container>
    <Trackers />
    <Features />
  </div>
</div>
