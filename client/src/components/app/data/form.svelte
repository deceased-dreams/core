<script>
  import { onMount } from 'svelte';
  import JoInput from 'dinastry/components/commons/JoInput.svelte';
  import JoNumber from 'dinastry/components/commons/JoNumber.svelte';
  import JoSelect from 'dinastry/components/commons/JoSelect.svelte';
  import all_criteria from 'dinastry/services/all_criteria';
  import global_numeric_bound from 'dinastry/services/global_numeric_bound';
  import build_errors from 'dinastry/commons/build_errors_from_criteria';
  import all_is_null from 'dinastry/commons/all_is_null';

  let criteria = [];
  let result = {
    nama: ''
  };
  export let initial = {};

  $: errors = {
    nama: result.nama == '' ? 'nama invalid' : null,
    ...build_errors(criteria, result)
  };
  $: invalid = !all_is_null(errors);

  onMount(async () => {
    let _cs = await all_criteria();
    criteria = _cs.map(c => {
      result[c.key] = null;
      if (c.kind == 'numeric') {
        return { ...c, ...global_numeric_bound(c)}
      }
      return c
    });
    if (initial) {
      result = {
        ...result,
        ...initial
      };
    }
    console.log(criteria);
  })
</script>

<div>
  <div class="mb-6 flex flex-col">
    <label>Nama</label>
    <JoInput bind:value={result.nama} />
    {#if (errors.nama)}
      <p class="text-red-600 text-xs">{errors.nama}</p>
    {/if}
  </div>
  {#each criteria as crit (crit._id)}
    <div class="mb-6 flex flex-col">
      <label>{crit.label}</label>
      {#if (crit.kind == 'numeric')}
        <JoNumber min={crit.min} max={crit.max} bind:value={result[crit.key]} />
      {:else}
        <JoSelect options={crit.options} bind:value={result[crit.key]} />
      {/if}
      {#if (errors[crit.key])}
        <p class="text-red-600 text-xs">{errors[crit.key]}</p>
      {/if}
    </div>
  {/each}
  <slot name="actions" {result} {invalid}>
  </slot>
</div>
