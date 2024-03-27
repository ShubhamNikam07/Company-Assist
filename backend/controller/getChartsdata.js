const ProjectDataSchema = require("../model/projectData");
const userSchema = require("../model/user");

exports.getChartsdata = async(req,res)=>{
    try{    
        const email = req.query.email;
        const token = req.headers;
        console.log("the token is",token);
        // console.log("data we get from body is ",email);
        const user = await userSchema.findOne({email:email});
        // console.log("user from email we get is ",user);

        const result = await ProjectDataSchema.aggregate([
            { $match: email?{id: user._id}:{} }, // Match documents based on the email filter
            {
              $group: {
                _id: '$department',
                total: { $sum: 1 },
                closed: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                department: '$_id',
                total: 1,
                closed: 1,
              },
            },
          ]);
          console.log("result from aggregation",result);

          if(!result){
           return res.status(404).json({
                success:false,
                message:"not data exist with this data"
            })
          }

        return res.status(200).json({
            success:true,
           data:result
        })

    } catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"internal server Error",
            error:err.message
        })
    }
};