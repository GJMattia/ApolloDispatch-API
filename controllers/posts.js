const Post = require("../models/post");

module.exports = {
  createPost,
  getPosts,
  likePost,
  dislikePost,
  deletePost,
};

async function deletePost(req, res) {
  try {
    await Post.findOneAndDelete({ _id: req.body.id });
    res.json(true);
  } catch (error) {
    console.error("error deleting post", error);
    res.status(500).json({ error: "Failed deleting post" });
  }
}

async function likePost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.body.id }).populate(
      "user",
      "name pic"
    );

    if (post.dislikes.users.includes(req.user._id)) {
      post.dislikes.value -= 1;
      post.dislikes.users = post.dislikes.users.filter(
        (userId) => userId !== req.user._id
      );
    }

    if (!post.likes.users.includes(req.user._id)) {
      post.likes.value += 1;
      post.likes.users.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("error liking post", error);
    res.status(500).json({ error: "Failed liking post" });
  }
}

async function dislikePost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.body.id }).populate(
      "user",
      "name pic"
    );

    if (post.likes.users.includes(req.user._id)) {
      post.likes.value -= 1;
      post.likes.users = post.likes.users.filter(
        (userId) => userId !== req.user._id
      );
    }

    if (!post.dislikes.users.includes(req.user._id)) {
      post.dislikes.value += 1;
      post.dislikes.users.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("error disliking post", error);
    res.status(500).json({ error: "Failed disliking post" });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await Post.find().limit(10).populate("user", "name pic");

    res.json(posts);
  } catch (error) {
    console.error("error getting posts", error);
    res.status(500).json({ error: "Failed getting posts" });
  }
}

async function createPost(req, res) {
  try {
    const userID = req.user._id;
    const newPost = await Post.create({
      user: userID,
      content: req.body.content,
    });

    const returnPost = await newPost.populate("user", "name pic");
    res.json(returnPost);
  } catch (error) {
    console.error("error creating post", error);
  }
}
