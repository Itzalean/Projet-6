const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
// Middleware de contrôle de l'authentification
const auth = require('../middleware/auth');
// Middleware permettant de récupérer les données des images dans les requêtes
const multer = require('../middleware/multer-config');

router.get("/:userId", postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:userId/post/:id", postCtrl.getPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
