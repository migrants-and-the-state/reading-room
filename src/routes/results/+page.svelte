<script>
  import { base } from '$app/paths';
  import { ClickableTile, Pagination } from "carbon-components-svelte";
  
  let currentPage = 1;
  const itemsPerPage = 10;
  const totalItems = 52; // Example total items, replace with actual data count

  const getPageItems = (page) => {
    // Replace with actual logic to fetch items for the current page
    return Array.from({ length: itemsPerPage }, (_, index) => ({
      id: index + (page - 1) * itemsPerPage,
      matchedText: "Duis malesuada ut eros sit amet dignissim. Vestibulum vitae mauris quis justo lacinia dictum. Praesent gravida justo quam, quis tristique elit pellentesque sit amet. Donec urna lacus, pharetra in nulla vel, laoreet fringilla elit. Vivamus quis neque id justo porta consectetur a vitae enim. Phasellus blandit ligula ut imperdiet volutpat. Quisque maximus hendrerit magna at aliquam. Donec ipsum nisi, ultrices sed maximus blandit, bibendum sit amet magna. Nulla hendrerit, felis eu fermentum aliquet, sem elit suscipit arcu, a blandit mauris.",
      thumbnail: `https://dctn4zjpwgdwdiiy5odjv7o2se0bqgjb.lambda-url.us-east-1.on.aws/iiif/3/og-2024-sf-nara_A002249550_0000/square/250,/0/default.jpg`,
      url: `${base}/view/afile/${index}`,
      pageCount: 100,
    }));
  };

  $: items = getPageItems(currentPage);

  function handlePaginationChange(event) {
    currentPage = event.detail.page;
    items = getPageItems(currentPage);
  }
</script>

<h2 class="mb-6">Search Results</h2>

<Pagination
  class="mb-6"
  totalItems={totalItems}
  pageSizes={[10, 50]}
  on:change={handlePaginationChange}
/>

<div class="space-y-4">
  {#each items as item}
    <ClickableTile href={item.url} class="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <div class="flex items-center">
        <img src={item.thumbnail} alt={item.title} class="w-24 h-32 object-cover rounded mr-4" />
        <div>
          <div class="text-lg font-semibold">A-File #{item.id}</div>
          <div class="text-sm text-gray-500">{item.pageCount} pages</div>
          <div class="text-sm text-gray-700 my-1">{item.matchedText}</div>
        </div>
      </div>
    </ClickableTile>
  {/each}
</div>