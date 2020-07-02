<script type="text/javascript">
  import { onMount } from 'svelte';
  import Router, { push as pushRoute } from 'svelte-spa-router';
  import AppBase from './base.svelte';

  import DataList from './data/list.svelte';
  import DataImport from './data/import.svelte';
  import DataExport from './data/export.svelte';
  import DataCreate from './data/create.svelte';
  import DataUpdate from './data/update.svelte';
  import KlasifikasiForm from './klasifikasi/form.svelte';
  import Testing from './testing/index.svelte';
  import Logout from './logout.svelte';

  const prefix = '/app';
  const routes = {
    '/data/list': DataList,
    '/data/import': DataImport,
    '/data/export': DataExport,
    '/data/create': DataCreate,
    '/data/update/:id': DataUpdate,
    '/klasifikasi': KlasifikasiForm,
    '/testing': Testing,
    '/logout': Logout
  };

  onMount(() => {
    const username = localStorage.getItem('dinastry.username');
    if (!username) {
      pushRoute('/auth');
    } else {
      pushRoute('/app/data/list');
    }
  });
</script>

<AppBase>
  <Router {routes} {prefix}></Router>
</AppBase>
