<script>
	import { base } from '$app/paths';
	import { Button, ButtonSet } from 'carbon-components-svelte';
</script>

<ButtonSet>
	<Button href="javascript:window.location.reload(true)" kind="secondary">Reset</Button>
	<Button type="submit">Submit</Button>
</ButtonSet>
