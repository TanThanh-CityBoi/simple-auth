const express = require('express');
const Account = require('../models/account')
const { isEmpty } = require('lodash')


const router = express.Router();


router.post('/sign-in', async (req, res) => {

})

router.post('/sign-in-google', async (req, res) => {

})

router.post('/sign-up', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const [isValid, messageRes] = validateData(req.body)
        if (!isValid) return res.status(400).send(JSON.stringify({
            statusCode: 400,
            message: messageRes
        }))

        const newAccount = new Account({
            email,
            firstName,
            lastName,
            password
        })
        newAccount.save()
        return res.status(201).send(JSON.stringify({
            status: 201,
            message: 'CREATE ACCOUNT SUCCESSFULLY',
            data: newAccount,
        }))
    }
    catch (error) {
        res.status(500).send(JSON.stringify({
            statusCode: 500,
            message: "INTERNAL_SERVER_ERROR",
            error
        }))
    }
})

const validateData = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data
    if (!firstName || !lastName || !email || !password || !confirmPassword)
        return [false, 'INVALID DATA']
    if (!validateEmail(email))
        return [false, 'INVALID EMAIL']
    if (password !== confirmPassword)
        return [false, 'PASSWORD AND CONFIRMPASSWORD NOT EQUAL']

    const existedUser = await Account.findOne({ email }).exec()
    if (isEmpty(existedUser)) {
        return [false, 'EXISTED USER']
    }
}

module.exports = router