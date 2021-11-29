const userModel = require('./../../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async(req,res)=>{
    const {email, password , role} = req.body
    const SALT = Number(process.env.SALT)
    const semail = email.toLowerCase()
    const hashpass = await bcrypt.hash(password,SALT)
    const newUser = new userModel({
        email : semail,
        password : hashpass,
        role
    })
    newUser
    .save()
    .then((result)=>{
        res.status(201).json(result)

    })
    .catch((err)=>{
        res.status(400).json(err)
    })
}
module.exports = register