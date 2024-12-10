<template>
  <div class="postfeed">
    <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
    />
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostFeed",
  components: {
    PostItem
  },
  setup() {
    const store = useStore()

    const posts = computed(() => {
      return store.state.posts
    })

    return {
      posts
    }
  }
}
</script>

<style scoped>

.postfeed {
  flex: 3;
  padding: 10px;
  align-items: center;
  border: 1px solid #ccc;
  width: 90%;
}

</style>