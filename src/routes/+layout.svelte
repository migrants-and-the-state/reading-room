<script>
	import '../app.css';
	import { ExpandableTile, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	let { children } = $props();
</script>

<OverflowMenu size="xl">
	<OverflowMenuItem text="M/S Project" href="" />
	<OverflowMenuItem text="Document Explorer" href="" />
	<OverflowMenuItem text="Data Provenance" href="" />
</OverflowMenu>

<div class="min-h-screen p-12">
	<header>
		<h1 class="mb-6">M/S Sample Document Explorer</h1>
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
					<p class="pb-2 font-bold">About</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet malesuada
						odio. Sed laoreet tortor eu orci ornare, condimentum commodo metus egestas.
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
				</div>
			</ExpandableTile>
		</div>
		<div class="basis-full md:basis-1/2">
			<ExpandableTile
				light
				class="max-w-prose"
				tileExpandedLabel="Read less"
				tileCollapsedLabel="Read more"
			>
				<div slot="above">
					<p class="pb-2 font-bold">Statistics (Sample)</p>
					<p>A-Files: 0</p>
					<p>Pages: 0</p>
					<p>G325A Forms identified: 0</p>
					<p>Naturalization Certificates identified: 0</p>
				</div>
				<div slot="below" class="py-6">
					<p class="pb-2 font-bold">Statistics (Corpus)</p>
					<p>A-Files: 0</p>
					<p>Pages: 0</p>
					<p>G325A Forms: 0</p>
					<p>Naturalization Certificates identified: 0</p>
				</div>
			</ExpandableTile>
		</div>
	</div>
	<main class="w-full">
		{@render children()}
	</main>
</div>
