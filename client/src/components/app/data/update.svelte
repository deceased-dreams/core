<script>
  import { onMount } from 'svelte';
  import { pop as pop_route } from 'svelte-spa-router';
  import ViewNav from './view_nav.svelte';
  import DataForm from './form.svelte';
  import JoSelect from 'dinastry/components/commons/JoSelect.svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import update_row from 'dinastry/services/update_row';
  import row_by_id from 'dinastry/services/row_by_id';
  import all_criteria from 'dinastry/services/all_criteria';

  export let params = {};
  $: id = params.id;

  let networkStatus = 'loading';
  let errorMessage = '';
  let initial = {};
  let criteria = {};
  let _class = 0;

  async function on_load () {
    networkStatus = 'loading'
    if (!id) {
      networkStatus = 'error';
      errorMessage = 'id invalid';
      return;
    }
    try {
      const data = await row_by_id(id);
      criteria = await all_criteria();
      initial = data;
      console.log(data);
      networkStatus = 'ready';
    } catch (err) {
      networkStatus = 'error';
      errorMessage = 'gagal mengambil data penerima bantuan';
      console.log(err);
    }
  }

  function on_save (item) {
    networkStatus = 'loading'
    let _item = {
      ...item,
      _class
    }
    update_row(id, _item)
      .then(() => {
        networkStatus = 'success'
      })
      .catch(err => {
        networkStatus = 'error'
        errorMessage = 'gagal mengubah data penerima bantuan';
      })
  }

  onMount(on_load);
</script>

<ViewNav/>
<JoAsyncContent 
  {networkStatus}
  {errorMessage}
>

  <div slot="ready" class="w-1/3 mx-auto my-6 shadow-lg p-4">
    <div class="mb-6 text-lg font-bold">
      Edit Data Penerima Bantuan
    </div>
    <DataForm
      {initial}
      {criteria}
      let:result={result}
      let:invalid={invalid}
    >
      <div slot="actions">
        <div class="mb-6">
          <JoSelect
            options={[
              { value: 1, label: "Layak" },
              { value: 0, label: "Tidak Layak" }
            ]}
            bind:value={_class}
          />
        </div>
        <div class="mb-6">
          <JoButton
            action={() => {
              on_save(result)
            }}
            disabled={invalid}
            dark 
            color="indigo" 
            label="simpan" 
          />
        </div>
      </div>
    </DataForm>
  </div>

  <div slot="success" class="text-center">
    <div class="text-xl font-bold my-4">Sukses Menambah Data Kriteria</div>
    <JoButton label="kembali" action={() => pop_route()} />
  </div>

</JoAsyncContent>
