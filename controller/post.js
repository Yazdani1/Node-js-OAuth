const Post = require("../model/Post");


// Create post

exports.createPost = async(req,res)=>{

    const { title  } = req.body;

    try {
      
      if (!title) {
        return res.status(422).json({ error: "please add title" });
      }
  

      const postDetails = Post({
        title,
        postedBy: req.user._id,
      });
  
      const savePost = await Post.create(postDetails);
  
      res.status(201).json(savePost);
    } catch(error){
        res.status(400).json({error:"Someting went wrong"})
    }

}


// To get user posts


exports.getUserPost = async(req,res)=>{

    try {

        const userPosts = await Post.find({postedBy:req.user}).populate("postedBy","name role _id email").sort({date:-1});

        res.status(200).json(userPosts);

    } catch(error){
        res.status(400).json({error:"Someting went wrong"})

    }

}