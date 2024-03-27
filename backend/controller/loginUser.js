const USER = require("../model/user");

exports.userLogin = async(req,res)=>{
    const{email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(402).json({
                success:false,
                message:"please fill all fields"
            })
        }

        const userData = await USER.findOne({email:email});
        console.log("user we get ",userData);

        if(!userData){
            return res.status(402).json({
                success:false,
                message:"Invalid Credintails"
            })
        }
        
        if(userData.password == password){
            return res.status(200).json({
                success:true,
                message:"Login successful",
            })
        }

        return res.json({
            success:false,
            message:"Invalid Credintails"
        })
    } catch(err){
        console.log("some error occured", err.message);
    }
};
