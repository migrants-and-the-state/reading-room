<script>
  import { base } from '$app/paths';
  import { Link } from 'carbon-components-svelte';
  import { Policy as NatCertIcon } from 'carbon-icons-svelte';
</script>

<div class="max-w-prose py-4">
  <p class="py-2">
    <NatCertIcon class="inline" size="20" />
    <span class="font-bold">Naturalization Certificates</span> are Fusce non accumsan diam. Quisque
    ex felis, semper nec lorem vitae, gravida efficitur ligula.
  </p>
  <p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>