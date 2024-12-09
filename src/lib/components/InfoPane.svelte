<script>
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
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet malesuada odio. Sed
			laoreet tortor eu orci ornare, condimentum commodo metus egestas. Donec vitae felis purus.
			Nulla ullamcorper venenatis varius. Vivamus varius in diam ut iaculis. Curabitur elementum
			risus non accumsan tincidunt.
		</p>
	</div>
	<div class="basis-full md:basis-1/2">
		<div class="max-w-prose">
			<StructuredList condensed>
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
						<StructuredListCell noWrap><G325AIcon class="inline" /> G325A Forms*</StructuredListCell
						>
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>

					<StructuredListRow>
						<StructuredListCell noWrap
							><NatCertIcon class="inline" /> Naturalization Certificates*</StructuredListCell
						>
						<StructuredListCell>0</StructuredListCell>
						<StructuredListCell>0</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredList>
		</div>
	</div>
</div>
