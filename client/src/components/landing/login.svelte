<script>
  import { onMount } from 'svelte';
  import { push as pushRoute } from 'svelte-spa-router';
  import FrontBase from './base.svelte';
  import { login, currentUser } from 'dinastry/services/auth.js';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import all_is_null from 'dinastry/commons/all_is_null';

  let username = '';
  let password = '';
  let networkStatus = 'loading';
  let errorMessage = '';
  $: errors = {
    username: username == '' ? 'username invalid' : null,
    password: password == '' ? 'password invalid' : null
  };
  $: invalid = !all_is_null(errors);

  function doLogin () {
    networkStatus = 'loading';
    login(username, password)
      .then(isOk => {
        pushRoute('/app/data/list');
      })
      .catch(err => {
        networkStatus = 'error';
        errorMessage = err;
      });

  }

  onMount(() => {
    networkStatus = 'loading';
    const loggedInUser = currentUser();
    if (loggedInUser && loggedInUser != '') {
      pushRoute('/app/data/list');
    }
    networkStatus = 'ready';
  });
</script>

<FrontBase>
  <JoAsyncContent
    {networkStatus}
    {errorMessage}
  >
    <div 
      slot="ready"
      class="w-1/4 p-4 border border-gray-200 rounded text-gray-700 bg-white" style="background: white;"
    >
      <div class="text-2xl font-semibold text-center mb-4">Login</div>
      <div class="mb-4 flex flex-col">
        <label class="mb-2">Username</label>
        <input bind:value={username} 
          type="text" 
          placeholder="username" class="border rounded border-gray-300 px-2" />
        {#if (errors.username)}
          <p class="text-red-600 text-xs">{errors.username}</p>
        {/if}
      </div>
      <div class="mb-4 flex flex-col">
        <label class="mb-2">Password</label>
        <input 
          bind:value={password}
          type="password" placeholder="password" class="border rounded border-gray-300 px-2" />
        {#if (errors.password)}
          <p class="text-red-600 text-xs">{errors.password}</p>
        {/if}
      </div>
      <div class="flex flex-col">
        <button
          disabled={invalid}
          class="appearance-none p-2 bg-indigo-600 text-white font-medium"
          on:click={doLogin}
        >Masuk</button>
      </div>
    </div>
  </JoAsyncContent>
</FrontBase>
