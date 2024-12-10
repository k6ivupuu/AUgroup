<template>
  <div class="home-page">
    <div class="content">
      <div class="flex-container">
        <post-feed/>
        <p>
          Text
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import PostFeed from "@/components/PostFeed.vue"
import {onMounted} from "vue";
import {useStore} from "vuex";

export default {
  name: "HomePage",
  components: {
    PostFeed
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('loadPosts')
    })

    return {
      store
    }

  },
  methods: {}
}
</script>

<style scoped>

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.content {
  display: flex;
  flex: 1;
}

.flex-container {
  display: flex;
  flex-direction: row;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  align-items: center;
}

</style>