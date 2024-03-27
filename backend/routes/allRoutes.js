const express = require("express");
const router = express.Router();
const {userLogin} = require("../controller/loginUser");
const {createproject} = require("../controller/createProject");
const {getAllProjects} = require("../controller/getprojects");
const {getCardData} = require("../controller/getCardData");
const {changeStatus} = require("../controller/changeStatus");
const { getChartsdata } = require("../controller/getChartsdata");

router.post("/login",userLogin);
router.post("/createproject",createproject);
router.get("/getprojects",getAllProjects);
router.get("/carddata",getCardData);
router.put("/checkstatus",changeStatus);
router.get("/getchartsdata",getChartsdata)

module.exports = router;