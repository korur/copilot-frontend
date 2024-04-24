<script>
  import '../app.css'
  import Toaster from '$lib/components/toast/index.svelte'
</script>

<Toaster></Toaster>

<div class="w-full max-w-6xl mx-auto">
  <slot />
</div>
