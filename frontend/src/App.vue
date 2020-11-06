<template>
<div id="app">
    <header class="b-container fluid row fixed-top">
        <b-navbar toggleable="lg" type="info" variant="dark" class="col">
            <b-navbar-brand href="/"><img src="./assets/icon-left-font-monochrome-white.svg" class="col-md-6"></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse">
            <template #default="{ expanded }">
                <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                <b-icon v-else icon="chevron-bar-down"></b-icon>
            </template>
            </b-navbar-toggle>
             <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-button to="/postList" variant="outline-light" >Accueil</b-button>
                    <b-button-group v-if="!$store.getters['auth/isAuthenticated']">
                        <b-button class="ml-3" variant="light" v-b-modal.loginModal>Se connecter</b-button>
                        <loginModal />
                        <b-button class="mx-3" variant="outline-light" v-b-modal.signupModal>S'inscrire</b-button>
                        <signupModal />
                    </b-button-group>
                    <b-button-group v-else>
                        <b-button to="/postAdd" class="ml-3">Nouveau post</b-button>
                        <b-button @click="logoutUser()" variant="outline-danger" class="mx-3">Déconnexion</b-button>
                    </b-button-group>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>

    <main class="b-container border-black my-5 py-4">
        <router-view></router-view>
    </main>
</div>
</template>

<script>
import signupModal from "./components/Signup"
import loginModal from "./components/Login"
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            Modal: false}
    },
    components: {
        signupModal,
        loginModal
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("auth/logoutUser")
        },
    }
}

</script>

<style scoped lang="scss">
.b-icon {
    color: #ffd7d7; 
}
// .navbar {
//   background-color: #ffd7d7; 
// }
</style>
