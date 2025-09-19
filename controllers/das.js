const DA = require("../models/da");
const User = require("../models/user");

module.exports = {
  getDAs,
  createDA,
  flipStatus,
  resetAllStatus,
};

async function resetAllStatus(req, res) {
  try {
    await DA.updateMany({ user: req.user._id }, { $set: { confirmed: false } });
    const DAs = await DA.find({ user: req.user._id });
    res.json(DAs);
  } catch (err) {
    res.status(500).json({ error: "Failed to reset DA confirm statuses" });
  }
}

async function flipStatus(req, res) {
  try {
    const da = await DA.findById(req.body.DAID);
    da.confirmed = !da.confirmed;
    await da.save();
    res.json({ _id: da._id, confirmed: da.confirmed });
  } catch (err) {
    res.status(500).json({ error: "Failed to flip DA confirm status" });
  }
}

async function getDAs(req, res) {
  try {
    const DAs = await DA.find({ user: req.user._id });
    res.json(DAs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch DAs" });
  }
}

async function createDA(req, res) {
  try {
    const userID = req.user._id;

    console.log(userID, req.body);
    const { name, title } = req.body.formData;

    const newDA = await DA.create({
      user: userID,
      name,
      title,
    });

    await User.findByIdAndUpdate(
      userID,
      { $push: { DAs: newDA._id } },
      { new: true }
    );

    res.json(newDA);
  } catch (error) {
    console.error("error creating DA", error);
    res.status(500).json({ error: "Failed to create DA" });
  }
}
