<script lang="ts">
  import Container from '../components/Container.svelte'
  import Dialog from '../components/Dialog.svelte'
  import Cog from '../components/Cog.svelte'
  import { SkillProficiencyType } from './model'
  import type { DnD5eData, DnD5eDerivedData } from './model'

  export let data: DnD5eData
  export let derived: DnD5eDerivedData

  let showDialog = false

  function close() {
    showDialog = false
  }
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <div class="dialog grid gap-4 items-center">
      <span>Skill</span><span>Proficieny</span><span>Skill</span><span>Proficieny</span>
      {#each Object.entries(derived.skills) as [key, value]}
        <span>{value.name}</span>
        <select bind:value={data.skills[key]}>
          <option value={SkillProficiencyType.None}>None</option>
          <option value={SkillProficiencyType.Proficient}>Proficient</option>
          <option value={SkillProficiencyType.Expertise}>Experties</option>
          <option value={SkillProficiencyType.JackOfAllTrades}>Jack of All Trades</option>
        </select>
      {/each}
    </div>

    <div class="flex justify-end mt-4 w-full">
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}

<Container class="skills relative mb-3 pt-6 px-6" title="Skills">
  <Cog bind:value={showDialog} />
  <div class="skills grid gap-x-2 items-center">
    {#each Object.entries(derived.skills) as [key, value]}
      <span class="material-icons text-right text-sm">
        {data.skills[key] == SkillProficiencyType.Proficient
          ? 'check_box'
          : data.skills[key] == SkillProficiencyType.Expertise
          ? 'check_boxcheck_box'
          : data.skills[key] == SkillProficiencyType.JackOfAllTrades
          ? 'indeterminate_check_box'
          : 'check_box_outline_blank'}
      </span>
      <span>{value.modifier}</span>
      <span>{value.name}</span>
    {/each}
  </div>
</Container>

<style>
  .dialog {
    grid-template-columns: auto 1fr auto 1fr;
  }

  .skills {
    grid-template-columns: auto auto 1fr;
  }
</style>
