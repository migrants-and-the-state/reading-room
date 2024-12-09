<script>
	import { base } from '$app/paths';
	import AFileSearch from '$lib/components/search/AFile.svelte';
	import PageSearch from '$lib/components/search/Page.svelte';
	import G325ASearch from '$lib/components/search/G325A.svelte';
	import NatCertSearch from '$lib/components/search/NatCert.svelte';

	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<Tabs type="container" autoWidth>
	<Tab label="Find A-Files" />
	<Tab label="Find Pages" />
	<Tab label="Find G325A Forms *" />
	<Tab label="Find Naturalization Certificates *" />
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
