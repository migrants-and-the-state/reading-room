<script>
	import { Link } from 'carbon-components-svelte';
	import ArrowUpRight from 'carbon-icons-svelte/lib/ArrowUpRight.svelte';
</script>

<Link
	{...$$restProps}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	target="_blank"
	icon={ArrowUpRight}
>
	<slot />
</Link>
