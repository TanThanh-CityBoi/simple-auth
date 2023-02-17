const express = require('express');
const Account = require('../models/account');
const bycrypt = require('bcrypt');
const { validateEmail } = require('../utils/index')
const { isEmpty } = require('lodash');


const router = express.Router();


router.post('/sign-in', async (req, res) => {

})

router.post('/sign-in-google', async (req, res) => {

})

router.post('/sign-up', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const [isValid, messageRes] = await validateData(req.body)
        if (!isValid) return res.status(400).send(JSON.stringify({
            status: 400,
            message: messageRes
        }))

        const newAccount = new Account({
            email,
            firstName,
            lastName,
            password: bycrypt.hashSync(password, 10)
        })
        await newAccount.save();
        delete newAccount._doc.password
        return res.status(201).send(JSON.stringify({
            status: 201,
            message: 'CREATE ACCOUNT SUCCESSFULLY',
            data: newAccount,
        }))
    }
    catch (error) {
        return res.status(500).send(JSON.stringify({
            status: 500,
            message: "INTERNAL_SERVER_ERROR",
            error
        }))
    }
})

const validateData = async (data) => {
    const { email, password, confirmPassword } = data
    if (!email || !password || !confirmPassword)
        return [false, 'INVALID DATA']
    if (!validateEmail(email))
        return [false, 'INVALID EMAIL']
    if (password !== confirmPassword)
        return [false, 'PASSWORD AND CONFIRMPASSWORD NOT EQUAL']

    const existedUser = await Account.findOne({ email }).exec()
    if (!isEmpty(existedUser)) return [false, 'EXISTED USER']
    return [true, '']
}

module.exports = router