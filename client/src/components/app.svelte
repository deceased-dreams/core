<script>
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import JoNotification from 'dinastry/components/commons/JoNotification.svelte';
  import JoWarn from 'dinastry/components/commons/JoWarn.svelte';

  import Landing from './landing/index.svelte';
  import Login from './landing/login.svelte';
  import About from './landing/about.svelte';
  import App from './app/index.svelte';

  const routes = {
    '/auth': Login,
    '/app': App,
    '/app/*': App,
    '/about': About,
    '/': Landing
  }
</script>

<style type="text/css">
body {
  margin: 0 !important;
  overflow-x: hidden !important;
}
</style>

<JoWarn></JoWarn>
<JoNotification></JoNotification>
<Router {routes}>
</Router>
