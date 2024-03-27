import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import dashboardimg from "../assets/Dashboard.svg";
import createprojectimg from "../assets/create-project.svg";
import projectlist from "../assets/Project-list.svg";
import logout from "../assets/Logout.svg";
import { PrivatesRoutes } from "./common/PrivatesRoutes";

const AddEmployee = () => {
  const [isVisible,setisVisible] = useState(false);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    projectTheme: "",
    business: "For Business",
    type: "Internal",
    division: "Filter",
    category: "Quality A",
    priority: "High",
    department: "Stratergy",
    startDate: Date.now(),
    endDate: new Date().toLocaleString(),
    location: "Pune",
  });

  const [emptyTheme, setEmptyTheme] = useState(false);

  const saveProject = async () => {
    
    
    if (projectData.projectTheme === "") {
     
      setEmptyTheme(true);
      return;
    }
    if(projectData.startDate > projectData.endDate){
      console.log("inside the saveProject if")
      return;
    }
    try {
      projectData.email = "shubhamnikamsn007@gmail.com";
      const createProject = await axios.post(
        "http://localhost:4000/api/v1/createproject",
        { ...projectData }
      );
      console.log("the createProject value is ",createProject);
      if(!createProject.status){
        window.alert("unable to add your project")
      }
      window.alert("Added Project Successfully");
      navigate("/create-project");
      console.log("We saved the project", createProject);
    } catch (err) {
      setisVisible(!isVisible);
      window.alert("the priority always should be High")
      console.log("we got an error", err.message);
    }
  };

  const changeHandle = (e) => {
    setProjectData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    if (emptyTheme && e.target.id === "projectTheme") {
      setEmptyTheme(false);
    }
  };

  return (
    <div className="bg-white  flex flex-col items-center gap-4 addempform text-slate-500 rounded w-11/12 mx-auto p-6 -my-4 shadow-lg">
      <form className=" addform flex flex-col gap-4 w-full">
        <div className="flex justify-between w-full addempdiv ">
          <label className="flex flex-col gap-1 w-full projectthemediv">
            {/* <span className="text-gray-600 Projectthemespan">Project Theme</span> */}
            <input
              id="projectTheme"
              value={projectData.projectTheme}
              placeholder="Enter Project Theme"
              className={`border-2 pl-4  rounded-md w-9/12 h-20 ${
                emptyTheme ? "border-red-500" : ""
              }`}
              onChange={changeHandle}
            />
            {emptyTheme && (
              <span className="text-red-500">Project Theme is required</span>
            )}
          </label>
          <input
            className=" saveProjectbtn bg-[#035FB2] rounded-3xl text-white text-center w-32 h-8 px-4 self-center cursor-pointer"
            value={"Save Project"}
            onClick={saveProject}
          />
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-6 mainform">
          <label className="flex flex-col gap-1">
            <span className="text-gray-600"> Reason</span>
            <select
              value={projectData.business}
              id="business"
              className="border  border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="For Business" className="">
                For Business
              </option>
              <option value="For Dealership">For Dealership</option>
              <option value="For Personal">For Personal</option>
              <option value="For Transport">For Transport</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-gray-600"> Type</span>
            <select
              value={projectData.type}
              id="type"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Vendor">Vendor</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-gray-600"> Division</span>
            <select
              value={projectData.division}
              id="division"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="Compressor">Compressor</option>
              <option value="Filter">Filter</option>
              <option value="Glass">Glass</option>
              <option value="Pumps">Pumps</option>
              <option value="Water Heaters">Water Heaters</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-gray-600"> Category</span>
            <select
              value={projectData.category}
              id="category"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="Quality A">Quality A</option>
              <option value="Quality B">Quality B</option>
              <option value="Quality C">Quality C</option>
              <option value="Quality D">Quality D</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-600">Priority</span>
            <select
              value={projectData.priority}
              id="priority"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-600">Department</span>
            <select
              value={projectData.department}
              id="department"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="Maintainance">Maintainance</option>
              <option value="Stratergy">Stratergy</option>
              <option value="Finance">Finance</option>
              <option value="Quality">Quality</option>
              <option value="Stores">Stores</option>
              <option value="Stores">Human Resource</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className=" text-gray-600">
              Start Date as per project plan
            </span>
            <input
              id="startDate"
              value={projectData.startDate}
              type="date"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onChange={changeHandle}
            />
          </label>

          <label className={`flex flex-col gap-1 text-sm ${projectData.endDate < projectData.startDate ? '' : ''}`}>
  <span className="text-gray-600">End Date as per project plan</span>
  <input
    id="endDate"
    value={projectData.endDate}
    type="date"
    className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    onChange={changeHandle}
  />
  {projectData.endDate < projectData.startDate && (
    <span className="text-red-500">End Date should be greater than Start Date</span>
  )}
</label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-600">Location</span>
            <select
              value={projectData.location}
              id="location"
              className="border border-gray-400 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={changeHandle}
            >
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </label>
        </div>
      </form>
      <div className="self-end statusfiled mb-16 ">
        Status :
        <span className="text-base font-semibold ml-2">{"Registered"}</span>
      
      <input
            className=" saveProjectbtnbtm bg-[#035FB2] rounded-3xl text-white text-center w-32 h-8 px-4 self-center cursor-pointer"
            value={"Save Project"}
            onClick={saveProject}
          />
          </div>
          {isVisible?<span className="text-red-500">Unable To Add Your Project</span>:<></>}
    </div>
  );
};
export { AddEmployee };
