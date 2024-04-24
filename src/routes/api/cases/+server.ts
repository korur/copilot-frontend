export async function POST() {
  // API Logic
  console.log('made a post request')
  return new Response(JSON.stringify({ message: 'Hello ' }), { status: 200 })
}
