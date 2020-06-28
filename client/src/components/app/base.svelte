<script type="text/javascript">
  import logo from 'dinastry/icons/hexagon.svg';
</script>

<div class="app flex flex-col" style="min-height: 100vh;">
  <nav class="h-16 bg-gray-900 text-white flex items-center px-12">
    <div class="flex-grow flex items-center">
      <img src={logo} width="48" height="48" />
      <span class="font-semibold text-gray-100 ml-2 text-xl">Dinastry</span>
    </div>
    <div class="flex items-center justify-end">
      <a href="#/app/data" class="pr-4 text-gray-100 font-semibold">data</a>
      <a href="#/app/klasifikasi" class="p-4 text-gray-100 font-semibold">klasifikasi</a>
      <a href="#/app/testing" class="p-4 text-gray-100 font-semibold">pengujian</a>
      <a href="#/app/logout" class="pl-4 text-gray-100 font-semibold">logout</a>
    </div>
  </nav>
  <section class="flex-grow flex flex-col">
    <slot></slot>
  </section>
  <footer class="h-16 bg-white border-t border-gray-300"></footer>
</div>
