<script>
  export let data
  // $: console.log({data})
  let stepsExpanded
</script>

<div class="container mx-auto p-4">
  <!-- Procedure Name -->
  <h1 class="text-2xl font-bold mb-4">{data.case.procedure_name}</h1>
  <h2 class="">Status</h2>
  <h3 class="mb-4 uppercase font-bold">{data.case.status}</h3>

  <!-- Final Determination -->
  <div class="mb-4">
    <h2 class="">Final Determination:</h2>
    <p class="mb-4 uppercase font-bold">
      {#if data.case.is_met}
        Met
      {:else}
        Not Met
      {/if}
    </p>
  </div>
  <!-- CPT Codes -->
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">CPT Codes:</h2>
    <ul class=" pl-4 flex gap-4 flex-col sm:flex-row">
      {#each data.case.cpt_codes as code}
        <div class="bg-gray-800 text-white rounded-xl px-3 py-2 max-w-min">
          <li>{code}</li>
        </div>
      {/each}
    </ul>
  </div>

  <!-- Case Summary -->
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Case Summary:</h2>
    <p>{data.case.summary}</p>
  </div>

  <!-- Relative Time -->
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Relative Time Since Created:</h2>
    <p>{new Date(data.case.created_at).toLocaleString()}</p>
  </div>

  <!-- Steps Taken -->
  <!-- <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Steps Taken:</h2>
    <ul class="list-disc pl-4">
      {#each data.case.steps as step}
        <li>{step.reasoning}</li>
      {/each}
    </ul>
  </div> -->

  <div class="mb-4">
    <button
      class="flex justify-between cursor-pointer"
      on:click={() => (stepsExpanded = !stepsExpanded)}
    >
      <h2 class="text-xl font-semibold mb-2">Steps Taken:</h2>
      <span class="transform" class:rotate-180={stepsExpanded} style="transition: transform 0.3s;"
        >&#9654;</span
      >
    </button>
    {#if stepsExpanded}
      <div class="bg-gray-100 p-4 mt-2">
        <p>{data.case.steps[0].reasoning}</p>
        <!-- Displaying only the first sentence -->
      </div>
    {/if}
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
