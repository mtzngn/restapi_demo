const {Router} = require("express");
const blogRouter = Router();
const {getAllBlogs, getBlogsById, createBlog, createBlogWithUserId, updateBlogById, deleteBlogById} = require("../controllers/blog")
const {auth} = require("../middleware/")

blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blogs/:user_id", getBlogsById)
blogRouter.post("/blogs/", auth, createBlog);
blogRouter.post("/blogs/", auth, createBlogWithUserId);
blogRouter.patch("/blogs/:id", auth, updateBlogById);
blogRouter.delete("/blogs/:id", auth, deleteBlogById);

module.exports = {
    blogRouter,
}