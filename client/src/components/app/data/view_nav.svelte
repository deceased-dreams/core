<script>
  import FaTable from 'svelte-icons/fa/FaTable.svelte'
  import FaUpload from 'svelte-icons/fa/FaUpload.svelte'
  import FaDownload from 'svelte-icons/fa/FaDownload.svelte'
  import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'

  const links = [
    { path: 'list', icon: FaTable },
    { path: 'import', icon: FaUpload },
    { path: 'export', icon: FaDownload },
    { path: 'create', icon: FaPencilAlt },
  ];
</script>

<div class="w-full bg-blue-800 text-white flex items-center px-12">
  {#each links as link (link.path)}
    <a 
      class="px-4 py-3 hover:bg-gray-800 text-sm font-bold flex items-center" 
      href={"#/app/data/" + link.path}
    >
      <div class="h-4 w-4 mr-1">
        <svelte:component this={link.icon} />
      </div>
      <span>{link.path}</span>
    </a>
  {/each}
</div>
