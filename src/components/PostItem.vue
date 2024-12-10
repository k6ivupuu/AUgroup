<template>
  <div class="postItem">
    <div class="post-header">
      <span style="font-size: 24px;">👤</span>
      <span> {{post.date}} </span>
    </div>
    <h1>{{post.title}}</h1>
    <img
        v-if="post?.image"
        class="post-image"
        :src="require('@/assets/images/' + post.image.name)"
        :alt="post.image.name"
    >
    <p>{{post.content}}</p>
    <div>
      <button
          class="like-button"
          v-on:click="likeHandler"
      >
        👍 {{ getLikes }} Likes
      </button>
    </div>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {computed} from "vue";

  export default {
    name: "PostItem",
    props: {
      post: {
        type: Object,
        require: true,
        default: () => ({})
      }
    },
    setup(props) {
      const store = useStore()

      const getLikes = computed(() => {
        return store.state.likes[props.post.id] || 0
      })

      const likeHandler = () => {
        store.commit('likeCounter', props.post.id)
      }

      return {
        getLikes,
        likeHandler
      }

    }
  }
</script>

<style scoped>

.postItem {
  display: flex;
  flex-direction: column;
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