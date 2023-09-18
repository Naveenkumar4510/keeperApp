const router = require("express").Router();
const bodyParser = require("body-parser");
let Post = require("../models/post-model.js")
 
router.use(bodyParser.urlencoded({extended: true}));
 
router.route("/").get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});
 
router.route("/compose").post((req, res) => {
    const newPost = new Post ({
        title: req.body.title, 
        content: req.body.content
    });
    newPost.save()
        .then(() => res.send("new post added!"))
        .catch(err => res.status(400).json("Error: " + err));
});
 
router.route("/:postId")
    .get((req, res) => {
        Post.findById(req.params.postId)
        .then(post => res.json(post))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .delete((req, res) => {
        Post.findByIdAndDelete(req.params.postId)
        .then(() => res.send("successfully deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});
 
router.route("/update/:postId").post((req, res) => {
    
    Post.findById(req.params.postId)
        .then(post => {
            post.title = req.body.title;
            post.content = req.body.content;
 
            post.save()
                .then(() => res.send("post updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});
 
 
module.exports = router;