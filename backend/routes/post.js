const router = require("express").Router();
const postCtrl = require("../controllers/post");
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
//module.exports = app => {

    // Creation d'un nouveau post
    router.post("/", postCtrl.createPost);

    // Retourne tous les posts
    router.get("/", postCtrl.getAllPosts);

    // Retrieve all published Tutorials
    //router.get("/published", postCtrl.findAllPublished);

    // Reourne un post spécifique
    router.get("/:id", postCtrl.getPost);

    // Mise à jour d'un post
    router.put("/:id", postCtrl.updatePost);

    // Suppression d'un post
    router.delete("/:id", postCtrl.deletePost);

    // Gestion des likes
//    router.delete("/:id", postCtrl.likePost);

    // Delete all Tutorials
    //router.delete("/", postCtrl.deleteAll);

//    app.use('/api/posts', router);
//};

module.exports = router;
