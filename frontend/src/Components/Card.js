import { Spinner } from "./Spinner";
import { useEffect, useState } from "react";
import { Charts } from "./Charts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateCards } from "./Redux/reducers/CardData";

const API_URL = "http://localhost:4000/api/v1/carddata";

const Card = () => {
  const [projectStatus, setProjectStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

 

  const initialProjectData = [
    { label: "Total Project", value: 10 },
    { label: "Closed", value: 10 },
    { label: "Running", value: 10 },
    { label: "Closures Delay", value: 10 },
    { label: "Cancelled", value: 10 },
    // Add more data as needed
  ];

  function assignVal(data,arr){
    console.log("getting data",data);
    console.log("iterating over array",arr)
    let returnedval = 0;
    arr.map((val)=>{
      if(data === "Total Project" && val._id === "Total"){
        // console.log("so passing value ",val.count)
        returnedval = val.count;}
      else if(data === "Closed" && val._id === "Closed"){
        // console.log("so passing value ",val.count)
        returnedval = val.count;}
     else if(data === "Running" && val._id === "Running"){
        // console.log("so passing value ",val.count)
        returnedval = val.count;}
      else if(data === "Cancelled" && val._id === "Cancelled"){
        returnedval = val.count;}
      else 
        return val?.count || 0;
      
    })
    return returnedval;
  }
  const [projectData, setProjectData] = useState([]);

  const setdataTorender = (arrData)=>{
    
    initialProjectData.map((data)=>{
      switch (data.label) {
        case "Total Project":
            data.value = assignVal("Total Project",arrData);
          break;
        case "Closed":
          data.value = assignVal("Closed",arrData);
          break;
        case "Running":
          data.value = assignVal("Running",arrData);
          break;      
        case "Cancelled":
          data.value = assignVal("Cancelled",arrData)
          break;
        default: 
        data.value = arrData[0].count || 0;
        break;
      }
    });
    
    // console.log("now initialProjectData is ",initialProjectData)
    setProjectData(initialProjectData);
    // console.log("useSate projectData is ",projectData)
    return initialProjectData;
  }

  const cardData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);
      console.log("repsone we get for card  is ",response.data.data);
      dispatch(updateCards(response.data.data))
      setProjectData(setdataTorender(response.data.data));
      // console.log("projectdata is set",projectData,loading);
      
      setLoading(false);
    } catch (err) {
      // console.error("Failed to fetch data:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cardData();
  }, []);

  return projectData.length == 0 ? (
    <Spinner />
  ) : (
    <div className="flex flex-col p-6  w-full carddiv ">
      <div className="flex gap-4 w-full overflow-hidden cards">
        {projectData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col rounded bg-white shadow-lg w-1/5 text-base insidecard p-3 border-l-4 border-l-blue-400 ">
              <span className=" cardname">{data.label}</span>
              <span className="text-3xl font-semibold w-1/2">{data.value}</span>
          </div>
        ))}
      </div>
      <Charts />
    </div>
  );
};

export { Card };