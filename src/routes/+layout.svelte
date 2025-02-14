<script>
	import { navigating } from '$app/stores';
	import { page } from '$app/state';
	import { writable, derived } from 'svelte/store';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import LogInOut from '$lib/components/LogInOut.svelte';
	import { Loading } from 'carbon-components-svelte';
	import { timestamp } from '$lib/timestamp.js';
	import { Api_1, ViewMode_1 } from 'carbon-icons-svelte';

	let { children } = $props();

	const onLoginPage = page.url.pathname.includes('login'); ;
	let password = localStorage.getItem('password');
	const loggedIn = writable(password === import.meta.env.VITE_PASSWORD);

	let loadingTimeout;
	let showLoading = false;

	$effect(() => {
		if (!!$navigating) {
			loadingTimeout = setTimeout(() => {
				showLoading = true;
			}, 500);
		} else {
			clearTimeout(loadingTimeout);
			showLoading = false;
		}
	});
</script>

{#if showLoading}
	<Loading />
{/if}

<div class="min-h-screen flex flex-col justify-between">
	<div>
		{#if !onLoginPage}<Header />{/if}
		<main class="relative mt-6 mb-32 w-full px-4 md:px-8 lg:px-28">
			{@render children()}
		</main>
	</div>
	<footer class="bg-[#161616] text-white px-4 py-2 md:px-8 lg:px-28 flex justify-between items-center">
		<p class="py-1 text-[.8em] font-mono">M/S_RR v0.1.0; {timestamp}</p>
		<LogInOut loggedIn={$loggedIn}/>
	</footer>
</div>
