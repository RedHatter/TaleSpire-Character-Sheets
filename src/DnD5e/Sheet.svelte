<script lang="ts">
  import { debounce, modifier, range } from '../utils'
  import { DnD5eData, DiceType } from './model'
  import AbilityScore from './AbilityScore.svelte'
  import Proficiency from './Proficiency.svelte'

  const data = (JSON.parse(window.localStorage.getItem('data')) ?? new DnD5eData()) as DnD5eData
  console.log(data)
  const write = debounce(data => window.localStorage.setItem('data', JSON.stringify(data)), 1000)
  $: write(data)

</script>

<div class="flex items-center mb-3">
  <label class="p-4 w-1/3 border-t border-b border-l">
    <input bind:value={data.name} class="w-full" />
    Character Name
  </label>
  <div class="flex flex-wrap p-4 w-2/3 border">
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
  </div>
</div>
<div class="flex">
  <div class="pr-1.5 flex flex-1 flex-wrap">
    <div class="pr-1.5 w-1/3">
      <AbilityScore name="Strength" bind:value={data.strength} />
      <AbilityScore name="Dexterity" bind:value={data.dexterity} />
      <AbilityScore name="Constitution" bind:value={data.constitution} />
      <AbilityScore name="Intelligence" bind:value={data.intelligence} />
      <AbilityScore name="Wisdom" bind:value={data.wisdom} />
      <AbilityScore name="Charisma" bind:value={data.charisma} />
    </div>
    <div class="pl-1.5 w-2/3">
      <label class="flex mb-3 py-2 px-6 border">
        <input type="checkbox" bind:checked={data.inspiration} />
        <span class="flex-grow text-center">Inspiration</span>
      </label>
      <label class="flex mb-3 py-2 px-6 border">
        <input class="w-6 text-center" type="number" bind:value={data.proficiency} />
        <span class="flex-grow text-center">Proficiency Bonus</span>
      </label>
      <div class="flex flex-col mb-3 pt-6 px-6 border">
        <Proficiency
          name="Strength"
          abilityScore={data.strength}
          bonus={data.proficiency}
          bind:value={data.savingThrows.strength}
        />
        <Proficiency
          name="Dexterity"
          abilityScore={data.dexterity}
          bonus={data.proficiency}
          bind:value={data.savingThrows.dexterity}
        />
        <Proficiency
          name="Constitution"
          abilityScore={data.constitution}
          bonus={data.proficiency}
          bind:value={data.savingThrows.constitution}
        />
        <Proficiency
          name="Intelligence"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.savingThrows.intelligence}
        />
        <Proficiency
          name="Wisdom"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.savingThrows.wisdom}
        />
        <Proficiency
          name="Charisma"
          abilityScore={data.charisma}
          bonus={data.proficiency}
          bind:value={data.savingThrows.charisma}
        />
        <span class="my-2 text-center">Saving Throws</span>
      </div>
      <div class="flex flex-col pt-6 px-6 border">
        <Proficiency
          name="Acrobatics (Dex)"
          abilityScore={data.dexterity}
          bonus={data.proficiency}
          bind:value={data.skills.acrobatics}
        />
        <Proficiency
          name="Animal Handling (Wis)"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.skills.animalHandling}
        />
        <Proficiency
          name="Arcana (Int)"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.skills.arcana}
        />
        <Proficiency
          name="Athletics (Str)"
          abilityScore={data.strength}
          bonus={data.proficiency}
          bind:value={data.skills.athletics}
        />
        <Proficiency
          name="Deception (Cha)"
          abilityScore={data.charisma}
          bonus={data.proficiency}
          bind:value={data.skills.deception}
        />
        <Proficiency
          name="History (Int)"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.skills.history}
        />
        <Proficiency
          name="Insight (Wis)"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.skills.insight}
        />
        <Proficiency
          name="Intimidation (Cha)"
          abilityScore={data.charisma}
          bonus={data.proficiency}
          bind:value={data.skills.intimidation}
        />
        <Proficiency
          name="Investigation (Int)"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.skills.investigation}
        />
        <Proficiency
          name="Medicine (Wis)"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.skills.medicine}
        />
        <Proficiency
          name="Nature (Int)"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.skills.nature}
        />
        <Proficiency
          name="Perception (Wis)"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.skills.perception}
        />
        <Proficiency
          name="Performance (Cha)"
          abilityScore={data.charisma}
          bonus={data.proficiency}
          bind:value={data.skills.performance}
        />
        <Proficiency
          name="Persuasion (Cha)"
          abilityScore={data.charisma}
          bonus={data.proficiency}
          bind:value={data.skills.persuasion}
        />
        <Proficiency
          name="Religion (Int)"
          abilityScore={data.intelligence}
          bonus={data.proficiency}
          bind:value={data.skills.religion}
        />
        <Proficiency
          name="Sleight of Hand (Dex)"
          abilityScore={data.dexterity}
          bonus={data.proficiency}
          bind:value={data.skills.sleightOfHand}
        />
        <Proficiency
          name="Stealth (Dex)"
          abilityScore={data.dexterity}
          bonus={data.proficiency}
          bind:value={data.skills.stealth}
        />
        <Proficiency
          name="Survival (Wis)"
          abilityScore={data.wisdom}
          bonus={data.proficiency}
          bind:value={data.skills.survival}
        />
        <span class="my-2 text-center">Skills</span>
      </div>
    </div>
    <span class="flex m-3 py-2 px-6 w-full border">
      <span class="w-12">{10 + modifier(data.wisdom) + (data.skills.perception ? data.proficiency : 0)}</span>
      <span class="flex-grow text-center">passive wisdom (perception)</span>
    </span>
  </div>
  <div class="px-1.5 flex-1">
    <div class="flex">
      <label class="flex-1 mb-3 py-2 border text-center">
        <input class="w-full text-center text-5xl" type="number" bind:value={data.armorClass} /> Armor Class
      </label>
      <div class="flex-1 mx-3 mb-3 py-2 border text-center">
        <div class="w-full text-5xl">{modifier(data.dexterity)}</div>
        Initiative
      </div>
      <label class="flex-1 mb-3 py-2 border text-center">
        <input class="w-full text-center text-5xl" type="number" bind:value={data.speed} /> Speed
      </label>
    </div>

    <div class="flex flex-col mb-3 p-2 w-full border text-center">
      <label class="flex w-full">
        Hit Point Maximum
        <input class="flex-grow ml-2 border-b border-gray-200 text-center" type="number" bind:value={data.hp.max} />
      </label>
      <label>
        <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.current} />
        Current Hit Points
      </label>
    </div>

    <label class="block mb-3 p-2 w-full border text-center">
      <input class="w-full text-center text-5xl" type="number" bind:value={data.hp.temp} />
      Temporary Hit Points
    </label>

    <div class="flex">
      <div class="mr-1.5 overflow-hidden flex-1 p-2 border text-center">
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
      </div>
      <div class="ml-1.5 flex overflow-hidden flex-1 flex-col justify-around py-2 px-4 border">
        <span class="flex" on:click={e => (data.deathSaves.success = (data.deathSaves.success + 1) % 4)}>
          <span class="w-1/2">Success</span>
          <input class="mr-1 pointer-events-none" type="checkbox" checked={data.deathSaves.success >= 1} />
          <input class="mr-1 pointer-events-none" type="checkbox" checked={data.deathSaves.success >= 2} />
          <input class="pointer-events-none" type="checkbox" checked={data.deathSaves.success >= 3} />
        </span>
        <span class="flex" on:click={e => (data.deathSaves.failure = (data.deathSaves.failure + 1) % 4)}>
          <span class="w-1/2">Failure</span>
          <input class="mr-1 pointer-events-none" type="checkbox" checked={data.deathSaves.failure >= 1} />
          <input class="mr-1 pointer-events-none" type="checkbox" checked={data.deathSaves.failure >= 2} />
          <input class="pointer-events-none" type="checkbox" checked={data.deathSaves.failure >= 3} />
        </span>
        <span class="text-center">Death Saves</span>
      </div>
    </div>
  </div>
  <div class="pl-1.5 flex-1 text-center">
    <div class="mb-3 p-2 border">
      <textarea class="w-full" bind:value={data.traits} />
      Personality Traits
    </div>
    <div class="mb-3 p-2 border">
      <textarea class="w-full" bind:value={data.ideals} />
      Ideals
    </div>
    <div class="mb-3 p-2 border">
      <textarea class="w-full" bind:value={data.bonds} />
      Bonds
    </div>
    <div class="mb-3 p-2 border">
      <textarea class="w-full" bind:value={data.flaws} />
      Flaws
    </div>
  </div>
</div>
