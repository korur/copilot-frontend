<script>
  import { page } from '$app/stores'
</script>

<main>
  <h1>{$page.status} - {$page.error.message}</h1>
  <p>The page you are looking for could not be found.</p>
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 3em;
    color: #f44336;
  }

  p {
    font-size: 1.2em;
    color: #333;
  }
</style>
