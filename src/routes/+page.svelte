<script>
	import InfoPane from '$lib/components/InfoPane.svelte';
	import SearchTabs from '$lib/components/SearchTabs.svelte';

	export let data;
	export let scope = data.props.searchParams.get('tab');
</script>

<h1 class="mt-20 md:text-5xl">M/S Reading Room</h1>
<h2 class="py-1 text-base uppercase tracking-widest md:text-lg">
	Search Prototype for the Study of A-Files
</h2>

<InfoPane />
<SearchTabs {scope} />
