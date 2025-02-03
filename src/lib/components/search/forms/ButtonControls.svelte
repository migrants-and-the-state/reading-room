<script>
	import { base } from '$app/paths';
	import { Button, ButtonSet } from 'carbon-components-svelte';
	export let isSearchInvalid;

</script>

<ButtonSet>
	<Button href="javascript:window.location.reload(true)" kind="secondary">Reset</Button>
	{#if isSearchInvalid}
		<Button disabled type="submit">Submit</Button>
	{:else}
		<Button type="submit">Submit</Button>
	{/if}
</ButtonSet>
