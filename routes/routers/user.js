const express = require('express')
const {register , login} = require('./../contoller/user')

const userRouter = express.Router()
userRouter.post('/addusr', register)
userRouter.post("/login", login);


module.exports = userRouter