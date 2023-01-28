const router = require("express").Router();
const {createPost,getUserPost} = require("../controller/post");
const {requireLogin} = require("../middleware/auth");

// to create expense book

router.post("/create-post",requireLogin,createPost);

// to get user info

router.get("/get-posts",requireLogin,getUserPost);

module.exports = router;
