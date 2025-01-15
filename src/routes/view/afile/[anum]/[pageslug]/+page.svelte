<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Mirador from 'mirador';
	import { writable } from 'svelte/store';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';

	let { data } = $props();
	if (data.status == 404) {
		goto(`${base}/404.html`);
	}

	const afile = data.props.afile;
	const startCanvasId = data.props.canvasId;

	const manifestId = afile.manifest_url;
	const currentPage = writable(0);
	const numPages = writable(0);

	onMount(() => {
		const miradorInstance = Mirador.viewer({
			id: 'mirador',
			window: {
				allowClose: false,
				allowFullscreen: true,
				hideWindowTitle: true,
				allowMaximize: false,
				allowTopMenuButton: false,
				allowWindowSideBar: false
			},
			windows: [
				{
					manifestId: manifestId,
					canvasId: startCanvasId
				}
			],
			thumbnailNavigation: {
				defaultPosition: 'far-right'
			},
			workspaceControlPanel: {
				enabled: false
			}
		});

		// Subscribe to Mirador store to listen for changes in the canvas
		miradorInstance.store.subscribe(() => {
			const state = miradorInstance.store.getState();
			const windows = state.windows;
			const windowId = Object.keys(windows)[0];
			const currentCanvas = windows[windowId];
			const currentCanvasId = currentCanvas.canvasId;
			const currentManifest = state.manifests[manifestId];
			if (currentManifest === undefined) return;

			const canvases = currentManifest.json.sequences[0].canvases;

			// Find the index of the current canvas
			const currentCanvasIndex = canvases.findIndex((canvas) => canvas['@id'] === currentCanvasId);

			// Update the current page based on the canvas index
			currentPage.set(currentCanvasIndex + 1);
			numPages.set(canvases.length);
		});
	});
</script>

<div class="flex flex-wrap gap-6 md:flex-nowrap">
	<div class="relative h-[60vh] basis-3/5 border-none">
		<div id="mirador"></div>
	</div>
	<div class="h-[60vh] basis-2/5 pb-12">
		<Tabs autoWidth type="container" class="h-full">
			<Tab id="afile" label="About this A-File" />
			<Tab id="page" label="About this Page ({$currentPage}/{$numPages})" />
			<svelte:fragment slot="content">
				<TabContent class="scroll-y h-full bg-white">
					<dl class="text-lg">
						<dt class="font-extrabold">A-Number</dt>
						<dd>{afile.id}</dd>
						<dt class="font-extrabold">Page Count</dt>
						<dd>{$numPages}</dd>
						<dt class="font-extrabold">First Name</dt>
						<dd>NATSU</dd>
						<dt class="font-extrabold">Last Name</dt>
						<dd>MIYANISI</dd>
					</dl>
				</TabContent>
				<TabContent class="scroll-y h-full bg-white">
					I'm loading info for page {$currentPage}
				</TabContent>
			</svelte:fragment>
		</Tabs>
	</div>
</div>
