import fetchService from "../services/fetch";

export const posts = {
    namespaced: true,
    state: {
        status: ""
    },
    getters: {},
    actions: {
        //////////////////////////
        //   Partie des posts   //
        //////////////////////////
        getAllPosts({ commit }, id) {
            return new Promise((resolve, reject) => {
                fetchService("posts/" + id + "/", "GET")
                    .then(data => {
                        commit('POSTS_SUCCESS')
                        resolve(data)
                    })
            })
        },
        getPost({ commit }, params) {
            return new Promise((resolve, reject) => {
                fetchService("posts/" + params.userId + "/post/" + params.id)
                    .then(data => {
                        commit('POSTS_SUCCESS')
                        resolve(data)
                    })
            })
        },
        createPost({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('POSTS_REQUEST')
                  
                fetchService("posts", "POST", params)
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value)
                    })
                    .catch(err => {reject(err)})
            })
        },
        updatePost({ commit }, params) {
            return new Promise((resolve, reject) => {
                commit('POSTS_REQUEST')
                  
                fetchService("posts/" + params[0], "PUT", params[1])
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value)
                    })
                    .catch(err => {reject(err)})
            })
        },
        deletePost({ commit }, id) {
            return new Promise((resolve, reject) => {
                fetchService("posts/" + id, "DELETE")
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value)
                    })
            })
        },
        /////////////////////////////////
        //   Partie des commentaires   //
        /////////////////////////////////
        addComment({ commit }, params) {
            return new Promise((resolve, reject) => {
                fetchService("comments", "POST", params)
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value[0])
                    })
            })
        },
        updateComment({ commit }, params) {
            return new Promise((resolve, reject) => {
                fetchService("comments/" + params.postId, "PUT", params)
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value[0])
                    })
            })
        },
        //////////////////////////
        //   Partie des votes   //
        //////////////////////////
        vote({ commit }, params) {
            return new Promise((resolve, reject) => {
                fetchService("votes", "POST", params)
                    .then(value => {
                        commit("POSTS_SUCCESS")
                        resolve()
                    })
            })
        }
    },
    mutations: {
        POSTS_REQUEST(state) {
            state.status = "loading";
        },
        POSTS_SUCCESS(state, data) {
            state.status = "success";
        }
    }
}
