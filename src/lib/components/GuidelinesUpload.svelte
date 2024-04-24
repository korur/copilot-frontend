<script lang="ts">
  import { clsx as classNames } from 'clsx'
  import { Check } from 'lucide-svelte'
  import Spinner from './Spinner.svelte'
  import { addToast } from './toast/index.svelte'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'

  const guidelinesFile: Writable<null | undefined | string> = getContext('guidelinesFile')
  const medicalRecord: Writable<null | undefined | string> = getContext('medicalRecord')

  let inProgress: boolean

  const handleClick = () => {
    if (!$medicalRecord) {
      addToast({
        data: {
          type: 'error',
          title: 'Success',
          description: 'Please submit Medical Record first!',
        },
      })
      return
    }

    inProgress = true
    setTimeout(() => {
      guidelinesFile.set('guidelines uploaded...')
      inProgress = false
    }, 3000)
  }
</script>

<div
  class="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center"
>
  <button
    class={classNames(
      'text-white font-medium py-2 px-4 rounded border-2',
      $guidelinesFile === null
        ? !$medicalRecord
          ? 'bg-gray-400 border-gray-400'
          : 'bg-orange-500 border-orange-500'
        : 'border-transparent text-green-600',
    )}
    on:click={handleClick}
  >
    {#if $guidelinesFile === null}
      <span class="pr-2">Simulate Guidelines Upload</span>
      {#if inProgress}
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
