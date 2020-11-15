import fetchService from "../services/fetch";

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
            return new Promise((resolve, reject) => {
                context.commit('AUTH_REQUEST')
                fetchService("auth/login", "POST", userData)
                    .then(data => {
                        context.commit('AUTH_SUCCESS', data);
                        resolve(data)
                    })
                    .catch(err => {
                        context.commit('AUTH_ERROR');
                        reject(err)
                    })
            })
        },
        logoutUser({ commit }) {
            return new Promise(resolve => {
                commit('AUTH_LOGOUT');
                resolve();
            });
        },
        signupUser(context, userData) {
            return new Promise((resolve, reject) => {
                context.commit('AUTH_REQUEST')
                fetchService("auth/signup", "POST", userData)
                    .then(data => {
                        context.commit('AUTH_SUCCESS', data.token);
                        resolve(data)
                    })
                    .catch(err => {
                        context.commit('AUTH_ERROR');
                        reject(err)
                    })
                })
            }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = "loading";
        },
        AUTH_SUCCESS(state, data) {
            state.status = "success";
            const userInfo = {
                id: data.Id,
                token: data.token,
                name: data.Name,
                rank: data.Rank
            }
            state.token = data.token;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            state.id = data.Id;
            state.name = data.Name;
            state.rank = data.Rank;
        },
        AUTH_ERROR(state) {
            localStorage.removeItem("userInfo");
            state.status = "error";
        },
        AUTH_LOGOUT(state) {
            localStorage.removeItem("userInfo");
        }
    },
    modules: {
    }
}
