<template>
    <div class="post-details-page">
      <div class="content">
        <div class="flex-container">
          <div class="column"></div>
          <div class="post-box">
            <h2 v-if="post">{{ post.title }}</h2>
            <h2 v-else>Loading...</h2>  
            <div class="form-group" v-if="post">
              <label for="body">Body:</label>
              <textarea
                id="body"
                v-model="post.body"
                placeholder="Edit body here"
                class="input-field"
              ></textarea>
            </div>
            <div v-else>
              <p>Loading post details...</p>
            </div>
            <div class="actions" v-if="post">
              <button class="update-button" @click="updatePost">Update</button>
              <button class="delete-button" @click="deletePost">Delete</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostDetails",
    props: {
      id: {
        type: String,
        required: true, // The post ID will be passed as a route param
      },
    },
    data() {
      return {
        post: null, 
      };
    },
    methods: {
      async fetchPost() {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.id}`, {
            credentials: "include",
          });
          if (response.ok) {
            this.post = await response.json(); // Fetch and store the post details
          } else {
            console.error("Failed to fetch post:", response.statusText);
          }
        } catch (err) {
          console.error("Error fetching post:", err.message);
        }
      },
      async updatePost() {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(this.post), // Send updated post data
          });
          if (response.ok) {
            alert("Post updated successfully!");
            this.$router.push("/"); // Redirect back to post feed after update
          } else {
            console.error("Failed to update post:", response.statusText);
          }
        } catch (err) {
          console.error("Error updating post:", err.message);
        }
      },
      async deletePost() {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;
  
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.id}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (response.ok) {
            alert("Post deleted successfully");
            this.$router.push("/"); // Redirect to the homepage after deletion
          } else {
            console.error("Failed to delete post:", response.statusText);
          }
        } catch (err) {
          console.error("Error deleting post:", err.message);
        }
      },
    },
    mounted() {
      this.fetchPost(); // Fetch the post details when the component is mounted
    },
  };
  </script>
  
  <style scoped>
  /* Page structure */
  .post-details-page {
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
  
  
  .post-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--complement);
    border-radius: 10px;
    padding: 40px 30px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;
    text-align: center;
  }
  
  /* Input field for the body */
  .input-field {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
    border: 1px solid var(--main-darker);
    border-radius: 5px;
    box-sizing: border-box;
    resize: none;
  }
  
  /* Buttons styling */
  .actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .update-button,
  .delete-button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 45%;
    text-align: center;
  }
  
  .update-button {
    background-color: var(--main-dark);
    color: white;
  }
  
  .delete-button {
    background-color: var(--red-dark);
    color: white;
  }
  
  .update-button:hover {
    background-color: var(--main-light);
  }
  
  .delete-button:hover {
    background-color: var(--red-light);
  }
  </style>
  