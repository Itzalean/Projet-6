<template>
<section class="container">
    <article v-for="post in data" class="b-container d-flex border border-warning px-1 my-1 rounded">
        <karma :karmaValue=post.Karma :poster=post.Name :postId=post.id />
        <b-card class="my-2 px-0 col-11">
            <template v-slot:header>
                <router-link :to="`Post/` + post.id " class="stretched-link"></router-link>
                <span class="small">Posté par {{ post.Name }}{{ post.createdAt | formatDate }}</br></span>
                {{ post.Title }}
            </template>
            <b-card-text v-if="post.Type === 0">{{ post.Content }}</b-card-text>
            <b-card-img v-else-if="post.Type === 1" :src="post.Content"></b-card-img>
            <div v-else class="card-link"><a :href="post.Content" target="_blank">{{ post.Content }}</a></div>
            <template v-slot:footer><span class="small">{{ post.updatedAt | formatDate }}</span></template>
        </b-card>
    </article>
</section>
</template>

<script>
import fetchService from "../services/fetch";

import karma from "./karmaAside"
import store from '../store'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'PostList',
    computed: {
    },
    components: {
        'karma': karma
    },
    data() {
        return {
            data: {}
        }
    },
    filters: {
        formatDate: function (value) {
            let tempDate = value.split(/[- :.TZ]/);
            return " le " + tempDate[2] + "/" + tempDate[1] + "/" + tempDate[0] + " à " + tempDate[3] + ":" + tempDate[4] + ":" + tempDate[5];
        }
    },
    beforeMount() {
        this.$store.dispatch("posts/getAllPosts")
            .then((data) => {this.data = data})
        // this.getAllPosts();
//        console.log(globalThis)
    },
    methods: {
        // getAllPosts() {
        //     fetchService("posts")
        //         .then(data => {console.log(this.$store)
        //             this.data = data})
        // }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div .card-link {
    z-index: 2;
    position: relative;   
}
</style>
