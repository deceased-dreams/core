<script>
  import { pop as pop_route } from 'svelte-spa-router';
  import JoInput from 'dinastry/components/commons/JoInput.svelte';
  import JoNumber from 'dinastry/components/commons/JoNumber.svelte';
  import JoSelect from 'dinastry/components/commons/JoSelect.svelte';
  import JoRadioGroup from 'dinastry/components/commons/JoRadioGroup.svelte';
  import notification from 'dinastry/stores/notification';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import ViewNav from './view_nav.svelte';
  import axios from 'dinastry/services/axios';

  const optionsAction = [
    { value: 'DELETE', label: 'Hapus Data Lama' },
    { value: 'NONE', label: 'Biarkan Data Lama' }
  ]

  let action = 'NONE';
  let data = null;
  let form;
  let networkStatus = 'success';

  function onChange(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event){
    data = JSON.parse(event.target.result);
    console.log(data);
  }

  async function upload () {
    let form_data = new FormData(form);
    try {
      await axios.post('/api/data/import', form_data);
      notification.show({
        message: 'sukses mengimport data',
        type: 'info'
      })
    } catch (err) {
      console.log(err);
      notification.show({
        message: 'gagal mengimport data',
        type: 'danger'
      });
    }
    pop_route();
  }
</script>

<ViewNav/>
<div class="w-full my-6 px-12">
  <div class="w-1/3 mx-auto my-12 shadow rounded p-8">
    <div class="text-lg font-semibold pb-6 border-b border-gray-400">
      Form Import Data
    </div>

    <form bind:this={form} class="my-2 flex flex-col">
      <label class="mb-1 text-sm">Data Lama Akan Diapakan?</label>
      <JoRadioGroup
        name="action"
        cls="mb-6"
        options={optionsAction}
        bind:group={action}
      />
      <label class="mb-1 text-sm">Pilih File</label>
      <input 
        type="file"
        name="import_file"
        on:change={onChange}
        class="bg-white border-gray-400 border p-2 py-1 text-sm font-semibold rounded"
      />
      <JoButton cls="my-6" dark color="indigo" label="simpan" action={upload}>
      </JoButton>
    </form>
  </div>
</div>
