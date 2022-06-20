const express = require('express')
const UserModel = require('../model/userSchema')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

//* --Create User


router.post('/', [
    check('username', "Username is required!").notEmpty(),
    check("email", "Please use a valid email!").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with five or more characters").isLength({min: 5}),
] ,async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        // checking if there is an user with this email
        const userExist = await UserModel.findOne({email: userData.email})
        if (userExist) {
            return res.json({msg: "User already exist!"})
        }

        //* New User

        // Create the salt
        const SALT = await bcrypt.genSalt(10)
        // Use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        // Assign the hashed password to the userData
        userData.password = hashedPassword
        // Put the user in the db
        const user = await UserModel.create(userData)

        //* New JWT Token

        const payload = {
            id: user._id,
            email: user.email
        }

        const SECRET_KEY='MY_SECRET_KEY'

        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

        res.status(201).json({
            user: user,
            token: TOKEN
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!')
    }
})
