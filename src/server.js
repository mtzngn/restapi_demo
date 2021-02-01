require("./db/connection");
const express = require("express");
const {User} = require("./models/User");

const port = process.env.PORT || 5000
const app = express();
app.use(express.json());


//get all users
app.get("/users", async (req, res) => {
try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);

} catch (error) {
    res.status(500).send(error);
}
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
    res.status(500).send({message: "Couldn't update!"})
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

app.listen(port, () =>{
    console.log(`server is listening on port ${5000}`)
});