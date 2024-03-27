const ProjectSchema = require("../model/projectData");

exports.getCardData = async(req,res)=>{
    try{
            const statusWiseCount = await ProjectSchema.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);

            const TotalCount = await ProjectSchema.countDocuments({});

            const closureDelay = await ProjectSchema.find({
                status: "Running",
                endDate: { $lt: new Date() }
            }).countDocuments({});

            statusWiseCount.unshift( {
                _id:"Total",
                count:TotalCount
            });

            statusWiseCount.unshift({
                _id:"Closures Delay",
                "count":closureDelay
            })

        // console.log("statusWiseCount data is",statusWiseCount);


        res.status(200).json({
            success:true,
            message:"Sending you response",
            data:statusWiseCount,
        })
    } catch(err){
        console.log(err.message)
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}
