<script>
	import { base } from '$app/paths';
	import { updateScopeIndex } from '$lib/scope';
	import {
		Link,
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';
	import {
		FolderShared as AFileIcon,
		DocumentBlank as PageIcon,
		LicenseDraft as G325AIcon,
		Policy as NatCertIcon
	} from 'carbon-icons-svelte';

	const stats = {
		afile: { label: 'A-Files', sample: 423, full: 751 },
		page: { label: 'Pages', sample: 20516, full: 37396 },
		g325a: { label: 'G-325 Forms*', sample: 504, full: 'unknown' },
		natcert: { label: 'Naturalization Certificates*', sample: 87, full: 'unknown' }
	};
</script>

<div class="mb-8 flex w-full flex-wrap gap-4 md:flex-nowrap md:gap-10">
	<div class="my-6 basis-full md:basis-1/2">
		<p class="py-2 text-sm md:text-base">
			<Link
				class="text-sm md:text-base"
				href="https://migrants-and-the-state.github.io"
				target="_blank">Migrants and the State (M/S)</Link
			> aims to provide large-scale access to the public domain migrant records held by the U.S. National
			Archives (NARA). This prototype is designed to gather feedback on our current methods of enhancing
			A-file searchability and solicit ideas for future project development.
		</p>
		<p class="py-2 text-sm md:text-base">
			Below you can search for entire <strong>A-Files</strong> or specific <strong>Pages</strong>
			within them using both NARA-cataloged and experimentally-extracted metadata. Some pages have
			been machine-identified as <strong>G-325 Forms</strong> or
			<strong>Naturalization Certificates</strong>; these special pages include additional metadata
			fields created by our project team.
		</p>
		<p class="py-2 text-sm md:text-base">
			Prior to using the site, please read about our data curation choices and machine learning
			model training in the <Link class="text-sm md:text-base" href="{base}/data-guide"
				>Data Guide</Link
			>.
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
							<StructuredListCell>
								{#if key === 'afile'}
									<AFileIcon class="inline" />
								{:else if key === 'page'}
									<PageIcon class="inline" />
								{:else if key === 'g325a'}
									<G325AIcon class="inline" />
								{:else if key === 'natcert'}
									<NatCertIcon class="inline" />
								{/if}
								{stats[key].label || key}
							</StructuredListCell>
							<StructuredListCell>
								<Link href="{base}/results/{key}?query=">{stats[key].sample.toLocaleString()}</Link>
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
