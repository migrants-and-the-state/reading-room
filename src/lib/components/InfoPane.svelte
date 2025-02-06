<script>
	import { base } from '$app/paths';
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
</script>

<div class="flex w-full flex-wrap md:flex-nowrap md:gap-10">
	<div class="basis-full md:basis-1/2 my-6">
		<p class="py-2">
			<a href="https://migrants-and-the-state.github.io/" target="_blank">Migrants and the State (M/S)</a>
			aims to provide large-scale access to the public domain migrant records (A-Files) held by the <a href="https://www.archives.gov/" target="_blank">U.S.
			National Archives (NARA)</a>. This prototype is designed to gather feedback on our current methods of enhancing A-file searchability and 
			solicit ideas for future project development. </p>
		<p class="py-2">
			Below you can search for entire <a href="?tab=afile">A-Files</a> or specific <a href="?tab=page">Pages</a> within them using both NARA-cataloged 
			and experimentally-extracted metadata. Some pages have been machine-identified as <a href="">G-325 Forms</a> or <a href="">Naturalization Certificates</a>; these special pages include additional metadata fields created by our project team.
			For more detailed information on our data curation choices and machine
			learning model training, please see the <a href="{base}/data-guide">Data Guide</a>.
		</p>
	</div>
	<div class="basis-full md:basis-1/2">
		<div class="mb-12 max-w-prose">
			<StructuredList condensed class="!mb-1">
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell head>Statistics</StructuredListCell>
						<StructuredListCell head>This v1-Sample</StructuredListCell>
						<StructuredListCell head>Full Corpus (Ongoing)</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					<StructuredListRow>
						<StructuredListCell noWrap><AFileIcon class="inline" /> A-Files</StructuredListCell>
						<StructuredListCell>423</StructuredListCell>
						<StructuredListCell>751</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap><PageIcon class="inline" /> Pages</StructuredListCell>
						<StructuredListCell>20,516</StructuredListCell>
						<StructuredListCell>37,396</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap><G325AIcon class="inline" /> G325 Forms *</StructuredListCell
						>
						<StructuredListCell>504</StructuredListCell>
						<StructuredListCell>?</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap
							><NatCertIcon class="inline" /> Naturalization Certificates *</StructuredListCell
						>
						<StructuredListCell>87</StructuredListCell>
						<StructuredListCell>?</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredList>
			<div class="py-1 pl-5 text-xs opacity-70">* As identified by M/S heuristic analysis</div>
		</div>
	</div>
</div>
