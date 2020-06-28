<script>
  import { pop as pop_route } from 'svelte-spa-router';
  import ViewNav from './view_nav.svelte';
  import DataForm from './form.svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import create_row from 'dinastry/services/create_row';
  import dummy_row from 'dinastry/commons/dummy_row';

  let networkStatus = 'ready';

  function on_save (item) {
    networkStatus = 'loading'
    create_row(item)
      .then(() => {
        networkStatus = 'success'
      })
      .catch(err => {
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
      let:result={result}
      let:invalid={invalid}
    >
      <div class="mb-6" slot="actions">
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
    </DataForm>
  </div>

  <div slot="success" class="text-center">
    <div class="text-xl font-bold my-4">Sukses Menambah Data Kriteria</div>
    <JoButton label="kembali" action={() => pop_route()} />
  </div>
</JoAsyncContent>
