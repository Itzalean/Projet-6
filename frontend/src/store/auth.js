// import Vue from "vue";
// import Vuex from "vuex";

import fetchService from "../services/fetch";

// Vue.use(Vuex);

export const auth = {
    namespaced: true,
    state: {
        id: "",
        token: localStorage.getItem("userToken") || null,
        rank: "USER",
        status: "",
        name: ""
    },
    getters: {
        hasId: state => state.id,
        hasRank: state => state.rank,
        isAuthenticated: state => !!state.token
    },
    actions: {
        loginUser(context, userData) {
            context.commit('AUTH_REQUEST')
            fetchService("auth/login", "POST", userData)
                .then(data => {
                    context.commit('AUTH_SUCCESS', data);
                })
                .catch(err => {
                    localStorage.removeItem("userToken");
                    context.commit('AUTH_ERROR');
                })
        },
        logoutUser({ commit }) {
            return new Promise(resolve => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem("userToken");
                resolve();
            });
        },
        signupUser(context, userData) {
            context.commit('AUTH_REQUEST')
            fetchService("auth/signup", "POST", userData)
                .then(data => {
                    context.commit('AUTH_SUCCESS', data.token);
                })
                .catch(err => {
                    localStorage.removeItem("userToken");
                    context.commit('AUTH_ERROR');
                })
        }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = "loading";
        },
        AUTH_SUCCESS(state, data) {
            state.status = "success";
            state.token = data.token;
            localStorage.setItem("userToken", state.token);
            state.id = data.Id;
            state.name = data.Name;
            state.rank = data.Rank;
        },
        AUTH_ERROR(state) {
            state.status = "error";
        },
        AUTH_LOGOUT(state) {
            localStorage.clear;
            location.reload();
        }
    },
    modules: {
    }
}
