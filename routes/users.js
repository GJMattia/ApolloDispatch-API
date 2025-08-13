const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.put("/verify", usersCtrl.verify);
router.put("/sendcode", usersCtrl.sendcode);
router.put("/resetpw", usersCtrl.resetPW);
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.put("/updatepp", usersCtrl.updatePP);

module.exports = router;
