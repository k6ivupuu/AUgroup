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
        clearAllPosts({commit}) {
            commit('clearPosts');
        }
    },
    modules: {
    }
})
