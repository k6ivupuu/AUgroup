<!-- src/views/HomePage.vue -->

<template>
  <div class="home-page">
    <div class="content">
      <div class="flex-container">
        <div class="column"></div>
        <post-feed/>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PostFeed from "@/components/PostFeed.vue"
import {useStore} from "vuex"
import {onMounted} from "vue";

export default {
  name: "HomePage",
  components: {
    PostFeed
  },
  setup: function () {
    const store = useStore()

    onMounted(() => {
      store.dispatch('loadPosts')
    })

    return {
      store
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

.flex-container {
  display: flex;
  flex-direction: row;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  align-items: center;
}

.column {
  flex: 1;
  padding: 10px;
  width: 90%;
}


</style>