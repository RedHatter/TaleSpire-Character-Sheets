<script lang="ts">
  import Select from '../components/Select.svelte'
  import TextField from '../components/TextField.svelte'
  import Dialog from '../components/Dialog.svelte'
  import { data, derived, AbilityType, CustomSkill, SkillProficiencyType } from './model'
  import { enumToSelect, handDrawn } from '../utils'

  let showDialog = false
  let tool: CustomSkill

  const items = enumToSelect(AbilityType)

  function edit(_tool: CustomSkill) {
    tool = _tool
    showDialog = true
  }

  function add() {
    tool = new CustomSkill()
    $data.tools.push(tool)
    showDialog = true
  }

  function close() {
    $data = $data
    showDialog = false
  }

  function remove() {
    $data.tools.splice($data.tools.indexOf(tool), 1)
    close()
  }
</script>

{#if showDialog}
  <Dialog on:close={close}>
    <TextField class="mb-2" label="Name" placeholder="Thieves' Tools" bind:value={tool.name} />
    <div class="gap-2 flex mb-2">
      <Select
        class="flex-1"
        label="Proficient"
        items={[
          { value: SkillProficiencyType.None, text: 'None' },
          { value: SkillProficiencyType.Proficient, text: 'Proficient' },
          { value: SkillProficiencyType.Expertise, text: 'Expertise' },
          { value: SkillProficiencyType.JackOfAllTrades, text: 'Jack of All Trades' },
        ]}
        bind:value={tool.proficient}
      />
      <Select class="flex-1" label="Ability" {items} bind:value={tool.ability} />
    </div>
    <TextField class="w-96 h-72" type="textarea" label="Description" bind:value={tool.description} />

    <div class="flex justify-between mt-4 w-full">
      <button class="py-2 px-4 text-red-400 uppercase font-medium text-sm" on:click={remove}>Remove</button>
      <button class="text-primary-400 py-2 px-4 uppercase font-medium text-sm" on:click={close}>Done</button>
    </div>
  </Dialog>
{/if}

<div class="grid gap-2 mb-3 p-2 w-full" use:handDrawn>
  <span>Tool</span><span>Pro</span><span>Ability</span><span />
  {#each $data.tools as tool, key}
    <label class="contents">
      <span>{tool.name}</span>
      <span>{$derived.tools[key].modifier}</span>
      <span>{$derived.tools[key].ability}</span>
      <span class="material-icons text-gray-400 text-sm" on:click={() => edit(tool)}>edit</span>
      <input class="hidden" type="checkbox" />
      <div class="col-span-4">{tool.description}</div>
    </label>
  {/each}
  <button class="col-span-4" on:click={add}>+</button>
  <span class="col-span-4 text-center">Tool Proficiencies & Custom Skills</span>
</div>

<style>
  .grid {
    grid-template-columns: 1fr auto 1fr auto;
  }

  input[type='checkbox']:checked + div {
    display: block;
  }

  input[type='checkbox'] + div {
    display: none;
  }
</style>
