<script>
  import { base } from '$app/paths';
  
  import { Button, ButtonSet } from 'carbon-components-svelte';
</script>

<ButtonSet>
  <Button kind="secondary">Reset</Button>
  <Button href={`${base}/results`}>Submit</Button>
</ButtonSet>