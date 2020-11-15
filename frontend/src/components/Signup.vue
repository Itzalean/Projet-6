<template>
<b-modal id="signupModal" ref="signupModal" centered :hide-footer=true no-close-on-backdrop>
    <div slot="modal-header">
        <div class="modalTitle">Inscription</div>
        <span class="modalMsg"> {{errMsg}} </span>
    </div>
    <b-form no-validate>

        <!-- Champ de saisie du nom -->
        <b-form-group id="nameGroup" label="Nom / pseudo :" label-for="name">
             <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="person-fill" variant="primary"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="name" v-model="form.name" :state="userCheck" required autofocus placeholder="Saisissez votre nom"></b-form-input>
                <b-form-invalid-feedback :state="userCheck"> {{ userMsg }} </b-form-invalid-feedback>
             </b-input-group>
       </b-form-group>

        <!-- Champ de saisie de l'email -->
        <b-form-group id="emailGroup" label="Adresse email :" label-for="email">
             <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="envelope-fill" variant="primary"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="email" v-model="form.email" type="email" required placeholder="Saisissez votre adresse email" :state="emailCheck"></b-form-input>
                <b-form-invalid-feedback :state="emailCheck"> {{ emailMsg }} </b-form-invalid-feedback>
             </b-input-group>
        </b-form-group>

        <!-- Champ de saisie du mot de passe -->
        <b-form-group id="passwordGroup" label="Mot de passe :" label-for="password">
             <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="key" variant="dark"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="password" v-model="form.password" type="password" required :state="pwdCheck"></b-form-input>
                <b-form-invalid-feedback :state="pwdCheck"> {{ pwdMsg }} </b-form-invalid-feedback>
             </b-input-group>
        </b-form-group>

        <!-- Confirmation du mot de passe, doit être identique au mot de passe -->
        <b-form-group id="confirmGroup" label="Confirmez le mot de passe :" label-for="confirmPwd">
             <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="key" variant="danger"></b-icon>
                </b-input-group-prepend>
                <b-form-input id="confirmPwd" v-model="form.confirmPwd" type="password" :state="pwdCheck" required></b-form-input>
                <b-form-invalid-feedback :state="pwdCheck"> {{ confirmMsg }} </b-form-invalid-feedback>
             </b-input-group>
        </b-form-group>

        <b-button-group>
            <b-button type="button" variant="primary" :disabled="!(userCheck && emailCheck && pwdCheck)" @click="signupUser()">Valider</b-button>
            <b-button type="button" class="ml-4" variant="secondary" to="/">Annuler</b-button>
        </b-button-group>
    </b-form>
</b-modal>
</template>

<script>
export default {
    name: "signupModal",
    computed: {
        userCheck() {
            this.userMsg = "Nom d'utilisateur obligatoire."
            return this.form.name.length !== 0
        },
        emailCheck() {
            this.emailMsg = null;
            if (!this.form.email) {
                this.emailMsg = "Adresse e-mail obligatoire."
            } else {
                if (!this.validateEmail(this.form.email)) {
                    this.emailMsg = "Adresse e-mail non valide."
                }
            }
            return this.emailMsg === null
        },
        pwdCheck() {
            this.confirmMsg = this.pwdMsg = null;
            if (!this.form.password) {
                this.pwdMsg = "Mot de passe obligatoire."
            } else {
                if (this.form.password !== this.form.confirmPwd) {
                    this.confirmMsg = "Les mots de passe doivent être identiques."
                    this.pwdMsg = this.confirmMsg
                }
            }
            return this.pwdMsg === null ? true : false
        }
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: ""
            },
        errMsg: null
        }
    },
    methods: {
        signupUser: function() {
            this.$store.dispatch("auth/signupUser", this.form)
                .then((data) => {})
                .catch((err) => {this.errMsg = err.message})

        },
        validateEmail: function(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        showModal() {
            this.$refs['signupModal'].show()
        },
        hideModal() {
            this.$refs['signupModal'].hide()
        }
    },
    created() {
        let unsubscribeMe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'auth/AUTH_SUCCESS') {
                unsubscribeMe()
                this.$router.push({ path: '/postList'})
                // .then()
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
    width: 100%
}
.modalTitle {
    font-size: 1.5rem;
}
.modalMsg {
    color: red;
    font-weight: bold;
}
</style>
