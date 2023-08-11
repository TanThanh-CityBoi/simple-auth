const express = require('express');
const User = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { validateEmail } = require('../utils/index')
const { isEmpty } = require('lodash');
const axios = require('axios')
const router = express.Router();

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec()
    if (isEmpty(user)) return res.status(404).json({
        status: 404,
        message: "USER NOT FOUND"
    })

    const isValidPassword = bycrypt.compareSync(password, user.password)
    if (!isValidPassword) return res.status(400).json({
        status: 400,
        message: 'PASSWORD IS NOT CORRECT'
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "8h" })

    res.status(200).json({
        status: 200,
        message: 'LOGIN SUCCESSFULLY',
        data: { user, token }
    })
})

router.post('/sign-in-google', async (req, res) => {
    const { googleAccessToken } = req.body;
    if (!googleAccessToken) return res.status(400).send(JSON.stringify({
        status: 400,
        message: 'GOOGLE ACCESS TOKEN NOT FOUND'
    }))

    axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
        .then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;

            const existedUser = await User.findOne({ email }).exec()
            if (!isEmpty(existedUser)) {
                delete existedUser._doc.password;
                const token = jwt.sign({
                    id: existedUser._id
                }, process.env.JWT_SECRET, { expiresIn: "8h" })
                return res.status(200).send(JSON.stringify({
                    status: 200,
                    message: 'LOGIN SUCCESSFULLY',
                    data: {
                        user: existedUser,
                        token,
                    }
                }))
            }

            const newUser = new User({ email, firstName, lastName })
            newUser.save()
            const token = jwt.sign({
                id: newUser._id
            }, process.env.JWT_SECRET, { expiresIn: "8h" })

            res.status(200).json({
                status: 200,
                message: 'LOGIN SUCCESSFULLY',
                data: {
                    user: newUser,
                    token
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: "INTERNAL SERVER ERROR",
                err
            })
        })
})

router.post('/sign-up', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const [isValid, messageRes] = await validateData(req.body)
        if (!isValid) return res.status(400).json({
            status: 400,
            message: messageRes
        })

        const newUser = new User({
            email,
            firstName,
            lastName,
            password: bycrypt.hashSync(password, 10)
        })
        await newUser.save();
        delete newUser._doc.password
        res.status(201).json({
            status: 201,
            message: 'SIGN-UP SUCCESSFULLY',
            data: newUser,
        })
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "INTERNAL_SERVER_ERROR",
            error
        })
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

    const existedUser = await User.findOne({ email }).exec()
    if (!isEmpty(existedUser)) return [false, 'EXISTED USER']
    return [true, '']
}

module.exports = router