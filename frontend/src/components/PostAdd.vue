// ./components/PostAdd.vue
<template>
<section class="container col-8 my-5 py-3">
    <b-form v-model="tabIndex" @submit.prevent="createPost">
        <b-tabs content-class="mt-3" pills fill card>

            <b-form-input class="my-2" id="title" v-model="post.title" required placeholder="Titre du post"></b-form-input>

            <b-tab title="Post" active lazy>
                <b-form-textarea id="content" v-model="post.content" rows="6" required placeholder="Saisissez votre texte"></b-form-textarea>
            </b-tab>

            <b-tab title="Image" lazy>
                <b-form-file id="image" accept="image/*" v-model="post.image" size="lg" required drop-placeholder="Glissez/déposez une image ou choisissez une image" browse-text="Parcourir..." @change="imageChange"></b-form-file>
                <b-row class="justify-content-md-center">
                    <b-img v-if="imageSrc" :src="imageSrc" class="col-5 my-4"></b-img>
                </b-row>
            </b-tab>

            <b-tab title="Link" lazy>
                <b-form-input class="my-2" id="link" v-model="post.link" type="url" required placeholder="Url"></b-form-input>
            </b-tab>
        </b-tabs>

        <div class="my-2">
            <b-button type="submit" variant="primary" >Poster</b-button>
            <b-button type="reset" variant="danger" @click="reset">Reset</b-button>
        </div>
    </b-form>
</section>
</template>

<script>
import fetchService from "../services/fetch";
import { mapState } from 'vuex'

export default {
    name: 'PostAdd',
    data() {
        return {
            post: {},
            data: {},
            imageSrc: null,
            tabIndex: 0
        }
    },
    computed: {
        ...mapState
    },
    methods: {
        createPost() {
            console.log('userId : ', this.$store.state.auth.id)
            const params = {
                Title: this.post.title,
                userId: this.$store.state.auth.id || 1,
                // Si id = "link" alors link/2 sinon si id = "image" alors image/1 sinon content/0
                Type: this.tabIndex.srcElement.id === "link" ? 2 : this.tabIndex.srcElement.id === "image" ? 1 : 0,
                Content: this.tabIndex.srcElement.id === "link" ? this.post.link : this.tabIndex.srcElement.id === "image" ? this.post.image : this.post.content
            }
            this.$store.dispatch("posts/createPost", params)
                .then(value => {console.log("value : ", this.router)
                    this.$router.push({ path: '/post/' + value.id })
                })

            // const request = new Promise((resolve, reject) => {
            //     const data = fetchService("posts", params, "POST");
            //         resolve(data);
            // });
            // request.then(value => {
            //     this.$router.push({ path: '/post/' + value.id });
            // })
        },
        imageChange(url) {
            const file = url.target.files[0];
            this.imageSrc = URL.createObjectURL(file);
            console.log(this.imageSrc);
        },
        reset() {
            this.imageSrc = null;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>