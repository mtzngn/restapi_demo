const {User} = require("../models/User")

exports.getAllUsers =  async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).send(allUsers);
    
    } catch (error) {
    res.status(500).send(error);
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken()
        const savedUser = await user.save();
        res.status(201).send({savedUser, token});
    } catch (error) {
        if(error.code == 11000) {
            res.status(500).send({messages: "the email adress already exist!!"});
        } else {
            res.status(500).send({messages: "Could not connect"});
        }
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const query = {_id: `${req.params.id}`}
        const newUser = req.body
        const updatedUser = await User.findOneAndUpdate(query, newUser)
        res.status(200).send({messgae: `user succesfully updated!`})
    } catch (error) {
        res.status(404).send({message: "Couldn't update!"})
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        await user.deleteOne();
        res.status(200).send({message: `User with the name -${user.name}- is succesfully deleted`})
    } catch (error) {
        res.status(500).send({message: "user could not be deleted"})
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.status(200).send({user, token});
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "unable to log in"});
    }
};

