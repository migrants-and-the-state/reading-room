<script>
	import { base } from '$app/paths';
	import { Link, OutboundLink } from 'carbon-components-svelte';
</script>

<header class="sticky top-0 z-50">
	<div class="mb-10 bg-slate-900 px-4 py-2 md:px-8 lg:px-36">
		<nav class="flex flex-row flex-wrap gap-2 md:gap-8">
			<Link class="pr-2 text-xs !text-white" href={base}>M/S Reading Room v1</Link>
			<Link class="pr-2 !text-white" href="{base}/about">About + Credits</Link>
			<Link class="pr-2 !text-white" href="{base}/data-guide">Data Guide</Link>
			<OutboundLink class="pr-2 !text-white" href="https://migrants-and-the-state.github.io/"
				>M/S Project</OutboundLink
			>
			<OutboundLink class="pr-2 !text-white" href="https://github.com/migrants-and-the-state"
				>GitHub</OutboundLink
			>
			<OutboundLink
				class="pr-2 !text-white"
				href="https://migrants-and-the-state.github.io/#contact">Contact</OutboundLink
			>
		</nav>
	</div>
</header>
