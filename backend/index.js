const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

const allRoutes = require("./routes/allRoutes");
app.use("/api/v1",allRoutes);


const dbConnection = require("./config/dbConnect");
dbConnection();


app.listen(port,()=>{
    console.log("connection made successfully at port ",port);
})
