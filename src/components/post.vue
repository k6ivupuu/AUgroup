<template>
  <div class="post-header">
    <p>POST PLACEHOLDER JUST TO UNDERSTAND THAT POST GETS LOADED</p>
    <p>{{postFeedComment}}</p>
  </div>
    <!--<span style="font-size: 24px;">👤</span>
    <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
  </div>
  <h1>${post.title}</h1>
  ${post.image ? `<img src="${post.image.src}" alt="${post.image.name}" class="post-image">` : ''}
  <p>${post.content}</p>
  <div>-->
  <div>
    <button class="like-button" v-on:click="count++" >👍 {{count}} Likes</button>
  </div>
</template>

<script>
  export default {
    name: "postfeed-post",
    props: {
      postFeedComment: String,
    },
    data: function() {
      return{
        count: 0
      }
    }
  }
</script>

<style scoped>

h1 {
  color: var(--main-dark);
  margin: 1rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

</style>