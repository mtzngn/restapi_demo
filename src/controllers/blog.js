const {Blog} = require("../models/Blog")

exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.status(200).send(allBlogs);
    
    } catch (error) {
        res.status(500).send(error);}
};

exports.getBlogsById =  async (req, res) => {
    try {
        const allBlogs = await Blog.find({ author: req.user._id});
        res.status(200).send(allBlogs) 
    } catch (error) {
        res.status(500).send({message: "Couldnt match any blogs!"})
    }

};

exports.createBlog =  async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog);
    } catch (error) {
        res.status(500).send({messages: "Could not post the blog"});
    }
};
exports.createBlogWithUserId = async (req, res) => {
    try {
        const blog = new Blog(req.body);
        blog.author = req.user._id;
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog);
    } catch (error) {
        res.status(500).send({messages: "Could not post the blog"});
    }
};
exports.updateBlogById =  async (req, res) => {
    try {
    
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send({messgae: `blog updated: ${updatedBlog}`})
    } catch (error) {
        res.status(404).send({message: "Couldn't find the blog!"})
    }
};
exports.deleteBlogById =  async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).send({message: `Blog with the title -${deletedBlog.title}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "Could not find the blog!"})
    }
};