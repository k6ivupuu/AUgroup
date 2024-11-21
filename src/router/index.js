import {createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import SignUp from "@/views/SignUp.vue";
import AddPost from "@/views/AddPost.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/login",
        name: "Sign Up",
        component: SignUp
    },
    {
        path: "/addPost",
        name: "Add Post",
        component: AddPost
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router