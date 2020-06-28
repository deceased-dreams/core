<script>
  import { onMount } from 'svelte';
  import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
  import axios, { BASE_URL } from 'dinastry/services/axios';
  import ViewNav from './view_nav.svelte';
  import { pop as pop_route } from 'svelte-spa-router';

  onMount(async function () {
    setTimeout(() => {
      window.open(BASE_URL + '/api/data/export', '_blank');
      pop_route();
    }, 3000);
  }); 
</script>

<style>
  .export-spinner {
    animation-name: spinner;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  }
</style>

<ViewNav/>
<div class="w-full my-6 px-12">
  <div class="w-2/3 mx-auto my-12 rounded p-8 flex flex-col justify-center items-center">
    <div class="export-spinner text-indigo-600 spinner w-48 h-48">
      <FaSpinner />
    </div>
    <div class="text-2xl font-bold text-center mt-4">
      Harap Tunggu...
    </div>
  </div>
</div>