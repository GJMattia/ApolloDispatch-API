const express = require("express");
const router = express.Router();
const vehicleCtrl = require("../controllers/vehicles");

router.get("/getvehicles", vehicleCtrl.getVehicles);

router.post("/createvehicle", vehicleCtrl.createVehicle);

router.put("/updatetire", vehicleCtrl.updateTire);

router.put("/updatefluid", vehicleCtrl.updateFluid);

router.put("/updatestatus", vehicleCtrl.updateStatus);

router.put("/updateinspection", vehicleCtrl.updateInspection);

router.put("/addnote", vehicleCtrl.addNote);

router.delete("/deletenote", vehicleCtrl.deleteNote);

module.exports = router;
