import { createStore } from 'vuex'
import postsData from '@/assets/data/posts.json'

export default createStore({
    state: {
        posts: []
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        }
    },
    actions: {
        loadPosts({commit}) {
            commit("setPosts", postsData.Posts)
        }
    },
    getters: {}
})