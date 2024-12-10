<!-- App.vue -->

<template>
  <div id="app">
    <MainHeader/>
    <router-view/>
    <MainFooter/>
  </div>
</template>

<script>
import MainHeader from "@/components/Header.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    MainFooter,
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: var(--main-dark);
}
</style>