const projectDataSchema = require("../model/projectData");
const userSchema = require("../model/user");

exports.changeStatus = async(req,res)=>{
    try{
        const data = req.body;
        const user = await userSchema.findOne({email:data.email});
        const updatedSchema = await projectDataSchema.findOneAndUpdate({id:user._id,projectTheme:data.projectTheme}, { $set: { status: data.status }},{new:true});
        console.log("got update schema ")
        res.status(200).json({
            success:true,
            message:updatedSchema
        })
    } catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }
};