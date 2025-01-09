<script>
  import { base } from '$app/paths';
  import { ClickableTile, Pagination } from "carbon-components-svelte";

  import afiles from '$lib/data/afiles.json';

  const totalItems = afiles.length;
  
  $: currentPage = 1;
  $: itemsPerPage = 10;
  $: items = getPageItems(currentPage);

  const getPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return afiles
      .slice(startIndex, endIndex)
      .map(afile => ({
        id: afile.id,
        matchedText: afile.metadata?.description || "No description available",
        thumbnail: afile.thumbnail_url,
        url: `${base}/view/afile/${afile.id}/0000`,
        pageCount: afile.page_count || 0,
      }));
  };

  function handlePaginationChange(event) {
    const { page, pageSize } = event.detail;

    itemsPerPage = pageSize;
    currentPage = page;
    items = getPageItems(page);
  }
</script>

<h2 class="mb-6">Search Results</h2>

<Pagination
  class="mb-6"
  totalItems={totalItems}
  pageSizes={[10, 20, 50]}
  pageSize={itemsPerPage}
  on:update={handlePaginationChange}
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