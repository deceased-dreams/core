<script>
  import FrontBase from './base.svelte';
  let username = '';
  let password = '';
</script>

<FrontBase>
  <div class="w-1/4 p-4 border border-gray-200 rounded text-gray-700 bg-white" style="background: white;">
    <div class="text-2xl font-semibold text-center mb-4">Login</div>
    <div class="mb-4 flex flex-col">
      <label class="mb-2">Username</label>
      <input bind:value={username} 
        type="text" 
        placeholder="username" class="border rounded border-gray-300 px-2" />
    </div>
    <div class="mb-4 flex flex-col">
      <label class="mb-2">Password</label>
      <input 
        bind:value={password}
        type="password" placeholder="password" class="border rounded border-gray-300 px-2" />
    </div>
    <div class="flex flex-col">
      <button class="appearance-none p-2 bg-indigo-600 text-white font-medium">Masuk</button>
    </div>
  </div>
</FrontBase>
