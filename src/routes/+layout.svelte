<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen">
	<Header />
	<main class="mb-36 w-full px-12 pb-20">
		{@render children()}
	</main>
</div>
