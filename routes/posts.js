const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");

router.post("/createpost", postCtrl.createPost);

router.get("/get10", postCtrl.getPosts);

router.put("/likepost", postCtrl.likePost);

router.put("/dislikepost", postCtrl.dislikePost);

router.delete("/deletepost", postCtrl.deletePost);

module.exports = router;
