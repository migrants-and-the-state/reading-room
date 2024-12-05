<script>
	import '../app.css';
	import {
		ExpandableTile,
		OverflowMenu,
		OverflowMenuItem,
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Button
	} from 'carbon-components-svelte';
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
			<ExpandableTile
				light
				class="max-w-prose"
				tileExpandedLabel="Read less"
				tileCollapsedLabel="Read more"
			>
				<div slot="above">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet malesuada
						odio. Sed laoreet tortor eu orci ornare, condimentum commodo metus egestas. Donec vitae
						felis purus. Nulla ullamcorper venenatis varius. Vivamus varius in diam ut iaculis.
						Curabitur elementum risus non accumsan tincidunt.
					</p>
				</div>
				<div slot="below" class="py-6">
					<p>
						Proin consectetur enim ornare dolor mollis, tincidunt tincidunt erat pellentesque.
						Quisque varius, nunc vel condimentum dignissim, turpis magna consectetur magna, vitae
						posuere ligula nibh nec nisl. Suspendisse imperdiet elit eros, quis scelerisque ante
						pharetra non. Proin sodales convallis lacus vitae vestibulum. Donec vitae felis purus.
						Nulla ullamcorper venenatis varius. Vivamus varius in diam ut iaculis. Curabitur
						elementum risus non accumsan tincidunt.
					</p>
					<br /><br />
					<Button kind="primary" href="" target="_blank">Read More</Button>
				</div>
			</ExpandableTile>
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
							<StructuredListCell noWrap>A-Files</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap>Pages</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap>G325A Forms identified</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
							<StructuredListCell>0</StructuredListCell>
						</StructuredListRow>

						<StructuredListRow>
							<StructuredListCell noWrap>Naturalization Certificates identified</StructuredListCell>
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
