const {Router} = require("express");
const {  getMyProfile, createUser, updateUserById, deleteUser, login, logout} = require("../controllers/user")
const userRouter = Router();
const { hashPassword, auth } = require("../middleware/")
//TEST
//add a user
//copy the token
//get your profile(remember to include token in the header)

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.post("/users",  hashPassword, createUser);
userRouter.patch("/users/myprofile", auth, hashPassword, updateUserById);
userRouter.delete("/users/myprofile", auth, deleteUser);
userRouter.post("/users/login", login);
userRouter.get("/users/logout", auth, logout)

//tidier way
// userRouter.route("./users")
// .get(getAllUsers)
// .post(createUser)
// userRouter.route("./users/:id")
// .patch(updateUserById)
// .delete(deleteUser)

module.exports = {
    userRouter,
}