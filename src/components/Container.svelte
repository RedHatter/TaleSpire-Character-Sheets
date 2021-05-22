<script lang="ts">
  import { Theme, theme } from '../Settings.svelte'
  import { handDrawn } from '../utils'

  let clazz = ''
  export { clazz as class }
  export let area: string = undefined
  export let title: string = undefined
  export let label: boolean = false

  $: style = area !== undefined ? 'grid-area:' + area : undefined
</script>

{#if label}
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="{clazz} p-2" {style} class:simple={$theme == Theme.SIMPLE} use:handDrawn={$theme == Theme.FANCY}>
    <slot />
    {#if title !== undefined}
      <div class="my-2 text-center uppercase text-xs">
        {#each title.split(' ') as word}
          <span class="ml-1 text-sm">{word[0]}</span>{word.slice(1)}
        {/each}
      </div>
    {/if}
  </label>
{:else}
  <div class="{clazz} block p-2" {style} class:simple={$theme == Theme.SIMPLE} use:handDrawn={$theme == Theme.FANCY}>
    <slot />
    {#if title !== undefined}
      <div class="my-2 text-center uppercase text-xs">
        {#each title.split(' ') as word}
          <span class="ml-1 text-sm">{word[0]}</span>{word.slice(1)}
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .simple {
    @apply border rounded;
  }
</style>
