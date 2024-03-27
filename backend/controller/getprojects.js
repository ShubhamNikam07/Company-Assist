const userSchema = require("../model/user");
const projectDetailsSchema = require("../model/projectData");

exports.getAllProjects = async (req, res) => {
  try {
    const email = req.query.email;

    const userInfo = await userSchema.findOne({ email: email });
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    
    const projectDetailsUpdated = await projectDetailsSchema.find({
      id: userInfo._id,
    }).select('projectTheme business type division category priority department location status startDate endDate');


    return res.status(200).json({
      success: true,
      projectDetailsUpdated,
    });
  } catch (err) {
    console.log("error we got ",err.message)
    return res.status(500).json({
      success: false,
      message: "some errorn occured ",
      error: err.message,
    });
  }
};
