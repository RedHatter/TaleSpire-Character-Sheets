<script lang="ts">
  import { slide } from 'svelte/transition'

  export let title
  export let subtitle
  export let content
  export let expanded = false
</script>

<div on:click class:my-4={expanded} class="accordion">
  <div class:py-5={expanded} class="header py-3">
    {title}
    <div class="text-light text-xs">
      {subtitle}
    </div>
  </div>
  {#if expanded}
    <p transition:slide={{ duration: 200 }} class="pb-4 whitespace-pre-wrap text-sm">{content}</p>
  {/if}
</div>

<style>
  .accordion {
    @apply px-4;
    position: relative;
    cursor: pointer;
    transition: margin 200ms;
  }

  .accordion::before {
    position: absolute;
    top: -1px;
    right: 0;
    left: 0;
    display: block;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    content: '';
    opacity: 1;
    transition: opacity 200ms;
  }

  .accordion.my-4::before,
  .accordion.my-4 + :global(.accordion::before) {
    opacity: 0;
  }

  .accordion:last-child {
    @apply rounded-b;
  }

  .header {
    @apply text-lg;
    transition: padding 200ms;
  }
</style>
