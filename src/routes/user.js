const {Router} = require("express");
const {User} = require("../models/User");
const userRouter = Router();

//get all users
userRouter.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).send(allUsers);
    
    } catch (error) {
        res.status(500).send(error);}
    });
//route to add user to db
userRouter.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send({messages: "Could not connect"});
    }
});

//update user
userRouter.patch("/users/:id", async (req, res) => {
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
userRouter.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        await user.deleteOne();
        res.status(200).send({message: `User with the name -${user.name}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "user could not be deleted"})
    }
});

module.exports = {
    userRouter,
}