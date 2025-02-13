<script>
	import { base } from '$app/paths';
	import {
		Breadcrumb,
		BreadcrumbItem,
		ClickableTile,
		Loading,
		Pagination,
		SkeletonPlaceholder
	} from 'carbon-components-svelte';
	import { search } from '$lib/search';

	export let data;

	$: currentPage = 1;
	$: itemsPerPage = 10;
	$: items = [];

	// Create reactive async function
	$: searchPromise = (async () => {
		return await search(data.scope, data.params);
	})();

	// Reactive pagination based on results
	$: getPaginatedItems = async (page) => {
		const results = await searchPromise;
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return results
			.slice(start, end)
			.map((result) =>
				data.scope === 'afile' ? templateAFileResult(result) : templatePageResult(result)
			);
	};

	localStorage.setItem('resultReferrer', data.url);

	const safeDetail = (result, label, key, method) => {
		if (result?.fields?.[key]?.[method]) {
			return `${label}: ${result.fields[key][method]}; `;
		} else {
			return '';
		}
	};

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
			thumbnail: `https://dctn4zjpwgdwdiiy5odjv7o2se0bqgjb.lambda-url.us-east-1.on.aws/iiif/3/og-2023-kc-nara_${result.id}/full/450,/0/default.jpg`,
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

	function handlePaginationChange(event) {
		const { page, pageSize } = event.detail;
		itemsPerPage = pageSize;
		currentPage = page;
		items = getPaginatedItems(page);
	}
	function handleImageLoad(event) {
		event.target.style.display = 'block';
		event.target.previousElementSibling.style.display = 'none';
	}
</script>

<Breadcrumb class="mb-16">
	{#if localStorage.getItem('formReferrer')}
		<BreadcrumbItem href={localStorage.getItem('formReferrer')}>Home</BreadcrumbItem>
	{:else}
		<BreadcrumbItem href={base}>Home</BreadcrumbItem>
	{/if}
</Breadcrumb>

{#await searchPromise}
	<h1 class="md:mb-16 mb-8 md:text-5xl">Results</h1>
	<Loading />
{:then results}
	{#await getPaginatedItems(currentPage)}
		<Loading />
	{:then items}
	<h1 class="md:mb-16 mb-8 md:text-5xl">Results ({results.length})</h1>
		<Pagination
			class="mb-6"
			bind:page={currentPage}
			totalItems={results.length}
			pageSize={itemsPerPage}
			pageSizes={[10, 20, 50]}
			on:update={handlePaginationChange}
		/>
		<div class="space-y-4">
			{#each items as item}
				<ClickableTile
					href={item.url}
					class="rounded-lg border p-0 shadow transition-shadow duration-200 hover:shadow-lg md:p-4"
				>
					<div class="flex items-start gap-4 md:gap-8">
						<div class="basis-1/3 md:basis-1/6">
							<SkeletonPlaceholder class="rounded object-cover" style="width:100%;height:10rem;" />
							<img
								src={item.thumbnail}
								alt={item.label}
								class="max-h-40 w-full rounded object-cover"
								style="display: none"
								on:load={handleImageLoad}
							/>
						</div>
						<div class="basis-2/3 md:basis-5/6">
							<div class="max-w-prose font-semibold md:text-lg">{item.label}</div>
							<div class="max-w-prose text-sm text-gray-500">{item.pageInfo}</div>
							<div class="my-2 max-w-prose text-xs text-gray-700">
								{item.details.substring(0, 200)}
							</div>
							<div class="my-2 max-w-prose font-mono text-[.7em] text-gray-700 md:text-xs">
								{item.full_text}
							</div>
						</div>
					</div>
				</ClickableTile>
			{/each}
		</div>
	{/await}
{:catch error}
	<div>Error loading results: {error.message}</div>
{/await}
