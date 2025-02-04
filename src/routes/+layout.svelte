<script>
	import { navigating } from '$app/stores';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { Loading } from 'carbon-components-svelte';

	let { children } = $props();

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

<div class="min-h-screen">
	<Header />
	<main class="mb-36 w-full px-12 pb-20">
		{@render children()}
	</main>
</div>
