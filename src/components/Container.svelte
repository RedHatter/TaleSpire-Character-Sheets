<script lang="ts">
  import { handDrawn } from '../utils'

  let clazz = ''
  export { clazz as class }
  export let area: string
  export let title: string
  export let label: boolean

  $: style = area !== undefined ? 'grid-area:' + area : undefined
</script>

{#if label}
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="{clazz} p-2" {style} use:handDrawn>
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
  <div class="{clazz} block p-2" {style} use:handDrawn>
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
