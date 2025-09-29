const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
},
{
    versionKey: false,
});

module.exports = mongoose.model("User", userSchema);
