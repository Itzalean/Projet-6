<template>
<b-modal id="commentModal" ref="commentModal" centered title="Modification d'un commentaire" size="lg" hide-footer v-show=true>

    <b-form @submit.prevent="updateComment">
        <b-form-input class="my-2" id="titre" :value="title" required placeholder="Titre du commentaire"></b-form-input>

        <b-form-textarea id="contenu" v-model="content" rows="6" required placeholder="Saisissez votre commentaire"></b-form-textarea>

        <div class="my-2">
            <b-button type="submit" variant="primary" class="mx-3">Poster</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </div>
    </b-form>
</b-modal>
</template>

<script>

export default {
    name: "commentModal",
    data() {
        return {
        }
    },
    props: {
    },
    computed: {
        title: {
            get: function() {
                return this.$attrs.Title},
            set: function() {}
        },
        content: {
            get: function() {
                return this.$attrs.content},
            set: function() {}
        }
    },
    methods: {
        updateComment: function() {
            const params = {
                postId: this.$attrs.id,
                Title: document.getElementById('titre').value,
                Content: document.getElementById('contenu').value
            }
            this.$store.dispatch("posts/updateComment", params)
                .then((value) => {
                    this.$emit('updateClicked', params);
                    this.$bvModal.hide('commentModal')
                })
        },
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