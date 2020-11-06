// module.exports = app => {
    const userCtrl = require("../controllers/user");

    const router = require("express").Router();

    // Creation de compte utilisateur
    router.post("/signup", userCtrl.signup);

    // Connexion au site
    router.post("/login", userCtrl.login);

    // app.use('/api/auth/', router);
// };

module.exports = router;
