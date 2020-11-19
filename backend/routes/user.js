const userCtrl = require("../controllers/user");

const router = require("express").Router();

// Creation de compte utilisateur
router.post("/signup", userCtrl.signup);

// Connexion au site
router.post("/login", userCtrl.login);

module.exports = router;
