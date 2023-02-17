const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: String,
        firstName: String,
        lastName: String
    },
    { timestamps: true }
);

const Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;
