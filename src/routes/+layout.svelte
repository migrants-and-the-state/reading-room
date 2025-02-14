<script>
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import LogInOut from '$lib/components/LogInOut.svelte';
	import { Loading } from 'carbon-components-svelte';
	import { timestamp } from '$lib/timestamp.js';
	import { Api_1, ViewMode_1 } from 'carbon-icons-svelte';

	let { children } = $props();

	let loadingTimeout;
	let showLoading;
	let onLoginPage = new URL(window.location).pathname.includes('login');

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

<div class="flex min-h-screen flex-col justify-between">
	<div>
		{#if !onLoginPage}
			<Header />
		{/if}
		<main class="relative mb-32 mt-6 w-full px-4 md:px-8 lg:px-28">
			{@render children()}
		</main>
	</div>
	<footer
		class="flex items-center justify-between bg-[#161616] px-4 py-2 text-white md:px-8 lg:px-28"
	>
		<p class="py-1 font-mono text-[.8em]">M/S_RR v0.1.0; {timestamp}</p>
		{#if !onLoginPage}
			<LogInOut />
		{/if}
	</footer>
</div>
