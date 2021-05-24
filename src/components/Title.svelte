<script lang="ts">
  export let value: string
</script>

<div class="text-dark mb-4 text-center uppercase font-medium text-xs">
  {#each value.split(' ') as word}
    <span class="ml-1 text-sm">{word[0]}</span>{word.slice(1)}
  {/each}
</div>
