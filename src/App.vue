<template>
  <div class="container main">
    <router-view></router-view>
    <footer class="footer">
      <hr>
      <p>&copy;copyright 2019 </p>
      <p>made with <i class="red">&hearts;</i> by <a href="http://twitter.com/kweku_kilu">@kweku_kilu</a></p>
    </footer>
  </div>
</template>

<style scoped>
.main {
  margin-top: 2rem;
}
.footer {
  margin-top: 1rem;
  text-align: center;
}
</style>