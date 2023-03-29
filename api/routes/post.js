const router = require("express").Router();
const post = require("../models/post");
const user = require("../models/user");

//create a post
router.post("/", async(req, res) => {
    const newPost = post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
});

//Update a post
router.put("/:id", async(req, res) =>{
    const Post = await post.findById(req.params.id);
    try{
        if(Post.userId === req.body.userId){
            await Post.updateOne({$set: req.body});
            res.status(200).json("Post has been updated");
        }else{
            res.status(403).json("You update only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async(req, res) =>{
    const Post = await post.findById(req.params.id);
    try{
        if(Post.userId === req.body.userId){
            await Post.deleteOne();
            res.status(200).json("Post has been deleted");
        }else{
            res.status(403).json("You can delete only your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Like/Unlike a post
router.put("/:id/like", async(req, res) =>{
    try{
        const Posts = await post.findById(req.params.id);
        if(!Posts.likes.includes(req.body.userId)){
            await Posts.updateOne({$push:{likes:req.body.userId}});
           res.status(200).json("You have liked this post");
        }else{
            await Posts.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("You have unliked this post");
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// Get a post
router.get("/:id", async(req, res) =>{
    try{
        const Posts = await post.findById(req.params.id)
        res.status(200).json(Posts)
    }catch(err){
        res.status(500).json(err)
    }
})

//get timeline posts
router.get("/timeline/:userId", async(req, res) =>{
    try{
        const currentUser = await user.findById(req.params.userId)
        const userPosts = await post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) =>{
                return post.find({userId:friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err)
    }
})

//Get all user's posts
router.get("/profile/:username", async(req, res) =>{
    try{
        const currentUser = await user.findOne({username:req.params.username});
        const allPosts = await post.find({userId:currentUser._id});
        res.status(200).json(allPosts);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;