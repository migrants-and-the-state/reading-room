<script>
	import { Form, FormGroup, PasswordInput } from 'carbon-components-svelte';
	import { handlePasswordSubmit } from '$lib/login.js';
</script>

<h1 class="mt-20 md:text-5xl">M/S Reading Room – Login</h1>
<Form on:submit={handlePasswordSubmit} class="my-10">
	<PasswordInput
		required
		type="password"
		name="password"
		labelText="Password"
		placeholder="Enter password..."
	/>
</Form>
