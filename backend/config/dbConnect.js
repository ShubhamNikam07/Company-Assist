const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("db connection successfull")
    }).catch(()=>{
        console.log("DB connection error occured... unable to connect DB now")
    })
};

module.exports = dbConnect;