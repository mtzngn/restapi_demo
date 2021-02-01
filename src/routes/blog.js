const {Router} = require("express");
const {Blog} = require("../models/Blog");
const blogRouter = Router();



blogRouter.get("/blogs", async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.status(200).send(allBlogs);
    
    } catch (error) {
        res.status(500).send(error);}
    });

//get posts with user id
blogRouter.get("/blogs/:user_id", async (req, res) => {
    try {
        const allBlogs = await Blog.find({ author: req.params.user_id});
        res.status(200).send(allBlogs) 
    } catch (error) {
        res.status(500).send({message: "Couldnt match any blogs!"})
    }

})
//route to add user to db
blogRouter.post("/blogs", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog);
    } catch (error) {
        res.status(500).send({messages: "Could not post the blog"});
    }
});
//route for posting a blog with user id
blogRouter.post("/blogs/:user_id", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        blog.author = req.params.user_id;
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog);
    } catch (error) {
        res.status(500).send({messages: "Could not post the blog"});
    }
});
//update user
blogRouter.patch("/blogs/:id", async (req, res) => {
try {

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).send({messgae: `blog updated: ${updatedBlog}`})
} catch (error) {
    res.status(404).send({message: "Couldn't find the blog!"})
}
});

//delete user
blogRouter.delete("/blogs/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).send({message: `Blog with the title -${deletedBlog.title}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "Could not find the blog!"})
    }
});

module.exports = {
    blogRouter,
}