import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { SearchListing } from "./SearchListing";
import { FaTimes } from "react-icons/fa";
import { updateProjectData } from "./Redux/reducers/projectDataReducer";

const ProjectListing = () => {
  const [search, setSearch] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 0,
  });
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.projectData.projectData);
  const selectorSearch = selector;
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    const email = "shubhamnikamsn007@gmail.com";

    try {
      const projectDetails = await axios.get(
        `http://localhost:4000/api/v1/getprojects?email=${email}`
      );

      const newProjects = projectDetails.data.projectDetailsUpdated;
      dispatch(updateProjectData(newProjects));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const searchHandle = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    searchInList(searchValue);
  };

  const handleClearSearch = () => {
    setSearch("");
    getAllProjects();
  };

  const searchInList = (searchValue) => {
    const searchFields = ['projectTheme', 'business', "type", "department", 'division', 'priority', "category", "status", "location"];

    const filteredData = selector.filter((data) => {
      for (const field of searchFields) {
        const dataField = data[field];
        const lowerCaseDataField = dataField && dataField.toLocaleLowerCase();
        const lowerCaseSearchVal = searchValue.toLocaleLowerCase();
        if (lowerCaseDataField && lowerCaseDataField.includes(lowerCaseSearchVal)) {
          return true;
        }
      }
      return false;
    });

    // console.log("we don't get search value ", searchValue);
    // console.log("filteredData value is ", filteredData);
    // console.log("type of filterdata is ",filteredData.length);
    if(!filteredData.length){
      handleClearSearch();
    }

    setProjects(filteredData);
    dispatch(updateProjectData(filteredData));
  };

  
 

  const changeHandle = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "All") {
      getAllProjects();
    } else {
      const sortedData = [...selector].sort((a, b) => {
        const valueA = a[selectedValue] || "";
        const valueB = b[selectedValue] || "";
        return valueA.localeCompare(valueB);
      });

      setProjects(sortedData);
      dispatch(updateProjectData(sortedData));
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    setProjects(selector);
  }, [selector]);

  return !projects.length ? (
    <Spinner/>
  ) : (
    <div className="ml-4 -mt-2 rounded-xl h-screen shadow-2xl projectlistindiv">
      <div className="flex justify-between px-2 searchdivsmall ">
        <div className="projectlistinginput relative flex items-center border-b-2 mb-4 border-b-slate-100 ml-4 mt-3 ">
          <FiSearch className="absolute left-3 mt-4 projectlistinginputicon" />
          <input
            type="text"
            id="search"
            value={search}
            placeholder="Search"
            className="border-b-2 border-slate-300 p-2 pl-5 ml-4 outline-none mt-4 projectlistinginputsearch"
            onInput={searchHandle}
          />
        </div>
        <label className="flex items-center gap-2 justify-between ">
          <p className="opacity-65 smalllabelsortlabel">Sort By:</p>
          <select className="bg-white p-2 text-base smalllabelsort" onChange={changeHandle}>
            <option value="All" className="options">All</option>
            <option value="priority" className="options">Priority</option>
            {/* <option value="lastModified" className="options">Recently modified</option> */}
            <option value="startDate" className="options">Start Date</option>
            <option value="endDate" className="options">End Date</option>
          </select>
        </label>
      </div>
      <table className="w-full rounded-lg ">
        <thead className="bg-blue-50 tablehead">
          <tr className="searchtable ">
            <th className="py-3 font-medium opacity-65">Project Name</th>
            <th className="py-3 font-medium opacity-65">Type</th>
            <th className="py-3 font-medium opacity-65">Division</th>
            <th className="py-3 font-medium opacity-65">Category</th>
            <th className="py-3 font-medium opacity-65">Priority</th>
            <th className="py-3 font-medium opacity-65">Reason</th>
            <th className="py-3 font-medium opacity-65">Dept.</th>
            <th className="py-3 font-medium opacity-65">Location</th>
            <th className="py-3 font-medium opacity-65">Status</th>
            <th></th>
          </tr>
        </thead>
        <SearchListing project={projects} />
      </table>
    </div>
  );
};

export { ProjectListing };
