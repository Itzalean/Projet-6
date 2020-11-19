// ./components/PostAdd.vue
<template>
<b-modal id="postAddModal" ref="postAddModal" :title="msgTitle" centered :hide-footer=true size=xl @hide="rewind">

    <section class="container col-8 my-5 py-3">
        <b-form @submit.prevent="createPost">
            <b-tabs v-model="tabIndex" content-class="mt-3" pills fill card>

                <!-- Titre commun à tous les onglets -->
                <b-form-input class="my-2" id="title" v-model="wTitle" required autofocus placeholder="Titre du post"></b-form-input>

                <!-- Onglet des posts -->
                <b-tab title="Post" active lazy 
                        :disabled="!this.isCreate && this.enabledTab != 'POST'">
                    <b-form-textarea id="content" v-model="wContent" rows="6" required placeholder="Saisissez votre texte" />
                </b-tab>

                <!-- Onglet des images -->
                <b-tab title="Image" lazy 
                        :disabled="!this.isCreate && this.enabledTab !=='IMAGE'">
                    <b-form-file id="picture" accept="image/*" v-model="wPicture" size="lg"  drop-placeholder="Glissez/déposez une image ou choisissez une image" browse-text="Parcourir..." @change="imageChange" />
                    <b-row class="justify-content-md-center">
                        <b-img v-if="this.imageSrc":src="this.imageSrc" class="col-5 my-4" />
                        <b-img v-else :src="this.parmPostId.Content" class="col-5 my-4" />
                    </b-row>
                </b-tab>

                <!-- Onglet des liens -->
                <b-tab title="Link" lazy :disabled="!this.isCreate && this.enabledTab != 'LINK'">
                    <b-form-input class="my-2" id="link" v-model="wLink" type="url" required placeholder="Url" />
                </b-tab>
            </b-tabs>

            <div class="my-2">
                <b-button type="submit" variant="primary" class="mx-4">Poster</b-button>
                <b-button type="reset" variant="danger" @click="reset">Reset</b-button>
            </div>
        </b-form>
    </section>
</b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'PostAdd',
    data() {
        return {
            form: {},
            data: {},
            tabIndex: 0,
            file: "",
            imageSrc: null
        }
    },
    computed: {
        parmPostId() {
            return this.$route.params.parmPostId ? this.$route.params.parmPostId : null},
        ...mapGetters(['auth/hasId']),
        isCreate() {return this.parmPostId.id === void 0},
        msgTitle() {
            if (this.parmPostId.id) {
                return "Modification d'un post"
            } else {
                return "Création d'un nouveau post"
            }
        },
        enabledTab() {
            // Si on est en modification, enabledTab = POST pour un post, IMAGE pour une image, sinon, LINK (pour un lien). Seul l'onglet correspondant est actif
            return this.parmPostId.id === void 0 ? null :
                this.parmPostId.Type === 0 ? "POST" :
                this.parmPostId.Type === 1 ? "IMAGE" :
                "LINK"
        },
        wTitle: {
            get: function() {return this.parmPostId.Title || ""},
            set: function(value) {this.form.title = value}
        },
        wContent: {
            get: function() {return this.parmPostId.Type === 0 ? this.parmPostId.Content : ""},
            set: function(value) {this.form.content = value}
        },
        wLink: {
            get: function() {return this.parmPostId.Type === 2 ? this.parmPostId.Content : ""},
            set: function(value) {this.form.link = value}
        },
        wPicture: {
            get: function() {return null},
            set: function(value) {this.form.picture = [value]}
        }
    },
    methods: {
        createPost() {
            const params = {
                userId: this.$store.state.auth.id,
                Title: this.form.title || this.parmPostId.Title,
                Type: this.tabIndex,
                Content: this.tabIndex === 2 ? this.form.link || this.parmPostId.Content: this.tabIndex === 1 ? this.form.picture.name || this.parmPostId.Content : this.form.content || this.parmPostId.Content
            }

            // On envoie l'id du post à part en cas de modification
            this.isCreate ? null : params.postId = this.parmPostId.id;

            if (params.Type === 1 ) {
                // Cas des images: on crée un FormData pour pouvoir envoyer les paramètres et les données brutes en même temps. Multer fera le tri côté serveur
                const formData = new FormData();
                formData.append('post', JSON.stringify(params));
                formData.append('image', this.file );

                this.isCreate ?
                    this.$store.dispatch("posts/createPost", formData)
                        .then(value => {this.$router.replace({ path: "/" + this.hasId + "/post/" + value.id })})
                    :
                    this.$store.dispatch("posts/updatePost", [this.parmPostId.id, formData])
                        .then(value => {this.$router.replace({ path: "/" + this.hasId + "/post/" + value.id })
                        })
            } else {
                this.isCreate ?
                    this.$store.dispatch("posts/createPost", params)
                        .then(value => {this.$router.replace({ path: "/" + this.hasId + "/post/" + value.id })})
                    :
                    this.$store.dispatch("posts/updatePost", [this.parmPostId.id, params])
                        .then(value => {this.$router.replace({ path: "/" + this.hasId + "/post/" + value.id })})
            }
            this.$bvModal.hide('postAddModal')
        },
        imageChange(e) {
            if (e) {
            this.file = e.target.files[0];
            this.imageSrc = URL.createObjectURL(this.file);}
        },
        reset() {
            console.log(this.hasId)
            this.imageSrc = null;
        },
        rewind() {
            this.$router.go(-1)
        },
        showModal() {
            this.$refs['postAddModal'].show()
        }
    },
    mounted() {
      this.showModal();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
