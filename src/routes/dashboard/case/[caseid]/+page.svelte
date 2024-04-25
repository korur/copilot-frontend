<script>
  import { page } from '$app/stores'
  import GuidelinesUpload from '$lib/components/GuidelinesUpload.svelte'
  import Spinner from '$lib/components/Spinner.svelte'
  import Error from '$lib/components/toast/Error.svelte'
  import { formatDistanceToNowStrict } from 'date-fns'
  import { History, Ban } from 'lucide-svelte'
  import { onMount } from 'svelte'

  export let data
  let status = null
  let pollIntervalId = null // Define pollIntervalId

  const pollInterval = 5000 // Polling interval in milliseconds

  async function pollStatus() {
    console.log('started polling')
    try {
      const statusResponse = await fetch(`http://localhost:8000/cases/${$page.params.caseid}`)
      const statusData = await statusResponse.json()
      status = statusData.status
      console.log('status now', status)

      if (status === 'processing' || status === 'complete') {
        const result = await fetch(`http://localhost:8000/cases/${$page.params.caseid}/details`)
        data = { case: await result.json() }
      }

      if (status === 'complete') {
        clearInterval(pollIntervalId)
        return
      }
    } catch (error) {
      console.error('An error occurred while polling status:', error)
    }
  }

  onMount(async () => {
    await pollStatus()
    if (status !== 'complete') {
      pollIntervalId = setInterval(pollStatus, pollInterval)
    }
  })
</script>

<div class="container mx-auto p-4 max-w-2xl">
  Procedure Name
  <h1 class="text-3xl font-bold mb-4">{data.case.procedure_name}</h1>
  <div class="flex flex-col sm:flex-row justify-between">
    <!-- Final Determination -->
    <div>
      <h2 class="">Status</h2>
      <h3 class="mb-4 uppercase font-bold">{data.case.status}</h3>
    </div>
    <div class="mb-4">
      <h2 class="">Final Determination:</h2>
      <p class="mb-4 uppercase font-bold">
        {#if data.case.status === 'submitted'}
          Submitted
        {:else if data.case.status === 'processing'}
          Fetching
        {:else if data.case.status === 'complete'}
          {#if data.case.is_met}
            <span class="text-green-600"> Met</span>
          {:else}
            <span class="flex items-center gap-2"><Ban size="16" /> Not Met </span>
          {/if}
        {/if}
      </p>
    </div>

    <!-- Relative Time -->
    <div class="mb-4">
      <h2 class="">Created at:</h2>

      <p class="mb-4 font-bold flex items-center gap-1">
        <History size="16" />
        {formatDistanceToNowStrict(new Date(data.case.created_at))} ago
      </p>
    </div>

    <div class="mb-4">
      <h2 class="">Record id:</h2>

      <p class="mb-4 font-bold">
        {data.case.id}
      </p>
    </div>
  </div>

  <!-- Case Summary -->
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-4">
      Case Summary:

      {#if data.case.status === 'submitted'}
        Starting processing...<Spinner></Spinner>
      {:else if data.case.status === 'processing'}
        <span class="inline-flex gap-2 font-normal"> Fetching data... </span>
      {:else if data.case.status === 'complete'}
        <span class="{data.case.is_met ? 'text-green-600' : 'text-red-600'} uppercase">
          {data.case.is_met ? 'Approved' : 'Denial'}
        </span>
      {/if}
    </h2>

    {#if data.case.status === 'submitted'}
      Starting processing...
    {:else if data.case.status === 'processing'}
      <p
        class="bg-gray-200 border-2 border-gray-600 p-3 rounded-xl justify-center flex items-center min-h-32"
      >
        <span class="inline-flex gap-2 font-normal">
          Fetching data...<Spinner></Spinner>
        </span>
      </p>
    {:else if data.case.status === 'complete'}
      <p
        class="{data.case.is_met
          ? 'bg-green-200 border-2 border-red-600'
          : 'bg-red-200 border-2 border-red-600'} p-3 rounded-xl"
      >
        {data.case.summary}
      </p>
    {/if}
  </div>

  <!-- Steps Taken -->
  <div class="mb-4 mt-8">
    <h2 class="text-xl font-semibold mb-2">Steps</h2>

    {#if data.case.status === 'submitted'}
      Starting processing...<Spinner></Spinner>
    {:else if data.case.status === 'processing'}
      <div
        class="my-4 border-2 border-gray-400 rounded-xl p-3 bg-gray-50 flex justify-center items-center min-h-32"
      >
        <span class="inline-flex gap-2 font-normal">
          Fetching data...<Spinner></Spinner>
        </span>
      </div>
    {:else if data.case.status === 'complete'}
      <ul>
        {#each data.case.steps as step}
          <div class="my-4 border-2 border-gray-400 rounded-xl p-3 bg-gray-50">
            <h1 class="text-xl mb-4 font-bold">{step.question}</h1>
            <div class="flex flex-col gap-2">
              {#each step.reasoning.split('\n') as lines}
                <li>{lines}</li>
              {/each}
            </div>
          </div>
        {/each}
      </ul>
    {/if}
  </div>
  <!-- CPT Codes -->
  <div class="mb-8 mt-8">
    <h2 class="text-xl font-semibold mb-2">CPT Codes:</h2>
    <ul class=" pl-4 flex flex-wrap gap-4">
      {#each data.case.cpt_codes as code}
        <div class="bg-gray-700 text-white rounded-xl px-3 py-2 max-w-min">
          <li>{code}</li>
        </div>
      {/each}
    </ul>
  </div>
</div>
