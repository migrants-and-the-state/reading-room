<script>
	import InfoPane from '$lib/components/InfoPane.svelte';
	import SearchTabs from '$lib/components/SearchTabs.svelte';

	export let data;
	export let scope = data.props.searchParams.get('scope');
</script>

<InfoPane />
<SearchTabs {scope} />
