<script>
	import InfoPane from '$lib/components/InfoPane.svelte';
	import SearchTabs from '$lib/components/SearchTabs.svelte';

	export let data;
	export let scope = data.props.searchParams.get('tab');
</script>

<h1>M/S Corpus UI v1-Sample</h1>

<InfoPane />
<SearchTabs {scope} />
