<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { updateScopeIndex } from '$lib/scope';
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';
	import {
		FolderShared as AFileIcon,
		Document as PageIcon,
		Identification as G325AIcon,
		Policy as NatCertIcon
	} from 'carbon-icons-svelte';

	const stats = {
		afile: { label: 'A-Files', sample: 423, full: 751 },
		page: { label: 'Pages', sample: 20516, full: 37396 },
		g325a: { label: 'G325 Forms *', sample: 504, full: 'unknown' },
		natcert: { label: 'Naturalization Certificates *', sample: 87, full: 'unknown' }
	};
</script>

<div class="mb-8 flex w-full flex-wrap gap-4 md:flex-nowrap md:gap-10">
	<div class="my-6 basis-full md:basis-1/2">
		<p class="py-2 text-sm md:text-base">
			<a href="https://migrants-and-the-state.github.io/" target="_blank"
				>Migrants and the State (M/S)</a
			>
			aims to provide large-scale access to the public domain migrant records (A-Files) held by the
			<a href="https://www.archives.gov/" target="_blank">U.S. National Archives (NARA)</a>. This
			prototype is designed to gather feedback on our current methods of enhancing A-file
			searchability and solicit ideas for future project development.
		</p>
		<p class="py-2 text-sm md:text-base">
			Below you can search for entire <span class="font-semibold">A-Files</span> or specific
			<span class="font-semibold">Pages</span>
			within them using both NARA-cataloged and experimentally-extracted metadata. Some pages have been
			machine-identified as <span class="font-semibold">G-325 Forms</span> or
			<span class="font-semibold">Naturalization Certificates</span>; these special pages include
			additional metadata fields created by our project team. For more detailed information on our
			data curation choices and machine learning model training, please see the
			<a href="{base}/data-guide">Data Guide</a>.
		</p>
	</div>
	<div class="my-6 basis-full md:basis-1/2">
		<div class="mb-12 max-w-prose">
			<StructuredList condensed class="!mb-1">
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell head>Statistics</StructuredListCell>
						<StructuredListCell head>M/S Reading Room v1</StructuredListCell>
						<StructuredListCell head>M/S Full Corpus (Ongoing)</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					{#each Object.keys(stats) as key}
						<StructuredListRow>
							<StructuredListCell noWrap>{stats[key].label || key}</StructuredListCell>
							<StructuredListCell>
								<a href="{base}/results/{key}?query=">{stats[key].sample.toLocaleString()}</a>
							</StructuredListCell>
							<StructuredListCell>{stats[key].full.toLocaleString()}</StructuredListCell>
						</StructuredListRow>
					{/each}
				</StructuredListBody>
			</StructuredList>
			<div class="py-1 pl-5 text-xs opacity-70">* As identified by M/S heuristic analysis</div>
		</div>
	</div>
</div>
