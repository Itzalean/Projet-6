<template>
<div class="container">
    <section>
        <article class="container d-flex">
        <karma :karmaValue=data.Karma :poster=data.Name :postId=data.id />
        <b-card class="my-2 col-11">
            <template v-slot:header>
                <span class="small">Posté par {{ data.Name}}{{ data.createdAt | formatDate }}</br></span>
                {{ data.Title }} {{$store.state.rank}} {{$store.state.Id}}
            </template>
            <b-card-text v-if="data.Type == 0">{{ data.Content }}</b-card-text>
            <b-card-img v-else-if="data.Type === 1" :src="data.Content"></b-card-img>
            <div v-else class="card-link"><a :href="data.Content" target="_blank">{{ data.Content }}</a></div>
            <template v-slot:footer><span class="small">{{ data.updatedAt | formatDate }}</span></template>
        </b-card>
        </article>
    </section>
    <section v-if="$store.getters['auth/isAuthenticated']" class="container col-8 my-5 py-3 border">
        <b-form>
                <b-form-input class="my-2" id="title" v-model="Comment.title" required placeholder="Titre du commentaire"></b-form-input>

                <b-form-textarea id="content" v-model="Comment.content" rows="6" required placeholder="Saisissez votre commentaire"></b-form-textarea>

            <div class="my-2">
                <b-button type="submit" variant="primary" >Poster</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
    </section>
</div>
</template>

<script>
import store from '../store'
import fetchService from "../services/fetch";
import { mapGetters, mapState } from 'vuex'

import karma from "./karmaAside"
export default {
    name: 'Post',
    components: {
        'karma': karma,
    },
    computed: {
        ...mapGetters(['auth/isAuthenticated']),
        ...mapState
    },
    data() {
        return {
            data: {},
            Comment: {}
        }
    },
    filters: {
        formatDate: function (value) {
            let tempDate = (value || '').split(/[- :.TZ]/);
            return " le " + tempDate[2] + "/" + tempDate[1] + "/" + tempDate[0] + " à " + tempDate[3] + ":" + tempDate[4] + ":" + tempDate[5];
        }
    },
    beforeMount() {
        this.$store.dispatch("posts/getPost", this.$route.params.id)
            .then((data) => {this.data = data})

        // console.log('store : ', store)
        // this.getPost(this.$route.params.id);
    },
    methods: {
        // getPost(id) {
        //     fetchService("posts/" + id)
        //         .then(data => {
        //             this.data = data})
        // }
    }
}

</script>
