<script>
	import { base } from '$app/paths';
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
	<div class="basis-full md:basis-1/2">
		<p class="py-6">
			<a href="https://migrants-and-the-state.github.io/" target="_blank">Migrants and the State</a> aims to provide large-scale access to the public domain migrant records held by the U.S. National Archives (NARA). <a href="{base}/about">This prototype</a> is designed to gather feedback on our current methods of enhancing A-file searchability and solicit ideas for future project development. For detailed information on our data curation choices and machine learning model training, please see the <a href="{base}/data-guide">Data Guide</a>. 
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
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap><PageIcon class="inline" /> Pages</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap
							><G325AIcon class="inline" /> G325A Forms *</StructuredListCell
						>
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap
							><NatCertIcon class="inline" /> Naturalization Certificates *</StructuredListCell
						>
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredList>
			<div class="py-1 pl-5 text-xs opacity-70">* As identified by M/S heuristic analysis</div>
		</div>
	</div>
</div>
