<template>
<b-modal id="loginModal" ref="loginModal" centered :hide-footer=true no-close-on-backdrop>
    <div slot="modal-header">
        <div class="modalTitle">Connexion</div>
        <span class="modalMsg"> {{errMsg}} </span>
    </div>

    <b-form no-validate>
        <!-- Champ de saisie du profil -->
        <b-form-group id="nameGroup" label="Nom / pseudo :" label-for="name">
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="person-fill" variant="primary"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="name" :state="userCheck" v-model="form.name" required autofocus placeholder="Saisissez votre nom"></b-form-input>
                <b-form-invalid-feedback :state="userCheck"> {{ userMsg }} </b-form-invalid-feedback>
            </b-input-group>
        </b-form-group>

        <!-- Champ de saisie du mot de passe -->
        <b-form-group id="passwordGroup" label="Mot de passe :" label-for="password">
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="key" variant="danger"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="password" :state="pwdCheck" v-model="form.password" type="password" required></b-form-input>
                <b-form-invalid-feedback :state="pwdCheck"> {{ pwdMsg }} </b-form-invalid-feedback>
            </b-input-group>
        </b-form-group>

        <b-button-group>
            <b-button type="button" variant="primary" :disabled="!(userCheck && pwdCheck)" @click="loginUser()">Connexion</b-button>

            <b-button class="mx-3" variant="warning" to="signup">S'inscrire</b-button>
        </b-button-group>
    </b-form>
</b-modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: "loginModal",
    data() {
        return {
            form: {
                name: "",
                password: "",
            },
        errMsg: null
        }
    },
    computed: {
        ...mapGetters(['auth/isAuthenticated']),
        userCheck() {
            this.userMsg = "Nom d'utilisateur obligatoire"
            return this.form.name.length !== 0
        },
        pwdCheck() {
            this.pwdMsg = "Mot de passe obligatoire"
            return this.form.password.length !== 0
        },
    },
    methods: {
        showModal() {
            this.$refs['loginModal'].show()
        },
        hideModal() {
            this.$refs['loginModal'].hide()
        },
        loginUser: function() {
            const {name, password } = this.form

            this.$store.dispatch("auth/loginUser", {name, password })
                .catch((err) => {this.errMsg = err.message})
        },
        goToSignup: function() {
            this.$bvModal.hide('loginModal');
            this.$bvModal.show('signupModal');
        }
    },
    created() {
        let unsubscribeMe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'auth/AUTH_SUCCESS') {
                unsubscribeMe()
                console.log('path : ', "/" + this.$store.state.auth.id + '/Posts')
                this.$router.push({ path: "/" + this.$store.state.auth.id + '/Posts'})
            }
        })
    },
    mounted() {
      this.showModal();
    }
}

</script>

<style scoped lang="scss">
.btn-group {
    width: 100%;
}
.modalTitle {
    font-size: 1.5rem;
}
.modalMsg {
    color: red;
    font-weight: bold;
}
</style>
