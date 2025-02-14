<script>
	import { Link } from 'carbon-components-svelte';
	import JumpLink from 'carbon-icons-svelte/lib/JumpLink.svelte';
</script>

<Link {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave icon={JumpLink}>
	<slot />
</Link>
