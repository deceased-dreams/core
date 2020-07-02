<script type="text/javascript">
  import logo from 'dinastry/icons/hexagon.svg';
</script>

<div class="landing w-screen h-screen p-0 w-0 flex flex-col">
  <nav class="h-16 bg-blue-900 text-white flex items-center px-12">
    <div class="flex-grow flex items-center">
      <img src={logo} width="48" height="48" />
      <span class="font-semibold ml-2 text-xl">Dinastry</span>
    </div>
    <div class="flex items-center justify-end">
      <a href="#/about" class="p-4 font-semibold">About</a>
      <a href="#/auth" class="p-4 font-semibold">Login</a>
    </div>
  </nav>
  <section class="hero flex-grow flex flex-col items-center justify-center">
    <slot></slot>
  </section>
  <footer class="h-16 bg-blue-900"></footer>
</div>
