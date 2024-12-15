import {createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import SignUp from "@/views/SignUp.vue";
import AddPost from "@/views/AddPost.vue";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import PostDetails from "@/views/PostDetails.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/signup",
        name: "Sign Up",
        component: SignUp
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/About",
        name: "About",
        component: About
    },
    {
        path: "/addPost",
        name: "Add Post",
        component: AddPost
    },
    {//Adds a post to our postgres table through backend
        path: "/api/addpost",
        name: "AddPost",
        component: AddPost,
    },
    { //route to postdetails
        path: "/post/:id",
        name: "PostDetails",
        component: PostDetails,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router