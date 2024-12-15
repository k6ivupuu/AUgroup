import { createStore } from 'vuex';
import auth from "@/auth";

//We need a functionality here to check for authentication before loading posts,
//    although it is currently checking on homepage against authentication.

export default createStore({
    state: {
        posts: [],
        likes: {}
    },
    getters: {
        getAllPosts: (state) => state.posts
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        clearPosts(state) {
          state.posts = []
        },
        likeCounter(state, postId) {
            if (!state.likes[postId]) {
                state.likes[postId] = 0
            }
            state.likes[postId]++
        }
    },
    actions: {
        loadPosts({commit}) {
            if (!auth.authenticated()) {
                commit('clearPosts');
                return;
            }
            fetch(`http://localhost:3000/api/posts/`, {
                credentials: "include"
            })
                .then((response) => response.json())
                .then(data => {
                    commit('setPosts', data)
                })
                .catch((err) => {
                    console.log(err.message);
                    commit('clearPosts')
                });
        },
        clearAllPosts({ commit }) {
            console.log("clearAllPosts action dispatched"); // Debug
    
            fetch(`http://localhost:3000/api/posts`, {
                method: 'DELETE',
                credentials: "include" 
            })
            .then(async (response) => {
                console.log("Response from DELETE request:", response.status); // Log the response status
    
                if (response.ok) {
                    commit('clearPosts'); // Clear Vuex state
                    console.log("All posts cleared from the database and Vuex state");
                } else {
                    const errorMessage = await response.text();
                    console.error("Failed to delete posts, response text:", errorMessage);
                }
            })
            .catch(err => {
                console.error("Failed to send DELETE request:", err.message); // Catch errors
            });
        },
    },

    modules: {
    }
})
