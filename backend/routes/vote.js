const router = require("express").Router();
const voteCtrl = require("../controllers/vote");


// Creation / mise à jour d'un vote sur un post
router.post("/", voteCtrl.updateVote);

module.exports = router;
