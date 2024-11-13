<!-- src/views/HomePage.vue -->

<template>
  <div class="home-page">
    <h1>AU Group Vue project home page. Ta-daaa!</h1>
    <div class="content">
      <p>This is content placeholder</p>
      <div>
        <postfeed-post postFeedComment="This is postFeedPosts message 1"/>
        <postfeed-post postFeedComment="This is postFeedPosts message 2"/>
        <postfeed-post postFeedComment="This is postFeedPosts message 3"/>
        <postfeed-post postFeedComment="This is postFeedPosts message 4"/>
      </div>
    </div>
  </div>
</template>

<script>
import PostfeedPost from "@/components/post.vue";

export default {
  name: "HomePage",
  components: {PostfeedPost},
  data() {
    return {
      message: "Hello World!"
    }
  },
  methods: {
    handleClick() {
      console.log("Button Click")
    }
  }
}
</script>

<style scoped>

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  //padding: 10px;
}

.content {
  display: flex;
  flex: 1;
}

</style>