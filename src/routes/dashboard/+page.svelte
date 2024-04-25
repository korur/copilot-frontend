<script lang="ts">
  import { goto } from '$app/navigation'
  import GuidelinesUpload from '$lib/components/GuidelinesUpload.svelte'
  import MedicalRecordUpload from '$lib/components/MedicalRecordUpload.svelte'

  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  const medicalRecord = writable(null)
  const guidelinesFile = writable(null)

  setContext('medicalRecord', medicalRecord)
  setContext('guidelinesFile', guidelinesFile)

  const handleContinue = async () => {
    // to be implemented
    // make an api call to server
    const res = await fetch('http://localhost:8000/cases/', {
      method: 'POST',
      body: JSON.stringify({ id: 4 }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('post request status', res.status)

    if (res.status === 200) {
      const result = await res.json()
      console.log('reeee', result.id)
      goto(`/dashboard/case/${result.id}`)
    }
  }
</script>

<div class="w-full flex flex-col justify-center items-center h-screen">
  <div class="w-full flex flex-row gap-2 items-center">
    <MedicalRecordUpload />
    <GuidelinesUpload />
  </div>
  <div class="w-full py-4 flex flex-row justify-center">
    {#if $medicalRecord && $guidelinesFile}
      <button
        class="bg-green-600 font-medium text-white py-2 px-4 rounded"
        on:click={handleContinue}
      >
        Continue
      </button>
    {/if}
  </div>
</div>
