<template>
  <div class="home-page">
    <div class="content">
      <div class="flex-container">
        <div>
          <button v-if = "authResult" @click="Logout" class="center">Logout</button>
        </div>
        <post-feed v-if="authResult"/>
        <div v-else>
          <p>Please log in to see posts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import auth from "../auth";
import PostFeed from "@/components/PostFeed.vue"
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "HomePage",
  components: {
    PostFeed
  },
  setup() {
    const store = useStore()
    const authResult = ref(false)

    const checkAuth = async () => {
      authResult.value = await auth.authenticated()
      if (authResult.value) {
        store.dispatch("loadPosts")
      } else {
        store.dispatch('clearAllPosts')
      }
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      store,
      authResult
    }

  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log('jwt removed');
            this.$store.dispatch('clearAllPosts');
            //console.log('jwt removed:' + auth.authenticated());
            this.$router.push("/login");
            //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    },
  }
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