<script>
  import { formatDistanceToNowStrict } from 'date-fns'
  import { History, Ban } from 'lucide-svelte'
  export let data
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
        {#if data.case.is_met}
          <span class="text-green-600"> Met</span>
        {:else}
          <span class="flex items-center gap-2"><Ban size="16" /> Not Met </span>
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
      <span class="{data.case.is_met ? 'text-green-600' : 'text-red-600'} uppercase">
        {data.is_met ? 'Approved' : 'Denial'}
      </span>
    </h2>
    <p
      class="{data.case.is_met
        ? 'bg-green-200 border-2 border-red-600'
        : 'bg-red-200 border-2 border-red-600'} p-3 rounded-xl"
    >
      {data.case.summary}
    </p>
  </div>

  <!-- Steps Taken -->
  <div class="mb-4 mt-8">
    <h2 class="text-xl font-semibold mb-2">Steps</h2>
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
<!-- <div class="font-bold text-2xl">CASE OVERVIEW</div>
{#if data && data.case}
  <div>Showing the results for id:{data.case.id}</div>
  <div>created_at:{data.case.created_at}</div>
  <div>status:{data.case.status}</div>
{/if} -->

<!-- 1. procedure name
2. at least 2 cpt codes
3. the case summary
4. relative time since the case was created (`created_at`)
5. list of steps taken by the LLM pipeline to come to a determination
6. final determination (`is_met` is a boolean indicating if the case is met or not met) -->
