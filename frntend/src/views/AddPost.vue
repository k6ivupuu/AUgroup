<template>
  <div class="addpost-page">
    <div class="content">
      <div class="flex-container">
        <div class="column"></div>
        <div class="addpost-box">
          <h2>Add a Post</h2>
          <p v-if="authResult">
            Fill out the form below to add a new post.
          </p>
          <p v-else>
            Please log in to add a post.
          </p>
          <div v-if="authResult" class="form">
            <label for="title">Title</label>
            <input
              name="title"
              type="text"
              id="title"
              required
              v-model="post.title"
              class="input-field"
              placeholder="Post Title"
            />
            
            <label for="body">Body</label>
            <input
              name="body"
              type="text"
              id="body"
              required
              v-model="post.body"
              class="input-field"
              placeholder="Post Body"
            />

            <label for="urllink">URL</label>
            <input
              name="urllink"
              type="text"
              id="urllink"
              required
              v-model="post.urllink"
              class="input-field"
              placeholder="https://example.com"
            />

            <button @click="addPost" id="addpost-button">Add Post</button>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/auth";
import { ref, onMounted } from "vue";

export default {
  name: "AddPost",
  data() {
    return {
      post: {
        title: "",
        body: "",
        urllink: ""
      }
    }
  },
  setup() {
    const authResult = ref(false);

    const checkAuth = async () => {
      authResult.value = await auth.authenticated();
    };

    onMounted(() => {
      checkAuth();
    });

    return {
      authResult
    };
  },
  methods: {
    addPost() {
      const data = {
        title: this.post.title,
        body: this.post.body,
        urllink: this.post.urllink,
      };
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>

<style scoped>
.addpost-page {
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

.column {
  flex: 1;
  padding: 10px;
  width: 90%;
}

.addpost-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--complement);
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 350px;
  max-width: 90%;
  text-align: center;
}

.addpost-box h2 {
  margin-bottom: 10px;
}

.addpost-box p {
  margin-bottom: 20px;
}

.form {
  width: 100%;
  text-align: left;
}

label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 15px 0 5px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.input-field {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--main-darker);
  border-radius: 5px;
  margin-bottom: 10px;
}

#addpost-button {
  background: var(--main-dark);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-align: center;
  width: 100%;
}

#addpost-button:hover {
  background-color: var(--main-light);
}
</style>
