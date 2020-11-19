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
            path: "/:userId/Posts",
            alias: "/postList",
            name: "Posts",
            component: () => import("../components/PostList")
        },
        {
            path: "/Create",
            name: "Create",
            component: () => import("../components/PostAdd"),
            props: true
        },
        {
            path: "/:userId/Post/:id",
            name: "postDetails",
            component: () => import("../components/Post")
        }
    ],
    // Positionnement dans la page au chargement :
    //     - savedPosition si on arrive par back / forward
    //     - to.hash si on a une ancre
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if (!to.hash) {
            return { x: 0, y: 0 }
        } else {
            return {selector: to.hash}
        }
    }
});

export default router
