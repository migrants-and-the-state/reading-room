<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import AFileSearch from '$lib/components/search/AFile.svelte';
	import PageSearch from '$lib/components/search/Page.svelte';
	import G325ASearch from '$lib/components/search/G325A.svelte';
	import NatCertSearch from '$lib/components/search/NatCert.svelte';

	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';

	const validScopes = ['afile', 'page', 'g325a', 'natcert'];

	$: scope = ($page.url.searchParams.get('scope') || '').toLowerCase();
	$: scopeIndex = validScopes.indexOf(scope) !== -1 ? validScopes.indexOf(scope) : 0;

	function updateScope(index) {
		const newScope = validScopes[index];
		$page.url.searchParams.set('scope', newScope);
		goto(`?${$page.url.searchParams.toString()}`);
	}
</script>

<Tabs type="container" selected={scopeIndex} autoWidth on:change={(e) => updateScope(e.detail)}>
	<Tab id="afile" label="Find A-Files" />
	<Tab id="page" label="Find Pages" />
	<Tab id="g325a" label="Find G325A Forms *" />
	<Tab id="natcert" label="Find Naturalization Certificates *" />
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

<!-- <div>
	<ul>
		{#each results as result}
			<li>{result}</li>
		{/each}
	</ul>
</div> -->
