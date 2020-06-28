<script type="text/javascript">
  import Router from 'svelte-spa-router';
  import AppBase from './base.svelte';

  import DataList from './data/list.svelte';
  import DataImport from './data/import.svelte';
  import DataExport from './data/export.svelte';
  import DataCreate from './data/create.svelte';
  import DataUpdate from './data/update.svelte';

  const prefix = '/app';
  const routes = {
    '/data/list': DataList,
    '/data/import': DataImport,
    '/data/export': DataExport,
    '/data/create': DataCreate,
    '/data/update/:id': DataUpdate
  };
</script>

<AppBase>
  <Router {routes} {prefix}></Router>
</AppBase>
