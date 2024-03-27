exports.auth = (req,res,next)=>{
    try{
        const data = req.body;
        console.log("data we have ",data);
    } catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}