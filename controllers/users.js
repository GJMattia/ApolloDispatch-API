const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  create,
  login,
  verify,
  sendcode,
  resetPW,
  checkToken,
  updatePP,
};

async function updatePP(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.pic = req.body.pic;
    await user.save();
    res.json(user.pic);
  } catch (error) {
    console.error("Error changing profile picture", error);
    res.status(500).json({ error: "error changing profile picture" });
  }
}

async function resetPW(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    user.password = req.body.password;
    user.save();
    res.json({ result: true });
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

async function sendcode(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.code = Math.floor(1000 + Math.random() * 9000);
      user.save();
      res.json({ user: user, error: false });
    } else if (!user) {
      res.json({ error: true });
    }
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

async function verify(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let userEnteredCode = req.body.code;

    if (userEnteredCode == user.code) {
      user.verified = true;
      user.save();
      res.json({ user: user, status: true });
    } else {
      res.json({ user: user, status: false });
    }
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
