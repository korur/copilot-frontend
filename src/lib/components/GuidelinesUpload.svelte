<script>
  import { clsx as classNames } from 'clsx'
  import { Check } from 'lucide-svelte'
  import Spinner from './Spinner.svelte'

  let uploading
  const handleClick = () => {
    uploading = true
    setTimeout(() => {
      guidelinesFile = undefined
      uploading = false
    }, 3000)
  }
  let guidelinesFile = null
</script>

<div
  class="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center"
>
  <button
    class={classNames(
      'text-white font-medium py-2 px-4 rounded border-2',
      guidelinesFile === null
        ? 'bg-orange-500 border-orange-500'
        : 'border-transparent text-green-600',
    )}
    on:click={handleClick}
  >
    {#if guidelinesFile === null}
      <span class="pr-2">Simulate Guidelines Upload</span>
      {#if uploading}
        <Spinner></Spinner>
      {/if}
    {:else}
      <span class="text-green-600 flex flex-row gap-1 items-center">
        <Check></Check>
        <span>Guidelines File Uploaded</span>
      </span>
    {/if}
  </button>
</div>
