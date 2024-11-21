<template>
  <div class="postItem">
    <div class="post-header">
      <span style="font-size: 24px;">👤</span>
      <span> {{post.date}} </span>
    </div>
    <h1>{{post.title}}</h1>
    <img class="post-image" v-if="post.image" :src="post.image.src" :alt="post.image.name">
    <p>{{post.content}}</p>
    <div>
      <button class="like-button" v-on:click="count++" >👍 {{count}} Likes</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostItem",
    props: {
      post: {
        type: Object,
        require: true,
        default: () => ({})  // Add a default empty object
      }
    },
    data: function() {
      return{
        count: 0
      }
    }
  }
</script>

<style scoped>

.postItem {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--main-darker);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.post-image {
  max-width: 100%;
  height: auto;
  width: auto;
}

.like-button {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

h1 {
  color: var(--main-dark);
  margin: 1rem;
}

</style>