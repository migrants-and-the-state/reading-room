<script>
	import { Link } from 'carbon-components-svelte';
	import InformationSquare from 'carbon-icons-svelte/lib/InformationSquare.svelte';
</script>

<Link {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave icon={InformationSquare}>
	<slot />
</Link>
