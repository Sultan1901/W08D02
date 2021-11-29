const mongoose = require('mongoose')
require('dotenv').config
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DB).then(()=>{
    console.log('DB WORK');
})