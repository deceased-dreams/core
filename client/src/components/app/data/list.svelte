<script>
  import { onMount } from 'svelte';
  import { push as push_route } from 'svelte-spa-router';
  import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
  import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
  import ViewNav from './view_nav.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import JoInput from 'dinastry/components/commons/JoInput.svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import all_criteria from 'dinastry/services/all_criteria';
  import all_rows from 'dinastry/services/rows';
  import 'dinastry/styles/jo-table.css';

  const take = 10;

  let criteria = [];
  let hidden_criteria = [];
  let rows = [];
  let keyword = '';
  let networkStatus = 'loading';

  $: filtered_criteria = criteria.filter(c => !hidden_criteria.includes(c.key));
  $: search({ keyword });

  function hide_criteria (key) {
    hidden_criteria = [...hidden_criteria, key];
  }

  function show_criteria (key) {
    hidden_criteria = hidden_criteria.filter(k => k != key);
  }

  async function search({ keyword }) {
    rows = await all_rows({ take, keyword });
  }

  async function load_data () {
    networkStatus = 'loading';
    try {
      criteria = await all_criteria();
      rows = await all_rows({ take });
      networkStatus = 'success';
    } catch (err) {
      console.log(err);
      networkStatus = 'error';
    }
  }

  onMount(load_data);
</script>

<ViewNav/>
<JoAsyncContent {networkStatus}>
  <div slot="success" class="w-full my-6 px-12">
    <div class="flex flex-wrap items-center my-6">
      {#each criteria as crit (crit.key)}
        <div 
          class="bg-gray-300 rounded border border-gray-200 font-semibold p-1 mr-3 flex items-center"
        >
          <input 
            checked={!hidden_criteria.includes(crit.key)}
            type="checkbox"
            on:change={() => {
              if (hidden_criteria.includes(crit.key)) {
                show_criteria(crit.key);
              } else {
                hide_criteria(crit.key);
              }
            }}
          />
          <span class="text-xs">{crit.label}</span>
        </div>
      {/each}
    </div>
    <div class="my-6">
      <JoInput bind:value={keyword} placeholder="keyword..." />
    </div>
    <table class="jo-table">
      <thead>
        <tr>
          <th>Nama</th>
          {#each filtered_criteria as crit (crit.key)}
            <th class="text-xs">{crit.key.substring(0, 4)}</th>
          {/each}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row._id)}
          <tr class="text-xs">
            <td>{row.nama}</td>
            {#each filtered_criteria as crit (crit.key)}
              <td>{row[crit.key]}</td>
            {/each}
            <td class="flex items-center justify-end">
              <JoButton 
                action={() => {
                  push_route(`/app/data/update/${row._id}`)
                }}
                dark 
                color="blue" 
                cls="p-1 rounded-full"
              >
                <div class="h-3 w-3">
                  <FaPencilAlt/>
                </div>
              </JoButton>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="my-6">
      <JoButton label="perbanyak"/>
      <JoButton label="kurangi"/>
    </div>
  </div>
</JoAsyncContent>
