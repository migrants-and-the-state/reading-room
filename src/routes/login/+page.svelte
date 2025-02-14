<script>
   import {
    Form,
    PasswordInput
  } from "carbon-components-svelte";
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const password = data.get('password');
    localStorage.setItem('password', password);
    if (password === import.meta.env.VITE_PASSWORD) {
      goto(base, { replaceState: true });
    }
    else {
      alert('Incorrect password');
    }
    event.target.reset();
  }
</script>


<h1 class="mt-20 md:text-5xl">M/S Reading Room – Login</h1>
<Form on:submit={handleLogin} class="my-10">
  <PasswordInput
    required
    type="password"
    name="password"
    labelText="Password"
    placeholder="Enter password..."
  />
</Form>
