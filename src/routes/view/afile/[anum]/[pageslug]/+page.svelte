<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Mirador from 'mirador';
	import { miradorImageToolsPlugin } from 'mirador-image-tools';
	import { writable } from 'svelte/store';
	import { Link, Tabs, Tab, TabContent, Tag } from 'carbon-components-svelte';

	let { data } = $props();
	if (data.status == 404) {
		goto(`${base}/404.html`);
	}

	const afile = data.props.afile;
	const startCanvasId = data.props.canvasId;

	const manifestId = data.props.manifest_url;
	const currentPage = writable(0);
	const numPages = afile.page_count;

	onMount(() => {
		const config = {
			id: 'mirador',
			window: {
				imageToolsEnabled: true,
				allowClose: false,
				allowFullscreen: true,
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
		};
		const miradorInstance = Mirador.viewer(config, [...miradorImageToolsPlugin]);

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
		});
	});
</script>

<h1 class="py-4">{afile.fields.last_name?.nara}, {afile.fields.first_name?.nara}</h1>
<div class="flex flex-wrap gap-6 md:flex-nowrap">
	<div class="relative h-[60vh] basis-3/5 border-none">
		<div id="mirador"></div>
	</div>
	<div class="basis-2/5 pb-12">
		<Tabs autoWidth type="container" class="h-full">
			<Tab id="afile" label="About this A-File" />
			<Tab id="page" label="About this Page ({$currentPage}/{afile.page_count})" />
			<svelte:fragment slot="content">
				<TabContent class="scroll-y h-full bg-white">
					<dl class="text-lg">
						{#each Object.entries(afile.fields) as [key, value]}
							{#if typeof value === 'object'}
								{#each Object.entries(value) as [k, v]}
									{#if Array.isArray(v)}
										<!-- <dt class="font-extrabold">{key}</dt>
										<dd>
											<Tag size="sm" type="magenta">{k}</Tag>
											<ol class="list-decimal list-inside text-xs">
												{#each v as subvalue}
													<li>{subvalue}</li>
												{/each}
											</ol>
										</dd> -->
									{:else}
										<dt>{key}</dt>
										<dd>
											<p class="px-4">
												{v}
												<Link href="{base}/data-guide#{k}">
													{#if k.startsWith('nara')}
														<Tag interactive size="sm" type="blue" class="font-mono">{k}</Tag>
													{:else}
														<Tag interactive size="sm" type="green" class="font-mono">{k}</Tag>
													{/if}
												</Link>
											</p>
										</dd>
									{/if}
								{/each}
							{:else}
								<dt class="font-extrabold">{key}</dt>
								<dd>{value}</dd>
							{/if}
						{/each}
					</dl>
				</TabContent>
				<TabContent class="scroll-y h-full bg-white">
					I'm loading info for page {$currentPage}
				</TabContent>
			</svelte:fragment>
		</Tabs>
	</div>
</div>
