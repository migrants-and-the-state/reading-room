<script>
  import { onMount } from 'svelte';
  import Mirador from 'mirador';
  import { writable } from 'svelte/store';
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";

  let { data } = $props();
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
        allowWindowSideBar: false,
      },
      windows: [{
        manifestId: 'https://mats-aperitiiif-presenation-api-store-v1.s3.us-east-1.amazonaws.com/og-2024-sf-nara/A002475884/manifest.json',
        canvasId: 'https://mats-aperitiiif-presenation-api-store-v1.s3.us-east-1.amazonaws.com/canvas/og-2024-sf-nara_A002475884_0006.json'
      }],
      thumbnailNavigation: {
        defaultPosition: 'far-right',
      },
      workspaceControlPanel: {
        enabled: false,
      }
    });

    // Subscribe to Mirador store to listen for changes in the canvas
    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const windows = state.windows;
      const windowId = Object.keys(windows)[0];
      const currentCanvas = windows[windowId];
      const currentManifestId = currentCanvas.manifestId;
      const currentCanvasId = currentCanvas.canvasId;
      const canvases = state.manifests[currentManifestId].json.sequences[0].canvases;

      // Find the index of the current canvas
      const currentCanvasIndex = canvases.findIndex(canvas => canvas['@id'] === currentCanvasId);

      // Update the current page based on the canvas index
      currentPage.set(currentCanvasIndex + 1);
			numPages.set(canvases.length);

      console.log('Current Canvas Index:', currentCanvasIndex);
      console.log('Current Page:', currentCanvasIndex + 1);
    });
  });
</script>

<div class="flex gap-6 md:flex-nowrap flex-wrap">
  <div class="basis-1/2 h-[60vh] border-none relative">
    <div id="mirador"></div>
  </div>
  <div class="basis-1/2 h-[60vh] pb-12">
    <Tabs autoWidth type="container" class="h-full">
      <Tab id="afile" label="About this A-File" />
      <Tab id="page" label="About this Page ({$currentPage}/{$numPages})" />
      <svelte:fragment slot="content">
        <TabContent class="bg-white scroll-y h-full">
          <dl class="text-lg">
            <dt class="font-extrabold">A-Number</dt>
            <dd>{data.id}</dd>
            <dt class="font-extrabold">Page Count</dt>
            <dd>50</dd>
            <dt class="font-extrabold">First Name</dt>
            <dd>NATSU</dd>
            <dt class="font-extrabold">Last Name</dt>
            <dd>MIYANISI</dd>
          </dl>
        </TabContent>
        <TabContent class="bg-white scroll-y h-full">
          I'm loading info for page {$currentPage}
        </TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>