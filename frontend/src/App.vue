<template>
<div id="app">
    <header class="b-container fluid row fixed-top">
        <b-navbar toggleable="lg" type="info" variant="dark" class="col">
            <!-- Logo Groupomania -->
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
                    <b-button-group>
                        <b-button class="ml-3" @click="showPostAdd">Nouveau post</b-button>
                        <postAddModal :parmPostId="wPostId" />
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
import postAddModal from "./components/PostAdd"
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            wPostId: ""
        }
    },
    components: {
        postAddModal
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("auth/logoutUser")
            this.$router.push({ path: '/' })
        },
        showPostAdd(parm) {
            this.wPostId = parm
            this.$bvModal.show('postAddModal')
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
