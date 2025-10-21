const express = require("express");
const router = express.Router();
const daCtrl = require("../controllers/das");

router.get("/getDAs", daCtrl.getDAs);

router.post("/createDA", daCtrl.createDA);

router.put("/flipstatus", daCtrl.flipStatus);

router.put("/resetallstatus", daCtrl.resetAllStatus);

router.delete("/deleteda", daCtrl.deleteDA);

module.exports = router;
