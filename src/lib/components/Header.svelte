<script>
	import { base } from '$app/paths';
	import { Link, OutboundLink } from 'carbon-components-svelte';
</script>

<header>
	<div class="mb-20 bg-slate-900 px-12 py-2">
		<nav class="flex flex-row flex-wrap gap-4 md:gap-8">
			<Link class="text-xs !text-white" href={base}>Home</Link>
			<Link class="!text-white" href="{base}/about">About + Credits</Link>
			<Link class="!text-white" href="{base}/data-guide">Data Guide</Link>
			<OutboundLink class="!text-white" href="https://migrants-and-the-state.github.io/"
				>M/S Project</OutboundLink
			>
			<OutboundLink class="!text-white" href="https://github.com/migrants-and-the-state"
				>GitHub</OutboundLink
			>
		</nav>
	</div>

	<div class="px-12">
		<Link href="{base}"><h1>M/S Corpus UI (v1-Sample)</h1></Link>
	</div>
</header>
