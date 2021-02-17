const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true
},
tokens: [{token: {type: String}}]
}, {timestamps: true});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async(email, password)=> {
    const user = await User.findOne({email: email})
    if(!user) {
        throw new Error("user not found!")
    }
    const c = await bcrypt.compare(password, user.password)
    if(!c) {
        throw new Error("password not match!")
    }
    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '1 week'});
    this.tokens.push({ token });
    return token;
}

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}