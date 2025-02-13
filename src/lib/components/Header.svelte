<script>
	import { base } from '$app/paths';
	import { Link, OutboundLink } from 'carbon-components-svelte';
</script>

<header class="sticky top-0 z-50">
	<div class="mb-10 bg-slate-900 px-4 py-2 md:px-8 lg:px-28">
		<nav class="flex w-full flex-row flex-wrap items-center justify-between gap-2 md:gap-8">
			<div class="flex items-center justify-start gap-2 md:gap-8">
				<Link class="pr-2 text-xs !text-white" href={base}>
					<span class="text-lg font-bold">M/S Reading Room</span>
				</Link>
				<Link class="pr-2 !text-white" href="{base}/about">About + Credits</Link>
				<Link class="pr-2 !text-white" href="{base}/data-guide">Data Guide</Link>
			</div>
			<div class="flex items-center justify-end">
				<OutboundLink
					class="pr-2 !text-white"
					href="https://migrants-and-the-state.github.io/">M/S Project</OutboundLink
				>
				<OutboundLink
					class="pr-2 !text-white"
					href="https://github.com/migrants-and-the-state">GitHub</OutboundLink
				>
				<OutboundLink
					class="pr-2 !text-white"
					href="https://migrants-and-the-state.github.io/#contact">Contact</OutboundLink
				>
			</div>
		</nav>
	</div>
</header>
