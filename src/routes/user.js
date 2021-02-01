const {Router} = require("express");
const {getAllUsers, createUser, updateUserById, deleteUser} = require("../controllers/user")
const userRouter = Router();

// userRouter.get("/users", getAllUsers);
// userRouter.post("/users", createUser);
// userRouter.patch("/users/:id", updateUserById);
// userRouter.delete("/users/:id", deleteUser);

//tidier way
userRouter.route("./users")
.get(getAllUsers)
.post(createUser)
userRouter.route("./users/:id")
.patch(updateUserById)
.delete(deleteUser)

module.exports = {
    userRouter,
}