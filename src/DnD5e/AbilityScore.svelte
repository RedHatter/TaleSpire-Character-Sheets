<script>
  import { modifier } from '../utils'
  export let name
  export let value
</script>

<label class="flex flex-col items-center border mb-6 pt-2">
  <span>{name}</span>
  <span class="text-5xl">{modifier(value)}</span>
  <input type="number" bind:value class="w-12 text-2xl text-center border relative -bottom-2" />
</label>
