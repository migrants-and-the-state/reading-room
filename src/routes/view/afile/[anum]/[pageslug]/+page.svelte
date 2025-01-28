<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getScopeIndex, updateScopeIndex } from '$lib/scope';
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
	let scopeIndex = getScopeIndex(data.props.tab);

	const manifestId = data.props.manifest_url;
	const currentPageIdx = writable(0);
	const numPages = afile.page_count;

	async function pageDataFromIdx(currentPageIdx) {
		const paddedPageIdx = currentPageIdx.toString().padStart(4, '0');
		const jsonPath = `${base}/api/page/${afile.id}_${paddedPageIdx}.json`;
		console.log(jsonPath);
		const resp = await fetch(jsonPath);
		const json = await resp.json();
		return json;
	}

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
			const currentManifest = state.manifests[manifestId];
			if (currentManifest === undefined) return;

			const canvases = currentManifest.json.sequences[0].canvases;

			// Find the index of the current canvas
			const currentCanvasIndex = canvases.findIndex(
				(canvas) => canvas['@id'] === currentCanvas.canvasId
			);

			// Update the current page based on the canvas index
			currentPageIdx.set(currentCanvasIndex);
		});
	});
</script>

<h1 class="py-4">{afile.fields.last_name?.nara}, {afile.fields.first_name?.nara}</h1>

<div class="flex flex-wrap gap-6 md:flex-nowrap">
	<div class="relative h-[60vh] basis-3/5 border-none">
		<div id="mirador"></div>
	</div>
	<div class="basis-2/5 pb-12">
		<Tabs 
			selected={scopeIndex}
			autoWidth type="container" 
			class="h-full"
			on:change={(e) => updateScopeIndex(e.detail)}
		>
			<Tab id="afile" label="About this A-File" />
			<Tab id="page" label="About this Page ({$currentPageIdx + 1}/{afile.page_count})" />
			<svelte:fragment slot="content">
				<TabContent class="scroll-y h-full w-full bg-white">
					<dl>
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
										<dt class="pt-2 text-lg font-semibold">{key}</dt>
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
								<dt class="pt-2 text-lg font-semibold">{key}</dt>
								<dd>{value}</dd>
							{/if}
						{/each}
					</dl>
				</TabContent>

				<TabContent class="scroll-y h-full bg-white">
					{#await pageDataFromIdx($currentPageIdx) then pageData}
						{#if pageData}
							{#each Object.entries(pageData.fields) as [key, value]}
								<dl>
									{#if typeof value === 'boolean'}
										<!--skip for now-->
									{:else}
										{#each Object.entries(value) as [k, v]}
											{#if Array.isArray(v)}
												<dt class="pt-2 text-lg font-semibold">{key}</dt>
												<dd class="px-4">
													{v.join('; ')}
													<Link href="{base}/data-guide#{k}">
														<Tag interactive size="sm" type="green" class="font-mono">{k}</Tag>
													</Link>
												</dd>
											{:else if typeof v === 'object'}
												{#each Object.entries(v) as [kk, vv]}
													<dt class="pt-2 text-lg font-semibold">{k}</dt>
													<dd class="px-4">
														{vv}
														<Link href="{base}/data-guide#{kk}">
															<Tag interactive size="sm" type="green" class="font-mono">{kk}</Tag>
														</Link>
													</dd>
												{/each}
											{:else}
												<dt class="pt-2 text-lg font-semibold">{key}</dt>
												<dd class="px-4">
													{v}
													<Link href="{base}/data-guide#{k}">
														<Tag interactive size="sm" type="green" class="font-mono">{k}</Tag>
													</Link>
												</dd>
											{/if}
										{/each}
									{/if}
								</dl>
							{/each}
							<dl>
								<dt class="pt-2 text-lg font-semibold">
									full_text <Link href="{base}/data-guide#ms_ocr_v1"
										><Tag interactive size="sm" type="green" class="font-mono">ms_ocr_v1</Tag></Link
									>
								</dt>
								<dd>
									<p class="w-[50ch] max-w-full text-wrap break-words px-4 font-mono text-xs">
										{#if pageData.full_text}
											{pageData.full_text}
										{:else}
											None
										{/if}
									</p>
								</dd>
							</dl>
						{:else}
							<p>loading...</p>
						{/if}
					{/await}
				</TabContent>
			</svelte:fragment>
		</Tabs>
	</div>
</div>
