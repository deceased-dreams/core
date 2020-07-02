<script>
  import { onMount } from 'svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import create_row_converter from 'dinastry/services/row_converter';
  import all_criteria from 'dinastry/services/all_criteria';
  import get_nb_summary from 'dinastry/services/nb_summary';
  import { create_predictor } from 'dinastry/services/predict';
  import 'dinastry/styles/jo-table.css';

  let data = [];
  let criteria = [];
  let row_converter;
  let predict;
  let networkStatus = 'ready';
  let errorMessage = '';
  let result = [];

  $: accuracy = result.filter(r => r.hit).length * 1.0 / result.length;

  function onChange(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event){
    data = JSON.parse(event.target.result);
    console.log(data);
  }

  function runTesting () {
    networkStatus = 'loading';
    result = data.map(d => {
      const input = row_converter(d);
      const result = predict(input);
      return {
        ...d,
        result_cls: result.cls,
        result_label: result.cls ? 'Layak' : 'Tidak Layak',
        actual_label: d._class? 'Layak' : 'Tidak Layak',
        hit: result.cls == d._class
      }
    })
    networkStatus = 'success';
  }

  onMount(async function () {
    networkStatus = 'loading';
    try {
      const data = await get_nb_summary();
      predict = create_predictor({ ...data, smooth: 1 });
      criteria = await all_criteria();
      row_converter = create_row_converter(criteria);
      networkStatus = 'ready';
    } catch (err) {
      networkStatus = 'error';
      errorMessage = 'gagal mengambil data';
      console.log(err);
    }
  })
</script>

<JoAsyncContent
  {networkStatus}
>
  <div slot="ready">
    <div class="w-full bg-blue-800 text-white flex items-center justify-center px-12 h-20">
      <div class="font-bold text-2xl">Form Pengujian</div>
    </div>
    <div class="w-full my-6 px-12">
      <div class="w-1/3 mx-auto my-12 shadow rounded p-8">

        <form class="my-2 flex flex-col">
          <label class="mb-1 text-sm">Pilih File Data Uji</label>
          <input 
            type="file"
            name="import_file"
            on:change={onChange}
            class="bg-white border-gray-400 border p-2 py-1 text-sm font-semibold rounded"
          />
          <JoButton cls="my-6" dark color="indigo" label="jalankan" action={runTesting}>
          </JoButton>
        </form>
      </div>
    </div>
  </div>

  <div slot="success">
    <div class="w-full bg-blue-800 text-white flex items-center justify-center px-12 h-20">
      <div class="font-bold text-2xl">Hasil Pengujian</div>
    </div>
    <div class="w-full my-6 px-12">
      <div class="font-semibold text-lg">Akurasi: {(accuracy * 100).toFixed(4)}%</div>
      <table class="jo-table my-6">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Aktual</th>
            <th>Sistem</th>
          </tr>
        </thead>
        <tbody>
          {#each result as row (row._id)}
            <tr class="text-xs">
              <td>{row.nama}</td>
              <td>{row.result_label}</td>
              <td>{row.actual_label}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</JoAsyncContent>


