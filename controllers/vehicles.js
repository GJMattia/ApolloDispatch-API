const Vehicle = require("../models/vehicle");
const User = require("../models/user");

module.exports = {
  getVehicles,
  createVehicle,
  updateTire,
  updateFluid,
  updateStatus,
  updateInspection,
  updateRegistration,
  addNote,
  deleteNote,
  editNote,
  updateVin,
  updatePlate,
};

async function updateVin(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.vin = req.body.vin;
    await vehicle.save();
    res.json({
      vin: vehicle.vin,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update vin." });
  }
}

async function editNote(req, res) {
  try {
    const { vehicleId, noteIndex, editedNote } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    vehicle.notes[noteIndex].text = editedNote;
    await vehicle.save();
    return res.json({
      vehicleId,
      noteIndex,
      editedNote,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    console.error("Failed to delete note from vehicle:", err);
    return res
      .status(500)
      .json({ error: "Failed to delete note from vehicle" });
  }
}

async function deleteNote(req, res) {
  try {
    const { vehicleId, noteIndex } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    vehicle.notes.splice(noteIndex, 1);
    await vehicle.save();
    return res.json({ vehicleId, noteIndex, updatedAt: vehicle.updatedAt });
  } catch (err) {
    console.error("Failed to delete note from vehicle:", err);
    return res
      .status(500)
      .json({ error: "Failed to delete note from vehicle" });
  }
}

async function addNote(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.notes.push({ text: req.body.note }); // ✅ matches schema
    await vehicle.save();
    res.json({
      notes: vehicle.notes,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add note to vehicle" });
  }
}

async function updateInspection(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.inspection = req.body.inspection;
    await vehicle.save();
    res.json({
      inspection: vehicle.inspection,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update inspection information" });
  }
}

async function updateRegistration(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.registration = req.body.registration;
    await vehicle.save();
    res.json({
      registration: vehicle.registration,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update registration information" });
  }
}

async function updateStatus(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.status = req.body.status;
    await vehicle.save();
    res.json({
      status: vehicle.status,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update drive status information" });
  }
}

async function updateTire(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.tire = req.body.tire;
    await vehicle.save();
    res.json({
      tire: vehicle.tire,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update tire information" });
  }
}

async function updatePlate(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.plate = req.body.plate;
    await vehicle.save();
    res.json({
      plate: vehicle.plate,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update plate information" });
  }
}

async function updateFluid(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.body.vehicleID);
    vehicle.fluid = req.body.fluid;
    await vehicle.save();
    res.json({
      fluid: vehicle.fluid,
      id: vehicle._id,
      updatedAt: vehicle.updatedAt,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update washer fluid information" });
  }
}

async function getVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
}

async function createVehicle(req, res) {
  try {
    const userID = req.user._id;
    const { name, vin, inspection, type } = req.body.formData;

    const newVehicle = await Vehicle.create({
      user: userID,
      name,
      type,
      vin,
      inspection: new Date(inspection),
    });

    await User.findByIdAndUpdate(
      userID,
      { $push: { vehicles: newVehicle._id } },
      { new: true }
    );

    res.json(newVehicle);
  } catch (error) {
    console.error("error creating vehicle", error);
    res.status(500).json({ error: "Failed to create vehicle" });
  }
}
