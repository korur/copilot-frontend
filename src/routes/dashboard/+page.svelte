<script lang="ts">
  import GuidelinesUpload from '$lib/components/GuidelinesUpload.svelte'
  import MedicalRecordUpload from '$lib/components/MedicalRecordUpload.svelte'
  const handleContinue = () => {
    // to be implemented
  }

  let medicalRecordReady: boolean
  let guidelinesReady: boolean
</script>

<div class="w-full flex flex-col justify-center items-center h-screen">
  <div class="w-full flex flex-row gap-2 items-center">
    <MedicalRecordUpload bind:uploaded={medicalRecordReady} />
    <GuidelinesUpload bind:uploaded={guidelinesReady} {medicalRecordReady} />
  </div>
  <div class="w-full py-4 flex flex-row justify-center">
    {#if medicalRecordReady && guidelinesReady}
      <button
        class="bg-green-600 font-medium text-white py-2 px-4 rounded"
        on:click={handleContinue}
      >
        Continue
      </button>
    {/if}
  </div>
</div>
