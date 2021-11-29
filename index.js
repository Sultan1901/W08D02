const express = require('express')
const app = express()
const PORT = process.env.PORT

const dotenv = require('dotenv')
app.use(express.json())
app.use(express())
app.listen(PORT,()=>{
    console.log('sss');
})

