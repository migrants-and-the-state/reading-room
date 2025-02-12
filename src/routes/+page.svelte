<script>
	import InfoPane from '$lib/components/InfoPane.svelte';
	import SearchTabs from '$lib/components/SearchTabs.svelte';

	export let data;
	export let scope = data.props.searchParams.get('tab');
</script>

<h1 class="mt-20">M/S Reading Room v1</h1>
<div class="py-1 text-base italic tracking-widest md:text-lg">
	Search Prototype for the Study of A-Files
</div>

<InfoPane />
<SearchTabs {scope} />
