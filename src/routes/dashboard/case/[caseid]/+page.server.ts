import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const res = await fetch(`http://localhost:8000/cases/${params.caseid}/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const case_data = await res.json()
  console.log('returning results from fastAPI', case_data)

  if (res.status === 404) {
    error(404, { message: `Case with Id ${params.caseid} not found` })
  }

  return { case: case_data }
}
