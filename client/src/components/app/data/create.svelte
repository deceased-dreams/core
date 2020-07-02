<script>
  import { onMount } from 'svelte';
  import { pop as pop_route } from 'svelte-spa-router';
  import ViewNav from './view_nav.svelte';
  import DataForm from './form.svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import JoSelect from 'dinastry/components/commons/JoSelect.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import create_row from 'dinastry/services/create_row';
  import dummy_row from 'dinastry/commons/dummy_row';
  import all_criteria from 'dinastry/services/all_criteria';

  let networkStatus = 'ready';
  let criteria = [];
  let _class = 0;

  onMount(async function () {
    try {
      criteria = await all_criteria();
      console.log(criteria);
    } catch (err) {
      networkStatus = 'error';
      console.log(err);
    }
  });

  function on_save (item) {
    networkStatus = 'loading'
    let _item = {
      ...item,
      _class
    }
    create_row(_item)
      .then(() => {
        networkStatus = 'success'
      })
      .catch(err => {
        console.log(err);
        networkStatus = 'error'
      })
  }
</script>

<ViewNav/>
<JoAsyncContent 
  {networkStatus}
  errorMessage='gagal menginput data calon penerima bantuan'
>

  <div slot="ready" class="w-1/3 mx-auto my-6 shadow-lg p-4">
    <div class="mb-6 text-lg font-bold">
      Input Data Penerima Bantuan
    </div>
    <DataForm
      initial={dummy_row()}
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
