require("./db/connection");
const express = require("express");
const {User} = require("./models/User");
const {Blog} = require("./models/Blog");

const port = process.env.PORT || 5000
const app = express();
app.use(express.json());

//get all users
app.get("/users", async (req, res) => {
try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);

} catch (error) {
    res.status(500).send(error);}
});
//route to add user to db
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send({messages: "Could not connect"});
    }
});
//update user
app.patch("/users/:id", async (req, res) => {
try {
    const query = {_id: `${req.params.id}`}
    const newUser = req.body
    const updatedUser = await User.findOneAndUpdate(query, newUser)
    res.status(200).send({messgae: `user succesfully updated!`})
} catch (error) {
    res.status(404).send({message: "Couldn't update!"})
}
});

//delete user
app.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        await user.deleteOne();
        res.status(200).send({message: `User with the name -${user.name}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "user could not be deleted"})
    }
});






//get all posts
app.get("/blogs", async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.status(200).send(allBlogs);
    
    } catch (error) {
        res.status(500).send(error);}
    });

//get posts with user id
app.get("/blogs/:user_id", async (req, res) => {
    try {
        const allBlogs = await Blog.find({ author: req.params.user_id});
        res.status(200).send(allBlogs) 
    } catch (error) {
        res.status(500).send({message: "Couldnt match any blogs!"})
    }

})
//route to add user to db
app.post("/blogs", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog);
    } catch (error) {
        res.status(500).send({messages: "Could not post the blog"});
    }
});
//route for posting a blog with user id
app.post("/blogs/:user_id", async (req, res) => {
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
app.patch("/blogs/:id", async (req, res) => {
try {

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).send({messgae: `blog updated: ${updatedBlog}`})
} catch (error) {
    res.status(404).send({message: "Couldn't find the blog!"})
}
});

//delete user
app.delete("/blogs/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).send({message: `Blog with the title -${deletedBlog.title}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "Could not find the blog!"})
    }
});
    

app.listen(port, () =>{
    console.log(`server is listening on port ${5000}`)
});