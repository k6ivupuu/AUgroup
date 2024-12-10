<!-- src/views/HomePage.vue -->

<template>
  <div>
    <h1>Adding a post functionality on this page</h1>
    <div class="content">
      <p>This is content placeholder</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  components: {},
  data() {
    return {
      message: "Hello World!"
    }
  },
  methods: {}
}
</script>

<style scoped>

.content {
  display: flex;
  flex: 1;
}

</style>