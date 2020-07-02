<script>
  import { onMount } from 'svelte';
  import DataForm from '../data/form.svelte';
  import JoButton from 'dinastry/components/commons/JoButton.svelte';
  import JoAsyncContent from 'dinastry/components/commons/JoAsyncContent.svelte';
  import all_criteria from 'dinastry/services/all_criteria';
  import get_nb_summary from 'dinastry/services/nb_summary';
  import { create_predictor } from 'dinastry/services/predict';
  import dummy_row from 'dinastry/commons/dummy_row';
  import create_row_converter from 'dinastry/services/row_converter';

  let predict;
  let row_converter;
  let networkStatus = 'ready';
  let errorMessage = '';
  let nama = '';
  let criteria = [];
  let result = {
    cls: 0,
    prob: 0
  };

  $: resultTextColor = result.cls ? 'blue' : 'red';
  $: resultText = result.cls ? 'Layak' : 'Tidak Layak';

  function on_predict (input) {
    networkStatus = 'loading';
    const result = predict(input);
    networkStatus = 'success';
    console.log(result);
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
  {errorMessage}
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
      <div class="mb-6" slot="actions">
        <JoButton
          action={() => {
            const { nama: _nama, ...rest } = result;
            nama = _nama;
            on_predict(row_converter(rest));
          }}
          disabled={invalid}
          dark 
          color="indigo" 
          label="klasifikasi" 
        />
      </div>
    </DataForm>
  </div>

  <div slot="success" class="w-3/4 mx-auto my-12 p-4 flex items-center justify-center flex-col">
    <div 
      class={`text-center text-3xl font-bold text-${resultTextColor}-800`}
    >{resultText}
    </div>
    <div 
      class={`text-center text-xl font-bold text-${resultTextColor}-800`}
    >
      probabilitas {(result.prob * 100).toFixed(3)} %
    </div>
    <JoButton
      action={() => {
        networkStatus = 'ready';
      }}
      dark 
      color="blue" 
      label="ulangi" 
    />
  </div>
</JoAsyncContent>
