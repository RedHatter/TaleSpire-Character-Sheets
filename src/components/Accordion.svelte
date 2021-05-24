<script lang="ts">
  export let title
  export let subtitle
  export let content
</script>

<label class="block mb-4">
  <div class="text-dark text-lg">{title}</div>
  <div class="text-light mb-2 text-xs">
    {subtitle}
  </div>
  <input type="checkbox" />
  <p class="whitespace-pre-wrap text-sm">{content}</p>
</label>

<style>
  input[type='checkbox'],
  input[type='checkbox'] + p {
    display: none;
  }

  input[type='checkbox']:checked + p {
    display: block;
  }
</style>
