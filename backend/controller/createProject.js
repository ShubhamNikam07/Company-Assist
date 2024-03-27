const createProjectSchema = require("../model/projectData");
const userSchema = require("../model/user");

exports.createproject = async (req, res) => {
  try {
    const {
      projectTheme,
      business,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      email
    } = req.body;

    if(priority != "High"){
      return res.status(400).json({
        status:false,
        message:"the value fo priority always High"
      })
    }

    const userInfo = await userSchema.findOne({email:email});
    console.log("stored the  db",userInfo)
    
    if(!userInfo){
        return res.status(404).json({ message: `we got error ${err.message}` });
    }

    const projectData = await createProjectSchema.create({
      id:userInfo._id,
      projectTheme: projectTheme,
      business: business,
      type: type,
      division: division,
      category: category,
      priority: priority,
      department: department,
      startDate: startDate,
      endDate: endDate,
      location: location,
    });
    console.log("saved project entry ",projectData);

    return res.status(200).json({
        success:true,
        message:"successfully saved the entry in database"
    });
  } catch (err) {
    res.status({ message: `we got error ${err.message}` });
  }
};
