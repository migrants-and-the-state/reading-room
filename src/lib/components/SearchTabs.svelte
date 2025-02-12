<script>
	import { base } from '$app/paths';
	import { getScopeIndex, updateScopeIndex } from '$lib/scope';

	import AFileSearch from '$lib/components/search/AFile.svelte';
	import PageSearch from '$lib/components/search/Page.svelte';
	import G325ASearch from '$lib/components/search/G325A.svelte';
	import NatCertSearch from '$lib/components/search/NatCert.svelte';

	import { Tabs, Tab, TabContent, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let scope;

	$: scopeIndex = getScopeIndex(scope);
	onMount(() => {
		updateScopeIndex(scopeIndex);
	});
</script>

<Tabs
	type="container"
	selected={scopeIndex}
	autoWidth
	on:change={(e) => updateScopeIndex(e.detail)}
>
	<Tab id="afile" label="Find A-Files" />
	<Tab id="page" label="Find Pages" />
	<Tab id="g325a" label="Find G325 Forms" />
	<Tab id="natcert" label="Find Naturalization Certificates" />
	<svelte:fragment slot="content">
		<TabContent class="bg-white">
			<AFileSearch />
		</TabContent>
		<TabContent class="bg-white">
			<PageSearch />
		</TabContent>
		<TabContent class="bg-white">
			<G325ASearch />
		</TabContent>
		<TabContent class="bg-white">
			<NatCertSearch />
		</TabContent>
	</svelte:fragment>
</Tabs>
