<script>
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { Loading } from 'carbon-components-svelte';
	import { Api_1, ViewMode_1 } from 'carbon-icons-svelte';
	import Footer from '$lib/components/Footer.svelte';

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
		<Header />
		<main class="relative mb-32 mt-6 w-full px-4 md:px-8 lg:px-28">
			{@render children()}
		</main>
	</div>
	<Footer />
</div>
