const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth');

// Creation d'un nouveau commentaire
router.post("/", auth, commentCtrl.addComment);

// Mise à jour d'un commentaire
router.put("/:id", auth, commentCtrl.updateComment);

// Suppression d'un nouveau post
//router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
