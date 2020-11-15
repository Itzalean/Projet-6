<template>
<div class="container">

    <!-- Post -->
    <section>
        <article class="container d-flex" :id="'post-' + data.id">
        <karma :karmaValue=data.Karma :poster=data.Name :postId=data.id :userVote=data.Vote :detail=true />
        <b-card class="my-2 col-11">
            <template v-slot:header>
                <span class="small">Posté par {{ data.Name}}{{ data.createdAt | formatDate }}</br></span>
                {{ data.Title }}
            </template>

            <b-card-text v-if="data.Type == 0">{{ data.Content }}</b-card-text>
            <b-card-img v-else-if="data.Type === 1" :src="data.Content"></b-card-img>
            <div v-else class="card-link">
                <a :href="data.Content" target="_blank">{{ data.Content }}</a>
            </div>

            <template v-slot:footer>
                <b-button v-if="data.Name === $store.state.auth.name" pill v-b-tooltip.hover title="Éditer le post" variant="outline-success" class="mr-3 py-0" size="md">
                    <b-icon icon="pencil" variant="dark" font-scale="1.5" class="py-1" />
                </b-button>
                <span class="small">Mis à jour{{ data.updatedAt | formatDate }}</span>
            </template>
        </b-card>
        </article>
    </section>

    <!-- Card de saisie des commentaires -->
    <section class="container col-8 my-5 py-3 border">
        <b-form @submit.prevent="addComment">
            <b-form-input class="my-2" id="title" v-model="Comment.title" required placeholder="Titre du commentaire" />

            <b-form-textarea id="content" v-model="Comment.content" rows="6" required placeholder="Saisissez votre commentaire" />

            <div class="my-2">
                <b-button type="submit" variant="primary" class="mx-3">Poster</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
    </section>

    <!-- Boucle d'affichage des commentaires -->
    <section>
        <commentModal @updateClicked="onUpdateClick" :id="commentId" :Title="commentTitle" :content="commentContent" />

        <b-row align-h="center" :key="commentKey" ref="Commentaire">

            <article v-for="comment in Comment" :id="'post-' + comment.id" class="b-container col-9 d-flex border border-primary px-1 my-1 rounded">
                <karma :karmaValue=comment.Karma :poster=comment.Name @deleteClicked="onDeleteClick" :postId=comment.id :userVote=comment.vote />
                <b-card class="my-2 px-0 col-11">
                    <template v-slot:header v-model="card.update">
                        <span class="small">Posté par {{ comment.Name }}{{ comment.createdAt | formatDate }}</br></span>
                        {{ comment.Title }}
                    </template>
                    <b-card-text>{{ comment.Content }}</b-card-text>

                    <template v-slot:footer>
                        <!-- Bouton d'édition des commentaires -->
                        <b-button v-if="data.Name === $store.state.auth.name" pill v-b-tooltip.hover title="Éditer le post" variant="outline-success" class="mr-3 py-0" size="md" @click="updateComment(comment.id)">
                            <b-icon icon="pencil" variant="dark" font-scale="1.5" class="py-1" />
                        </b-button>
                        <span class="small">Mis à jour{{ comment.updatedAt | formatDate }}</span>
                    </template>
                </b-card>
            </article>

        </b-row>

    </section>
</div>
</template>

<script>
import store from '../store'
import fetchService from "../services/fetch";
import commentModal from "../components/commentModal"

import karma from "./karmaAside"
export default {
    name: 'Post',
    components: {
       'karma': karma,
       commentModal
    },
    data() {
        return {
            data: {},
            Comment: [],
            commentKey: 0,
            commentId: 0,
            commentTitle: "",
            commentContent: ""
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
            .then((data) => {
                this.data = data[0];
                if (data.length > 0) {
                    this.Comment = data.slice(1, )
                }
            })
    },
    methods: {
        addComment(event) {
            const params = {
                userId: this.$store.state.auth.id,
                Title: this.Comment.title,
                Content: this.Comment.content,
                Type: 0,
                postId: this.data.id
            }
            event.target.reset()
            this.$store.dispatch("posts/addComment", params)
                .then(value => {this.updateList(value)
                })
        },
        updateComment(value) {
            const params = this.Comment.find( comment => comment.id === value);
            this.commentId = params.id;
            this.commentTitle = params.Title;
            this.commentContent = params.Content;
            this.$bvModal.show('commentModal')
        },
        updateList(value) {
            value.Name = this.$store.state.auth.name;
            this.Comment.unshift(value);
            this.commentKey += 1
        },
        onUpdateClick(params) {
            const index = this.Comment.findIndex(x => x.id == this.commentId);
            this.Comment[index].Title = params.Title;
            this.Comment[index].Content = params.Content;
            this.commentKey += 1
        },
        onDeleteClick(params) {
            const index = this.Comment.findIndex(x => x.id == params);
            this.Comment.splice(index, 1);
            this.commentKey += 1
        }
    }
}

</script>
