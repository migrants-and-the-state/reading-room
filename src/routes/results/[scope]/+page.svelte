<script>
	import { base } from '$app/paths';
	import { ClickableTile, Pagination } from 'carbon-components-svelte';

	export let data;
	console.log(data.scope);
	console.log(data.searchParams);

	// import { addDocument, search } from '$lib/search';

	// Sample documents
	// const documents = [
	// 	{ id: 1, content: 'First document content' },
	// 	{ id: 2, content: 'Second document content' }
	// ];

	// onMount(() => {
	// 	documents.forEach((doc) => addDocument(doc.id, doc.content));
	// });

	// function handleSearch() {
	// 	results = search(query, { suggest: true });
	// }

	import afiles from '$lib/data/afiles.json';

	const totalItems = afiles.length;

	$: currentPage = 1;
	$: itemsPerPage = 10;
	$: items = getPageItems(currentPage);

	const getPageItems = (page) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return afiles.slice(startIndex, endIndex).map((afile) => ({
			id: afile.id,
			name: `${afile.fields.last_name.nara}, ${afile.fields.first_name.nara}`,
			thumbnail: `https://dctn4zjpwgdwdiiy5odjv7o2se0bqgjb.lambda-url.us-east-1.on.aws/iiif/3/og-2023-kc-nara_${afile.id}_0000/square/250,/0/default.jpg`,
			details: `DOB: ${afile.fields.dob?.nara}; SEX: ${afile.fields.sex?.nara}; DOE: ${afile.fields.doe?.nara}, COB: ${afile.fields.cob?.nara}, POE: ${afile.fields.poe?.nara}`,
			url: `${base}/view/afile/${afile.id}/0000`,
			pageCount: afile.page_count || 0
		}));
	};

	function handlePaginationChange(event) {
		const { page, pageSize } = event.detail;

		itemsPerPage = pageSize;
		currentPage = page;
		items = getPageItems(page);
	}
</script>

<h2 class="mb-6">Search Results</h2>

<Pagination
	class="mb-6"
	{totalItems}
	pageSizes={[10, 20, 50]}
	pageSize={itemsPerPage}
	on:update={handlePaginationChange}
/>

<div class="space-y-4">
	{#each items as item}
		<ClickableTile
			href={item.url}
			class="rounded-lg border p-4 shadow transition-shadow duration-200 hover:shadow-lg"
		>
			<div class="flex items-center">
				<img src={item.thumbnail} alt={item.title} class="mr-4 h-32 w-24 rounded object-cover" />
				<div>
					<div class="text-lg font-semibold">{item.name} | {item.id}</div>
					<div class="text-sm text-gray-500">{item.pageCount} pages</div>
					<div class="my-2 font-mono text-xs text-gray-700">{item.details}</div>
				</div>
			</div>
		</ClickableTile>
	{/each}
</div>
