<script>
  import { onMount } from 'svelte';
  import JoInput from 'dinastry/components/commons/JoInput.svelte';
  import JoNumber from 'dinastry/components/commons/JoNumber.svelte';
  import JoSelect from 'dinastry/components/commons/JoSelect.svelte';
  import build_errors from 'dinastry/commons/build_errors_from_criteria';
  import all_is_null from 'dinastry/commons/all_is_null';

  export let criteria = [];
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
    criteria.forEach(c => {
      result[c.key] = null;
    });
    if (initial) {
      result = {
        ...result,
        ...initial
      };
    }
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
