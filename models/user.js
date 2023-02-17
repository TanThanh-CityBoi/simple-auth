const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: String,
        firstName: String,
        lastName: String
    },
    { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
