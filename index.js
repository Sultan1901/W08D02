const express = require('express')
const dotenv = require("dotenv");
const  Mongoose  = require('mongoose');
const app = express()
dotenv.config();
require('./db')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express())
const roleRouter = require('./routes/routers/role')
app.use(roleRouter)

const userRouter = require("./routes/routers/user");
app.use(userRouter);

const PORT = process.env.PORT || 5001




app.listen(PORT,()=>{
    console.log(`server work on ${PORT} `);
})

