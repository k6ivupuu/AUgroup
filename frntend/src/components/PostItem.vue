<template>
  <div class="postItem" @click="handleClick">
    <div class="post-header">
      <span style="font-size: 24px;">👤</span>
      <span> {{post.title}} </span>
      <span> {{post.body}} </span>
      <span> {{post.urllink}} </span>
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
  setup(props, { emit }) {
    const store = useStore()

    const getLikes = computed(() => {
      return store.state.likes[props.post.id] || 0
    })

    const likeHandler = () => {
      store.commit('likeCounter', props.post.id)
    }

    const handleClick = () => { 
      console.log("Post clicked:", props.post.id); 
      emit("clickPost", props.post.id); //$emit to notify the parent
    };

    return {
      getLikes,
      likeHandler,
      handleClick,
    }

  }
}
</script>

<style scoped>

.postItem:hover {
  background-color: #f9f9f9; 
}

.postItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--main-darker);
  cursor: pointer;
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