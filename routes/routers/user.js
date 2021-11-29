const express = require('express')
const register = require('./../contoller/user')
const userRouter = express.Router()
userRouter.post('/addusr', register)


module.exports = userRouter