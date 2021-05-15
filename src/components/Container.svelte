<script lang="ts">
  import { handDrawn } from '../utils'

  let clazz = ''
  export { clazz as class }
  export let area
</script>

<div class="{clazz} p-2" style={area !== undefined ? 'grid-area:' + area : undefined} use:handDrawn>
  <slot />
</div>
