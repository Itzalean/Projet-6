<template>
<section class="container" :key="postKey">

    <article v-for="post in data" :id="'post-' + post.id" class="b-container d-flex border border-warning px-1 my-1 rounded">

        <karma :karmaValue=post.Karma :poster=post.userId :postId=post.id :userVote=post.vote @deleteClicked="onDeleteClick" />

        <b-card class="my-2 px-0 col-11">
            <template v-slot:header>
                <router-link :to="`Post/` + post.id " class="stretched-link"></router-link>
                <span class="small">Posté par {{ post.Name }}{{ post.createdAt | formatDate }}</br></span>
                {{ post.Title }}
            </template>
            <!-- Affichage selon le type de post -->
            <b-card-text v-if="post.Type === 0">{{ post.Content }}</b-card-text>
            <b-card-body v-else-if="post.Type === 1" class="text-center">
                <b-card-img :src="post.Content" :alt="post.Title" />
            </b-card-body>
            <div v-else class="card-link"><a :href="post.Content" target="_blank">{{ post.Content }}</a></div>

            <template v-slot:footer>
                <b-button v-if="post.userId === $store.state.auth.id" pill v-b-tooltip.hover title="Éditer le post" variant="outline-success" class="editBtn mr-3 py-0" size="md" @click="updatePost(post.id)">
                    <b-icon icon="pencil" variant="dark" font-scale="1.5" class="py-1"></b-icon>
                </b-button>
                <span class="small">Mis à jour{{ post.updatedAt | formatDate }}</span>
            </template>
        </b-card>

    </article>

</section>
</template>

<script>
import { mapGetters } from 'vuex';

import karma from "./karmaAside"
import store from '../store'

export default {
    name: 'PostList',
    components: {
        'karma': karma
    },
    computed: {
        hasId() {
            return this.$store.state.auth.id
        },
    },
    data() {
        return {
            data: {},
            postKey: 0,
        }
    },
    filters: {
        formatDate: function (value) {
            let tempDate = value.split(/[- :.TZ]/);
            return " le " + tempDate[2] + "/" + tempDate[1] + "/" + tempDate[0] + " à " + tempDate[3] + ":" + tempDate[4] + ":" + tempDate[5];
        }
    },
    created() {
        this.$store.dispatch("posts/getAllPosts", this.$store.state.auth.id )
        .then((data) => {this.data = data})
    },
    methods: {
        updatePost(value) {
            const param = this.data.find( x => x.id === value)
            this.$router.push({ name: "Create", params: {parmPostId: param}})
        },
        onDeleteClick(params) {
            const index = this.data.findIndex(x => x.id == params);
            this.data.splice(index, 1);
            this.postKey += 1
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Pour pouvoir clicker sur les liens dans les cards
div .card-link, .editBtn {
    z-index: 2;
    position: relative;   
}
img {
    max-height: 800px;
    max-width: 100%;
    height: auto;
    width: auto;
}
.card-text {
    white-space: pre-wrap;
}

</style>
