<script>
	import { base } from '$app/paths';
	import { ClickableTile, Pagination } from 'carbon-components-svelte';

	export let data;
	console.log(data.searchParams);
	console.log(data.results);
	const results = data.results;
	localStorage.setItem('resultReferrer', data.url);

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

	const safeDetail = (result, label, key, method) => {
		if (result?.fields?.[key]?.[method]) {
			return `${label}: ${result.fields[key][method]}; `;
		} else {
			return '';
		}
	};

	const totalItems = results.length;

	$: currentPage = 1;
	$: itemsPerPage = 10;
	$: items = getPaginatedItems(currentPage);

	const templatePageResult = (result) => {
		const full_text = (result?.full_text ?? '').substring(0, 266);
		const page_number = (result.page_index || 0) + 1;
		let details = '';
		details += safeDetail(result, 'FORM TITLE', 'form_title', 'ms_form_title_llm_v1');
		details += safeDetail(result, 'DOCUMENT TYPE', 'doctype', 'ms_doctype_v1');
		details += safeDetail(result, 'COUNTRIES', 'countries', 'ms_countries_nlp_v1');

		return {
			id: result.id,
			label: `${result.anumber} Page ${page_number}`,
			thumbnail: `https://dctn4zjpwgdwdiiy5odjv7o2se0bqgjb.lambda-url.us-east-1.on.aws/iiif/3/og-2023-kc-nara_${result.id}/square/300,/0/default.jpg`,
			details: details,
			full_text: full_text,
			url: `${base}/view/afile/${result.id.replace('_', '/')}?tab=page`,
			pageInfo: ''
		};
	};

	const templateAFileResult = (result) => {
		return {
			id: result.id,
			label: `${result.fields.last_name.nara}, ${result.fields.first_name.nara} | ${result.id}`,
			thumbnail: `https://dctn4zjpwgdwdiiy5odjv7o2se0bqgjb.lambda-url.us-east-1.on.aws/iiif/3/og-2023-kc-nara_${result.id}_0000/square/250,/0/default.jpg`,
			details: `DOB: ${result.fields.dob?.nara}; SEX: ${result.fields.sex?.nara}; DOE: ${result.fields.doe?.nara}, COB: ${result.fields.cob?.nara}, POE: ${result.fields.poe?.nara}`,
			full_text: '',
			url: `${base}/view/afile/${result.id}/0000?tab=afile`,
			pageInfo: (result.page_count || 0) + ' pages'
		};
	};

	const getPaginatedItems = (page) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return results
			.slice(startIndex, endIndex)
			.map((result) =>
				data.scope === 'afile' ? templateAFileResult(result) : templatePageResult(result)
			);
	};

	function handlePaginationChange(event) {
		const { page, pageSize } = event.detail;

		itemsPerPage = pageSize;
		currentPage = page;
		console.log('updating!');
		items = getPaginatedItems(page);
	}
</script>

{#if localStorage.getItem('formReferrer')}
	<a href={localStorage.getItem('formReferrer')}>Back to search</a>
{/if}

<h1 class="py-4">Search Results</h1>

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
				<img src={item.thumbnail} alt={item.label} class="mr-4 h-40 w-36 rounded object-cover" />
				<div>
					<div class="text-lg font-semibold">{item.label}</div>
					<div class="text-sm text-gray-500">{item.pageInfo}</div>
					<div class="my-2 text-xs text-gray-700">{item.details}</div>
					<div class="my-2 font-mono text-xs text-gray-700">{item.full_text}</div>
				</div>
			</div>
		</ClickableTile>
	{/each}
</div>
