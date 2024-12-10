import { createStore } from 'vuex'
import postsData from '@/assets/data/posts.json'

export default createStore({
    state: {
        posts: [],
        likes: {}
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
        },
        likesResetter(state) {
            state.likes = {}
        }
    },
    actions: {
        loadPosts({commit}) {
            commit("setPosts", postsData.Posts)
        }
    },
    getters: {}
})