<template>
  <div class="home-page">
    <div class="content">
      <div class="flex-container">
        <div class="column"></div>
        <div class="main-column">
          <button v-if="authResult" @click="Logout" id="logout-button" class="logout-button">Logout</button>
          <div class="posts-container">
            <post-feed v-if="authResult" />
            <div v-else>
              <h2>Please log in to see posts</h2>
            </div>
          </div>
          <div class="footer">
            <button v-if="authResult" @click="navigateToAddPost" id="add-button">Add Post</button>
            <button v-if="authResult" @click="deleteAllPosts" id="delete-button">Delete All</button>
          </div>
        </div>
        <div class="column"></div>
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
            this.$router.push("/login");
            //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    },
    deleteAllPosts() {
      console.log("Delete All button clicked"); // Debugging log
      this.$store.dispatch("clearAllPosts");
    },
    navigateToAddPost() {
      this.$router.push("/addpost");
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
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  flex: 1;
}

.flex-container {
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
}

.column {
  flex: 1;
}

.main-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 20px;
  width: 70%; /* Wider central column */
  max-width: 900px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.logout-button {
  margin-bottom: 20px;
  background: var(--main-dark);
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.logout-button:hover {
  background-color: #0056b3;
}

.posts-container {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

#add-button,
#delete-button {
  background: var(--main-dark);
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

#add-button:hover {
  background-color: #218838;
}

#delete-button:hover {
  background-color: #dc3545;
}
</style>