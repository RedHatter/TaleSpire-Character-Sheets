<script lang="ts">
  export let value: boolean
  export let label: string
</script>

<label class="relative block p-2 border-b border-gray-200">
  <input class="hidden" type="checkbox" bind:checked={value} />
  <div class="text-gray-600 text-xs pointer-events-none">{label}</div>
  <div>
    {value ? 'Yes' : 'No'}
  </div>
</label>
