<template>
    <aside class="d-flex flex-column justify-content-between">
        <b-button-group class="d-flex flex-column">
            <!-- Bouton like -->
            <b-button pill variant="primary" size="sm" @click="like(true)"
                :disabled="isDisliked">
                <b-icon icon="arrow-up" variant="light" font-scale="1.5"></b-icon>
            </b-button>

            {{ Likes }}
            <!-- <br>{{karmaValue}} -->
            <!-- Bouton dislike -->
            <b-button id="down" pill variant="danger" size="sm" @click="like(false)" :disabled="isLiked">
                <b-icon icon="arrow-down" variant="light" font-scale="1.5"></b-icon>
            </b-button>
        </b-button-group>

        <!-- Bouton de suppression -->
        <b-button-group class="d-flex flex-column border">
            <b-button v-if="(rank === 'MOD' || rank === 'ADMIN' || name === poster)" pill variant="light" class="bg-transparent" size="sm" @click="deletePost()">
                <b-icon icon="trash" variant="danger" font-scale="2"></b-icon>
            </b-button>
        </b-button-group>
    </aside>
</template>

<script>

export default {
    name: 'karma',
    data() {
        return {
            confirmDelete: "",
            // up: "",
            // down: "",
            Likes: this.karmaValue,
            vote: this.userVote
        }
    },
    computed: {
        id() { return this.$store.state.auth.id;},
        rank() { return this.$store.state.auth.rank;},
        name() { return this.$store.state.auth.name;},
        isLiked() {return this.vote > 0 ? true : false},
        isDisliked() {return this.vote < 0 ? true : false}
    },
    props: {
        karmaValue: { default: 0 },
        poster: {default: null},
        postId: {},
        detail: { default: false},
        userVote: {}
    },
    methods: {
        deletePost() {
            this.confirmDelete = "";
            this.$bvModal.msgBoxConfirm('La suppression de ce post entrainera aussi la suppression des éventuels commentaires associés.', {
                title: "Veuillez confrmer la suppression du post",
                size: "lg",
                okVariant: "danger",
                okTitle: "Confirmer",
                cancelTitle: "Annuler",
                centered: true
            })
                .then(value => {this.confirmDelete = value
                    if (value == true) {
                        this.$store.dispatch("posts/deletePost", this.postId)
                        .then(data => {
                            if (!this.detail) {
                                // Réaffichage des listes de posts ou commentaires
                                this.$emit('deleteClicked', this.postId);
                            } else {
                                // Changement de page après suppression du post depuis la page du post
                                this.$router.push({ path: '/Posts' })
                            }
                        })
                    }
                })
                .catch(err => {})
        },
        like(likeValue) {
            // Si on a déjà voté, on enlève la "valeur" du vote (1 ou -1) au total puis on annule le vote
            if (this.vote > 0 || this.vote < 0) {
                this.Likes -= this.vote;
                this.vote = 0;
            // Sinon, s'il s'agit d'un like, on ajoute 1 au total et vote = 1
            } else if (likeValue) {
                this.vote = 1;
                this.Likes++
            // Sinon, il s'agit donc d'un dislike, on enlève 1 au total et vote = -1
            } else {
                this.vote = -1;
                this.Likes--
            }

            const params = {
                userId: this.id,
                postId: this.postId,
                vote: this.vote
            }
            this.$store.dispatch("posts/vote", params)
                .then(res => {})
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
aside {
    width: 3em;
    text-align: center;
    padding-top: 1em ;
}

</style>
