<script>
	import '../app.css';
	import { ExpandableTile } from "carbon-components-svelte";
	let { children } = $props();
</script>

<div class="min-h-screen p-12">
	<header>
		<h1 class="mb-6">M/S Sample Document Explorer</h1>
		<div class="flex md:flex-nowrap flex-wrap w-full md:gap-10">
			<div class="md:basis-1/2 basis-full">
				<ExpandableTile light class="max-w-prose" tileExpandedLabel="Read less" tileCollapsedLabel="Read more">
					<div slot="above">
						<h2 class="py-6">About</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet malesuada odio. Sed laoreet tortor eu orci ornare, condimentum commodo metus egestas. Etiam in velit molestie, volutpat turpis id, faucibus odio. Vivamus gravida nunc et tincidunt vehicula. Nulla nec convallis eros. Aenean a porttitor metus. Praesent convallis sem non lacus lacinia faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
					</div>
					<div slot="below" class="py-6">
						<p>Proin consectetur enim ornare dolor mollis, tincidunt tincidunt erat pellentesque. Quisque varius, nunc vel condimentum dignissim, turpis magna consectetur magna, vitae posuere ligula nibh nec nisl. Suspendisse imperdiet elit eros, quis scelerisque ante pharetra non. Proin sodales convallis lacus vitae vestibulum. Donec vitae felis purus. Nulla ullamcorper venenatis varius. Vivamus varius in diam ut iaculis. Curabitur elementum risus non accumsan tincidunt. </p>
					</div>
				</ExpandableTile>
			</div>
			<div class="md:basis-1/2 basis-full">
				<ExpandableTile light class="max-w-prose" tileExpandedLabel="Read less" tileCollapsedLabel="Read more">
					<div slot="above">
						<h2 class="py-6">Statistics</h2>
						<p>A files in sample: 0</p>
						<p>Pages in sample: 0</p>
					</div>
					<div slot="below" class="py-6">
						<p>A files processed: 0</p>
						<p>Pages processed: 0</p>
					</div>
				</ExpandableTile>
			</div>
		</div>
	</header>
	<main class="w-full">
		{@render children()}
	</main>
</div>
