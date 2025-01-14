<script>
	import InfoPane from '$lib/components/InfoPane.svelte';
	import SearchTabs from '$lib/components/SearchTabs.svelte';

	export let data;
	export let tab = data.props.searchParams.get('tab');
</script>

<InfoPane />
<SearchTabs {tab} />
