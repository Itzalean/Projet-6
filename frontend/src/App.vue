<template>
<div id="app" style="min-height:100vh">
    <header class="b-container fluid row sticky-top mb-2">
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
                    <b-button :to="{path: '/' + this.$store.state.auth.id + '/Posts'}" variant="outline-light" >Accueil</b-button>
                    <b-button-group>
                        <b-button class="ml-3" @click="showPostAdd">Nouveau post</b-button>
                        <b-button id="userBtn" @click="logoutUser()" class="mx-3">{{this.$store.state.auth.name}} 
                            <b-icon icon="door-open" variant="white"></b-icon>
                        </b-button>
                    </b-button-group>
                </b-navbar-nav>
            </b-collapse>

        </b-navbar>
    </header>

    <main class="b-container border-black">
        <router-view></router-view>
    </main>

    <footer class="b-container fluid row mt-2 border">
        <img src="./assets/icon-above-font.svg" class="col-md-6" alt="Logo Groupomania" title="Logo Groupomania">
    </footer>
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
    methods: {
        logoutUser() {
            this.$store.dispatch("auth/logoutUser")
            this.$router.push({ path: '/' })
        },
        showPostAdd() {
            const parm = {userId: this.$store.state.auth.id}
            this.$router.push({ name: "Create", params: {parmPostId: parm}})
        },
    }
}

</script>

<style scoped lang="scss">
.b-icon {
    color: #ffd7d7; 
}
footer>img {
    height: 20vh;
}
#userBtn {
    border: 0;
    min-width: 5em;
    //line-height: 1.5;
    //padding: 0 20px;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border-radius: 10px;
    background-color: rgba(220, 0, 0, 1);
    background-image: linear-gradient(to top left,
                                      rgba(0, 0, 0, .2),
                                      rgba(0, 0, 0, .2) 30%,
                                      rgba(0, 0, 0, 0));
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                inset -2px -2px 3px rgba(0, 0, 0, .6);
    &:hover {
    background-color: rgba(255, 0, 0, 1);
    }
    &:active {
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                inset 2px 2px 3px rgba(0, 0, 0, .6);
    }
}

</style>
