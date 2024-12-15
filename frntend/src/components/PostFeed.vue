<template>
  <div class="postfeed">
    <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @clickPost="handlePostClick"
    />
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import { useRouter } from "vue-router";
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostFeed",
  components: {
    PostItem
  },
  setup() {
    const store = useStore()
    const router = useRouter();

    const posts = computed(() => {
      //console.log("am I getting posts?")
      //console.log(store.state.posts)
      return store.state.posts
    })

     // Define the handlePostClick method inside the setup function
     const handlePostClick = (postId) => {
      console.log("Post clicked with ID:", postId);
      // Navigate to the "A Post" page
      router.push({ name: "PostDetails", params: { id: postId } });
    };

    return {
      posts,
      handlePostClick

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