const express = require('express')
const {create,getRole} = require('../contoller/role')
const roleRouter = express.Router()
roleRouter.post('/create', create)
roleRouter.get("/getRole", getRole);
module.exports = roleRouter