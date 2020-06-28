<script type="text/javascript">
  import logo from 'dinastry/icons/hexagon.svg';
</script>

<div class="landing w-screen h-screen p-0 w-0 flex flex-col">
  <nav class="h-16 bg-white flex items-center border-b border-gray-300 px-12">
    <div class="flex-grow flex items-center">
      <img src={logo} width="48" height="48" />
      <span class="font-semibold text-gray-800 ml-2 text-xl">Dinastry</span>
    </div>
    <div class="flex items-center justify-end">
      <a href="#/about" class="p-4 text-gray-600 font-semibold">About</a>
      <a href="#/auth" class="p-4 text-gray-600 font-semibold">Login</a>
    </div>
  </nav>
  <section class="hero flex-grow flex flex-col items-center justify-center">
    <slot></slot>
  </section>
  <footer class="h-16 bg-white border-t border-gray-300"></footer>
</div>
