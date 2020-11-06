import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

const router = new vueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
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
            component: () => import("../components/PostAdd"),
//            meta: {requiresAuth: true}
            // beforeEnter: requireAuth
        },
    ]
});

// router.beforeEach((to, from, next) => {
//     console.log(store.getters["auth/isAuthenticated"], ' - ', store.state.modalVisible);
//     if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['auth/isAuthenticated']) {
//         console.log('coucouRouter');
//         store.dispatch('auth/showModal');
//         // console.log(store.getters['auth/isAuthenticated']);
//         if (store.getters["auth/isAuthenticated"]) {
//             next()
//             return
//         } else {
// //            $root.$bvModal.show('loginModal')
//         }
//         next()
//     } else {
//         next()
//     }
// })
export default router
