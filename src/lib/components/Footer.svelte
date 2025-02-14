<script>
  import LogInOut from '$lib/components/LogInOut.svelte';
  import { timestamp } from '$lib/timestamp.js';
	import { verifyLoginStatus } from '$lib/login';
	let loggedIn = !!verifyLoginStatus();
</script>

<footer class="flex items-center justify-between bg-[#161616] px-4 py-2 text-white md:px-8 lg:px-28">
  <p class="py-1 font-mono text-[.8em]">M/S_RR v0.1.0; {timestamp}</p>
  {#if !!loggedIn}
    <LogInOut />
  {/if}
</footer>