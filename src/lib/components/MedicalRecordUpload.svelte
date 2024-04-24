<script>
  import { Check } from 'lucide-svelte'
  import clsx from 'clsx'
  import Spinner from './Spinner.svelte'

  let uploading

  const handleClick = () => {
    uploading = true
    setTimeout(() => {
      medicalRecord = undefined
      uploading = false
    }, 3000)
  }

  let medicalRecord = null
</script>

<div
  class="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center"
>
  <button
    class={clsx(
      'text-white font-medium py-2 px-4 rounded border-2',
      medicalRecord === null ? 'bg-blue-500 border-blue-500' : 'border-transparent text-green-600',
    )}
    on:click={handleClick}
  >
    {#if medicalRecord === null}
      <span class="pr-2">Simulate Medical Record Upload</span>
      {#if uploading}
        <Spinner></Spinner>
      {/if}
    {:else}
      <span class="text-green-600 flex flex-row gap-1 items-center">
        <Check />
        <span>Medical Record Uploaded</span>
      </span>
    {/if}
  </button>
</div>
