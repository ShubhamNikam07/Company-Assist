import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectData } from "./Redux/reducers/projectDataReducer";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PAGE_SIZE = 5;

const SearchListing = () => {
  const selector = useSelector((store) => store.projectData.projectData);
  const [project, setProject] = useState(selector);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setProject(selector);
  }, [selector]);

  const changeStatus = async (status, projectTheme) => {
    const data = {
      email: "shubhamnikamsn007@gmail.com",
      status: status,
      projectTheme: projectTheme,
    };

    try {
      console.log("the selector data is ");
      const projectData = selector.filter((data)=>{
        return data.projectTheme === projectTheme
      });
      if(projectData[0].status === "Closed"){
        return console.log("we cannot chnage your status")
      }

      // if(){
      //   return console.log("cannot change your status");
      // }
      const statusResult = await axios.put(
        "http://localhost:4000/api/v1/checkstatus",
        data
      );

      // Update local state
      const updatedProject = project.map((p) =>
        p.projectTheme === projectTheme
          ? { ...p, status: statusResult.data.message.status }
          : p
      );
      setProject(updatedProject);

      // Dispatch the action to update the Redux store
      dispatch(updateProjectData(updatedProject));
    } catch (err) {
      console.error("Caught error", err.message);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedProjects = project.slice(startIndex, endIndex);

  return (
    <>
      <tbody className="w-full text-slate-600 projectlistingsmall bg-slate-100 rounded-lg ">
        {displayedProjects.map((data) => (
          <tr
            key={data.projectTheme}
            className="p-4 searchtable bg-white border-b-2 border-b-slate-100"
          >
            <td className="flex flex-col gap-2 justify-start flex-wrap pl-4">
              <div className="flex justify-between">
                <span className="font-medium projectnamesmall">
                  {data?.projectTheme}
                </span>
                <span className="smalllabel">{data?.status}</span>
              </div>
              <span className="text-sm datesmall">{`${new Date(data?.startDate)
                .toDateString()
                .slice(4)} to ${new Date(data?.endDate)
                .toDateString()
                .slice(4)}`}</span>
            </td>
            <td>
              <span className="smalllabel text-slate-400">Reason</span>
              {data?.business}
            </td>
            <td>
              <span className="smalllabel text-slate-400">Type</span>
              {data?.type}
            </td>
            <td>
              <span className="smalllabel text-slate-400">Category</span>
              {data?.category}
            </td>
            <td>
              <span className="smalllabel text-slate-400">Location</span>
              {data?.location}
            </td>
            <td>
              <span className="smalllabel text-slate-400">priority</span>
              {data?.priority}
            </td>
            <td>
              <span className="smalllabel text-slate-400">Dept</span>
              {data?.department}
            </td>
            <td className="text-center locationtd ">
              <span className="smalllabel text-slate-400">location</span>
              {data?.location}
            </td>
            <td className="projectstatusbig">
              <span className="smalllabel text-slate-400">Status</span>
              {data?.status}
            </td>
            {/* ... */}
            <td className="text-[#035FB2] startclosecancelbtn flex gap-4 items-center text-center p-4 justify-center">
              <span
                className="bg-[#035FB2] border-2 text-white px-4 py-1 rounded-3xl cursor-pointer"
                onClick={() => changeStatus("Running", data?.projectTheme)}
              >
                Start
              </span>
              <span
                className="border-[#035FB2] border-2 px-4 rounded-3xl py-1 cursor-pointer"
                onClick={() => changeStatus("Closed", data?.projectTheme)}
              >
                Close
              </span>
              <span
                className="border-[#035FB2] border-2 px-4 rounded-3xl py-1 cursor-pointer"
                onClick={() => changeStatus("Cancelled", data?.projectTheme)}
              >
                Cancel
              </span>
            </td>
          </tr>
        ))}
      </tbody>
     { selector.length>5?<>
        <td className="pagi"></td>
        <td></td>
        <td className="text-right pagi ">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft className="text-xl cursor-pointer text-right mt-6 " />
          </button>
        </td>
        <td className="pagi text-center">
          <span className=" rounded-full p-1">{currentPage}</span>
        </td>
        <td className="text-center pagi">. . . . . .</td>
        <td className="text-left cursor-pointer pagi">
          <span className="p-1 rounded-full">
            {Math.ceil(project.length / PAGE_SIZE)}
          </span>
        </td>
        <td className="text-left pagi">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(project.length / PAGE_SIZE))
              )
            }
            disabled={currentPage === Math.ceil(project.length / PAGE_SIZE)}
          >
            <MdKeyboardArrowRight className="text-xl cursor-pointer my-auto" />
          </button>
        </td>
      </>:<></>}
    </>
  );
};

export { SearchListing };
