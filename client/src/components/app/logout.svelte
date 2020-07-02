<script>
  import { onMount } from 'svelte';
  import { push as pushRoute } from 'svelte-spa-router';
  import GoodbyeSVG from 'dinastry/icons/people.svg';
  import { logout } from 'dinastry/services/auth.js';

  let imageSize = 128;

  onMount(() => {
    setTimeout(() => {
      logout();
      pushRoute('/auth');
    },2500);
  });
</script>

<div class="flex flex-col items-center justify-center bg-white flex-grow">
  <img src={GoodbyeSVG} class="h-24 w-24" />
  <div class="font-bold text-lg mt-2">Anda telah keluar dari sistem...</div>
</div>
