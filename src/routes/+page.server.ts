import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async () => {
  redirect(302, '/dashboard')
}
