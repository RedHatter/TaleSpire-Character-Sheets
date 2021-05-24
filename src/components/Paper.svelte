<script lang="ts">
  import Title from './Title.svelte'
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
  <label class="{clazz} paper p-5" {style} use:handDrawn={$theme == Theme.FANCY}>
    {#if title !== undefined}<Title value={title} />{/if}
    <slot />
  </label>
{:else}
  <div class="{clazz} paper block p-5" {style} use:handDrawn={$theme == Theme.FANCY}>
    {#if title !== undefined}<Title value={title} />{/if}
    <slot />
  </div>
{/if}
