<script lang="ts">
  import { modifier } from '../utils'
  export let name: string
  export let abilityScore: number
  export let bonus: number
  export let value: boolean

</script>

<label class="flex">
  <input class="mr-4" type="checkbox" bind:checked={value} />
  <span class="mr-4">{modifier(abilityScore) + (value ? bonus : 0)}</span>
  {name}
</label>
