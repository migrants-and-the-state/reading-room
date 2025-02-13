<script>
	import { Link } from 'carbon-components-svelte';
	// import Search from 'carbon-icons-svelte/lib/Search.svelte';
</script>

<Link {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave>
	<slot />
</Link>
