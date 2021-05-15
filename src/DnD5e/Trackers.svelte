<script lang="ts">
  import { data, Tracker } from './model'
  import Container from '../components/Container.svelte'

  function add() {
    data.update(data => {
      data.trackers.push(new Tracker('Other Resource'))
      return data
    })
  }
</script>

<div class="grid grid-cols-2 gap-3 mb-3">
  {#each $data.trackers as tracker}
    <Container>
      <div class="flex">
        Total
        <input
          class="overflow-hidden flex-1 ml-2 border-b border-gray-200 text-center"
          type="number"
          bind:value={tracker.max}
        />
      </div>
      <input class="w-full text-center text-3xl" type="number" bind:value={tracker.current} />
      <input class="w-full text-center" bind:value={tracker.name} />
    </Container>
  {/each}
</div>
<button class="mb-3 w-full" on:click={add}>+</button>
