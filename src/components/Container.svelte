<script lang="ts">
  import { handDrawn } from '../utils'

  let clazz = ''
  export { clazz as class }
</script>

<div class="{clazz} p-2" use:handDrawn>
  <slot />
</div>
