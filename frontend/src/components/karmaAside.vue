<template>
    <aside class="d-flex flex-column justify-content-between">
        <b-button-group v-if="$store.getters['auth/isAuthenticated']" class="d-flex flex-column">
            <b-button pill variant="light" class="bg-transparent" size="sm">
                <b-icon icon="arrow-up" variant="success" font-scale="1.5"></b-icon>
            </b-button>
            {{ karmaValue }}
            <b-button pill variant="light" class="bg-transparent" size="sm">
                <b-icon icon="arrow-down" variant="danger" font-scale="1.5"></b-icon>
            </b-button>
        </b-button-group>
        <b-button-group v-if="$store.getters['auth/isAuthenticated']" class="d-flex flex-column border">
            <b-button v-if="name === poster" pill variant="light" class="bg-transparent justify-content-end" size="sm">
                <b-icon icon="pencil" variant="dark" font-scale="1.5"></b-icon>
            </b-button>
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
            confirmDelete: ""
        }
    },
    computed: {
        id() { return this.$store.state.auth.id;},
        rank() { return this.$store.state.auth.rank;},
        name() { return this.$store.state.auth.name;}
    },
    props: {
        karmaValue: { default: 0 },
        poster: {default: null},
        postId: {}
    },
    methods: {
        deletePost() {
            // console.log(this.$bvModal);
            this.confirmDelete = "";
            this.$bvModal.msgBoxConfirm('La suppression de ce post entrainera aussi la suppression des commentaires associés.', {
                title: "Veuillez confrmer la suppression du post",
                size: "lg",
                okVariant: "danger",
                okTitle: "Confirmer",
                cancelTitle: "Annuler",
                centered: true
            })
                .then(value => {this.confirmDelete = value
                    if (value == true) {
                        // const params = 
                        // console.log("parmas ; ", params)
                        this.$store.dispatch("posts/deletePost", this.postId)
                        .then(data => {this.$router.push({ path: "/" })})
                    }
                })
                .catch(err => {})
        }
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
