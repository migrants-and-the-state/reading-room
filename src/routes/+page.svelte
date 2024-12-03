<script>
  import { onMount } from 'svelte';
  import { addDocument, search } from '$lib/search';

  let query = '';
  let results = [];

  // Sample documents
  const documents = [
      { id: 1, content: 'First document content' },
      { id: 2, content: 'Second document content' },
  ];

  onMount(() => {
      documents.forEach(doc => addDocument(doc.id, doc.content));
  });

  function handleSearch() {
      results = search(query);
  }
</script>

<input bind:value={query} on:input={handleSearch} placeholder="Search..." />
<ul>
  {#each results as result}
      <li>{result}</li>
  {/each}
</ul>