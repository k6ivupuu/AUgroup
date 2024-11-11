<!-- App.vue -->

<template>
  <div id="app">
    <MainHeader />  <!-- Add the header here -->
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from "@/components/Header.vue";

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-dark);
  //margin-top: 60px;
}
</style>
