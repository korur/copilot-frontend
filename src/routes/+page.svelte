<script>
  import GuidelinesUpload from '$lib/components/GuidelinesUpload.svelte'
  import MedicalRecordUpload from '$lib/components/MedicalRecordUpload.svelte'

  const handleContinue = () => {}
</script>

<div class="w-full flex flex-col justify-center items-center h-screen">
  <div class="w-full flex flex-row gap-2 items-center">
    <MedicalRecordUpload />
    <GuidelinesUpload />
  </div>
  <div class="w-full py-4 flex flex-row justify-center">
    <button class="bg-green-600 font-medium text-white py-2 px-4 rounded" onClick={handleContinue}>
      Continue
    </button>
  </div>
</div>
