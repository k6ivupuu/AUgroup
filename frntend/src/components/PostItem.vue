<template>
  <div class="postItem" @click="handleClick">
    <div class="post-header">
      <span class="post-icon">👤</span>
      <span class="post-user"> {{"User" }} </span>
      <span class="post-date">{{ formatDate(post.date) }}</span>
    </div>
    <h3 class="post-title"> {{ post.title }} </h3>
    <div class="post-body">
      <p>{{ post.body }}</p>
      <a v-if="post.urllink" :href="post.urllink" target="_blank" rel="noopener noreferrer" class="post-link">
        {{ post.urllink }}
      </a>
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
    const formatDate = (date) => {
      if (!date) return "Unknown date";
      return new Date(date).toLocaleString();
    };

    return {
      getLikes,
      likeHandler,
      handleClick,
      formatDate,
    }

  }
}
</script>

<style scoped>
.postItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 15px;
  border-bottom: 1px solid var(--main-darker);
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.postItem:hover {
  background-color: #f9f9f9;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  gap: 10px; 
  margin-bottom: 10px;
}

.post-icon {
  font-size: 24px;
}

.post-user {
  font-size: 1em;
  font-weight: bold;
  color: #555;
}

.post-title {
  text-align: center; 
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.post-body {
  margin-top: 5px;
  font-size: 1em;
  color: #666;
}
.post-date {
  font-size: 0.9em;
  color: darkblue;
  margin-left: auto;
}

.post-body p {
  margin: 0;
}

.post-link {
  color: #007bff;
  text-decoration: underline;
  font-size: 0.9em;
}

.post-link:hover {
  color: #0056b3;
}
</style>