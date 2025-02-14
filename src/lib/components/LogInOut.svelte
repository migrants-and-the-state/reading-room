<script>
	import { Loading, Link } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { handleLogout, verifyLoginStatus } from '$lib/login';
	let loggedIn = !!verifyLoginStatus();
</script>

<div>
	{#if !!loggedIn}
		<Link class="!text-white" href="#" on:click={handleLogout}>Logout</Link>
	{:else}
		<Link class="!text-white" href="{base}/login">Login</Link>
	{/if}
</div>
