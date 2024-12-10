import { createStore } from 'vuex';

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
        likeCounter(state, postId) {
            if (!state.likes[postId]) {
                state.likes[postId] = 0
            }
            state.likes[postId]++
        }
    },
    actions: {
        loadPosts({commit}) {
            fetch(`http://localhost:3000/api/posts/`)
                .then((response) => response.json())
                .then(data => {
                    commit('setPosts', data)
                })
                .catch((err) => console.log(err.message));
        }
    },
    modules: {
    }
})
