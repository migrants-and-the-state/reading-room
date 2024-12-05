<script>
	import '../app.css';
	import {
		OverflowMenu,
		OverflowMenuItem,
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Link
	} from 'carbon-components-svelte';
	import { 
		FolderShared as AFileIcon,
		Document as PageIcon,
		Identification as G325AIcon,
		Policy as NatCertIcon
	} from "carbon-icons-svelte";
	let { children } = $props();
</script>

<OverflowMenu size="xl">
	<OverflowMenuItem text="About" href="" />
	<OverflowMenuItem text="Data Guide" href="" />
	<OverflowMenuItem
		text="M/S Project"
		href="https://migrants-and-the-state.github.io/"
	/>
	<OverflowMenuItem
		text="GitHub"
		href="https://github.com/migrants-and-the-state"
	/>
</OverflowMenu>

<div class="min-h-screen p-12">
	<header>
		<h1 class="mb-6">M/S Corpus UI (v1-Sample)</h1>
	</header>
	<div class="flex w-full flex-wrap md:flex-nowrap md:gap-10">
		<div class="basis-full md:basis-1/2">
			<p class="py-6">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet malesuada
				odio. Sed laoreet tortor eu orci ornare, condimentum commodo metus egestas. Donec vitae
				felis purus. Nulla ullamcorper venenatis varius. Vivamus varius in diam ut iaculis.
				Curabitur elementum risus non accumsan tincidunt.
			</p>
			<Link href="">Read More</Link>
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
							<StructuredListCell noWrap><AFileIcon class="inline"/> A-Files</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap><PageIcon class="inline"/> Pages</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap><G325AIcon class="inline"/> G325A Forms*</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap><NatCertIcon class="inline" /> Naturalization Certificates*</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>
					</StructuredListBody>
				</StructuredList>
			</div>
		</div>
	</div>
	<main class="w-full">
		{@render children()}
	</main>
</div>
