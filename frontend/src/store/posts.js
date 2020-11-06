import fetchService from "../services/fetch";

export const posts = {
    namespaced: true,
    state: {},
    getters: {},
    actions: {
        getAllPosts({ commit }) {
            return new Promise((resolve, reject) => {
                fetchService("posts")
                    .then(data => {
                    commit('POSTS_SUCCESS')
                    resolve(data)
                })
            })
        },
        getPost({commit}, id) {
            return new Promise((resolve, reject) => {
                fetchService("posts/" + id)
                    .then(data => {
                        commit('POSTS_SUCCESS')
                        resolve(data)
                    })
            })
        },
        createPost({commit}, params) {
            return new Promise((resolve, reject) => {
                fetchService("posts", "POST", params)
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value)
                    })
            })
        },
        deletePost({commit}, id) {
            return new Promise((resolve, reject) => {
                console.log(id)

                fetchService("posts/" + id, "DELETE")
                    .then(value => {
                        commit('POSTS_SUCCESS')
                        resolve(value)
                    })
            })
        }
    },
    mutations: {
        POSTS_SUCCESS(state, data) {
        }
    }
}
