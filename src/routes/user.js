const {Router} = require("express");
const {getAllUsers, createUser, updateUserById, deleteUser, login} = require("../controllers/user")
const userRouter = Router();
const { hashPassword } = require("../middleware/")

userRouter.get("/users", getAllUsers);
userRouter.post("/users", hashPassword, createUser);
userRouter.patch("/users/:id", hashPassword, updateUserById);
userRouter.delete("/users/:id", deleteUser);
userRouter.post("/users/login", login);

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