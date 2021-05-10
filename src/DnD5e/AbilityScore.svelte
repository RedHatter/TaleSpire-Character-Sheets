<script>
  import { modifier } from '../utils'
  export let name
  export let value

</script>

<label class="flex items-center flex-col mb-6 pt-2 border">
  <span>{name}</span>
  <span class="text-5xl">{modifier(value)}</span>
  <input type="number" bind:value class="-bottom-2 relative w-12 border text-center text-2xl" />
</label>
