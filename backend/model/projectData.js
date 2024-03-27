const mongoose = require("mongoose");

const projectDataSchema = mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    projectTheme: {
        type:String,
        required:true,
        trim:true
    },
    business: {
        type:String,
    },
    type: {
        type:String
    },
    division:{
        type:String,
        
    },
    category: {
        type:String
    },
    priority: {
        type:String
    },
    department:{
        type:String
    },
    startDate: {
        type:Date,
        default:Date.now()
    },
    endDate: {
        type:Date,
        default:Date.now()
    },
    location: {
        type:String
    },
    status:{
        type:String,
        required:true,
        default:"registered"
    }
});

module.exports = mongoose.model("projectData",projectDataSchema)