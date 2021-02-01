const {Router} = require("express");
const blogRouter = Router();
const {getAllBlogs, getBlogsById, createBlog, createBlogWithUserId, updateBlogById, deleteBlogById} = require("../controllers/blog")


blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blogs/:user_id", getBlogsById)
blogRouter.post("/blogs", createBlog);
blogRouter.post("/blogs/:user_id", createBlogWithUserId);
blogRouter.patch("/blogs/:id", updateBlogById);
blogRouter.delete("/blogs/:id", deleteBlogById);

module.exports = {
    blogRouter,
}