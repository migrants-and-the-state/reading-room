<script>
  import { Loading, Link } from 'carbon-components-svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  export let loggedIn = false;
</script>

<div>
  {#if loggedIn}
    <Link class="!text-white" href="#" on:click={() => localStorage.setItem('password', '')} on:click={() => goto(base)}>
      Logout
    </Link>
  {:else}
    <Link class="!text-white" href="{base}/login">
      Login
    </Link>
  {/if}
</div>