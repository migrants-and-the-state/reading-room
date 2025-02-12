<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getScopeIndex, updateScopeIndex } from '$lib/scope';
	import { onMount } from 'svelte';
	import Mirador from 'mirador';
	import { miradorImageToolsPlugin } from 'mirador-image-tools';
	import { writable } from 'svelte/store';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Link,
		Tabs,
		Tab,
		TabContent,
		Tag
	} from 'carbon-components-svelte';
	import { fields } from '$lib/fields';

	let { data } = $props();

	if (data.status == 404) {
		goto(`${base}/404.html`);
	}

	const afile = data.props.afile;
	const startCanvasId = data.props.canvasId;
	let scopeIndex = getScopeIndex(data.props.tab);

	const manifestId = data.props.manifest_url;
	const currentPageIdx = writable(0);
	currentPageIdx.subscribe((val) => {
		let paddedIdx = val.toString().padStart(4, '0');
		let newTarget = window.location.href.replace(
			getLastUrlSegment(window.location.href),
			paddedIdx
		);
		goto(newTarget, { replaceState: true, invalidateAll: true });
	});
	const numPages = afile.page_count;

	function objGet(obj, path) {
		return path.split('.').reduce((r, k) => r?.[k], obj);
	}

	function getLastUrlSegment(url) {
		return new URL(url).pathname.split('/').filter(Boolean).pop();
	}

	async function pageDataFromIdx(currentPageIdx) {
		const paddedPageIdx = currentPageIdx.toString().padStart(4, '0');
		const jsonPath = `${base}/api/page/${afile.id}_${paddedPageIdx}.json`;
		console.log(jsonPath);
		const resp = await fetch(jsonPath);
		const json = await resp.json();
		return json;
	}

	onMount(() => {
		const previousURL = document.referrer;
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

<Breadcrumb noTrailingSlash class="mb-8">
	{#if localStorage.getItem('resultReferrer')}
		<BreadcrumbItem href={localStorage.getItem('resultReferrer')}>Back to results</BreadcrumbItem>
	{:else}
		<BreadcrumbItem href={base}>Home</BreadcrumbItem>
	{/if}
</Breadcrumb>

<h1 class="mb-8">{afile.fields.last_name?.nara}, {afile.fields.first_name?.nara}</h1>

<div class="flex flex-wrap gap-6 md:flex-nowrap">
	<div class="relative h-[60vh] basis-full border-none md:basis-3/5">
		<div id="mirador"></div>
	</div>
	<div class="basis-full pb-12 md:basis-2/5">
		<Tabs
			selected={scopeIndex}
			autoWidth
			type="container"
			class="h-full"
			on:change={(e) => updateScopeIndex(e.detail)}
		>
			<Tab id="afile" label="About this A-File" />
			<Tab id="page" label="About this Page ({$currentPageIdx + 1}/{afile.page_count})" />
			<svelte:fragment slot="content">
				<TabContent class="bg-white">
					<dl>
						{#each Object.entries(fields['afile'].filter((field) => field.view)) as [_i, field]}
							{@const label = field.text.replace(/\([^)]*\)/, '').trim()}
							{@const ptag = field.id.split('.').slice(-1)[0].trim()}
							{@const value = objGet(afile, field.id)}

							{#if Array.isArray(value)}
								<dt class="pt-2 text-lg font-semibold">
									{label}
									<Link href="{base}/data-guide#{ptag}">
										<Tag size="sm" type="green"># {ptag}</Tag>
									</Link>
								</dt>
								<dd>
									<ul class="list-inside list-disc px-4 text-xs">
										{#each value as subvalue}
											<li>{subvalue}</li>
										{/each}
									</ul>
								</dd>
							{:else if value}
								<dt class="pt-2 text-lg font-semibold">
									{label}
									{#if ptag.startsWith('nara')}
										<Link href="{base}/data-guide#{ptag}">
											<Tag interactive size="sm" type="blue" class="font-mono">#{ptag}</Tag>
										</Link>
									{:else if ptag.startsWith('ms')}
										<Link href="{base}/data-guide#{ptag}">
											<Tag interactive size="sm" type="green" class="font-mono">#{ptag}</Tag>
										</Link>
									{/if}
								</dt>
								<dd>
									<p class="px-4">
										{value}
									</p>
								</dd>
							{/if}
						{/each}
					</dl>
				</TabContent>

				<TabContent class="scroll-y h-full bg-white">
					{#await pageDataFromIdx($currentPageIdx) then pageData}
						{#if pageData}
							<dl>
								{#each Object.entries(fields['xPage'].filter((field) => field.view)) as [_i, field]}
									{@const label = field.text.replace(/\([^)]*\)/, '').trim()}
									{@const ptag = field.id.split('.').slice(-1)[0].trim()}
									{@const value = objGet(pageData, field.id)}
									{#if Array.isArray(value)}
										<dt class="pt-2 text-lg font-semibold">
											{label}
											<Link href="{base}/data-guide#{ptag}">
												<Tag size="sm" type="green">#{ptag}</Tag>
											</Link>
										</dt>
										<dd>
											<ul class="list-inside list-disc px-4 text-xs">
												{#each value as subvalue}
													<li>{subvalue}</li>
												{/each}
											</ul>
										</dd>
									{:else if value}
										<dt class="pt-2 text-lg font-semibold">
											{label}
											{#if ptag.startsWith('nara')}
												<Link href="{base}/data-guide#{ptag}">
													<Tag interactive size="sm" type="blue" class="font-mono">#{ptag}</Tag>
												</Link>
											{:else if ptag.startsWith('ms')}
												<Link href="{base}/data-guide#{ptag}">
													<Tag interactive size="sm" type="green" class="font-mono">#{ptag}</Tag>
												</Link>
											{/if}
										</dt>
										<dd>
											<p class="px-4">
												{value}
											</p>
										</dd>
									{/if}
								{/each}
								{#if pageData.hasOwnProperty('full_text')}
									<dt class="pt-2 text-lg font-semibold">
										Full Text
										<Link href="{base}/data-guide#ms_ocr_v1">
											<Tag size="sm" type="green">#ms_ocr_v1</Tag>
										</Link>
									</dt>
									<dd>
										<p class="w-[50ch] max-w-full text-wrap break-words px-4 font-mono text-xs">
											{pageData.full_text}
										</p>
									</dd>
								{/if}
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
