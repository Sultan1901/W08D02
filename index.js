const express = require('express')
const dotenv = require("dotenv");
const app = express()
dotenv.config();

const PORT = process.env.PORT


app.use(express.json())
app.use(express())

app.listen(PORT,()=>{
    console.log(`server work on ${PORT} `);
})

