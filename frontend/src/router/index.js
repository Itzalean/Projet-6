import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

const router = new vueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("../components/Login")
        },
        {
            path: "/signup",
            name: "signup",
            component: () => import("../components/Signup")
        },
        {
            path: "/Posts",
            alias: "/postList",
            name: "Posts",
            component: () => import("../components/PostList")
        },
        {
            path: "/post/:id",
            name: "postDetails",
            component: () => import("../components/Post")
        },
        {
            path: "/postAdd",
            alias: "/more",
            name: "add",
            component: () => import("../components/PostAdd")
        }
    ]
});

export default router
