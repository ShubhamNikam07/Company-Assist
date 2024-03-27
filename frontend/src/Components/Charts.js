import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import {Spinner} from "./Spinner";
import { useDispatch, useSelector } from "react-redux";

const Charts = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsFromRedux = useSelector((store)=>store.cardData.cardData);
  // console.log("cards from redux are ",cardsFromRedux);
  const newArr = [];
  const onlyVal = cardsFromRedux.map((data)=>{
    if(data._id != "Total")
    newArr.push(data.count);
  })

  const LabelArr = [];
  const onlyLabel = cardsFromRedux.map((data)=>{
      if(data._id != "Total"){
        LabelArr.push(data._id)
      }
  })

  console.log("new array data LAbels  is ",onlyLabel);

  // //console.log("totalValuesData we get is ",totalValuesData)

  let response = [];
  const getChartData = async()=>{
    const email = "shubhamnikamsn007@gmail.com"
    try{
      setLoading(false);
      const token = localStorage.getItem("token");
      const responseData = await axios.get(`http://localhost:4000/api/v1/getchartsdata?email=${email}`,{headers:`Bearer ${token}`})
      // //console.log("response is ",responseData.data.data);
      setDepartmentData(responseData.data.data);
      setLoading(true);
    } catch(err){
      // //console.log("we got an error");
      console.error(err.message);
    }
  }

  useEffect(() => {
  
    getChartData();
  }, []);

  // Ensure departmentData is an array before attempting to map
  if (!Array.isArray(departmentData) || departmentData.length === 0) {
    // console.error("Invalid or empty department data:", departmentData);
    return <div>Error: Invalid or empty data format</div>;
  }

  // Extract department names for x-axis labels
  const departmentLabels = departmentData.map((data) => data.department);

  // Extract total values for each department
  const totalValues = departmentData.map((data) => data.total);
  //console.log("closed values we get ",totalValues)
  // Extract closed values for each department
  const closedValues = departmentData.map((data) => data.closed);
  //console.log("closed values we get ",closedValues)

  return !loading?<Spinner/>: (
   <div className="w-full flex gap-6">
     <div className="mt-6 bg-white shadow-lg w-1/2 p-4 chart flex gap-6">
      <span className="text-xl">Departwise - Total vs Closed</span>
      <BarChart
        xAxis={[{ scaleType: "band", data: departmentLabels }]}
        series={[
          { data: totalValues, name: "Total", color: "purple", margin: "22px" },
          { data: closedValues, name: "Closed", color: "green" },
        ]}
        height={300}
        className="mt-6 chartdiagram w-full h-full"
      />
      </div>
      <div className="mt-6 bg-white shadow-lg w-1/2 p-4 chart flex gap-6">
      <span className="text-xl">StatusWise Project</span>
       <BarChart
        xAxis={[{ scaleType: "band", data: LabelArr }]}
        series={[
          { data: newArr, name: "Total", color: "purple", margin: "22px" }
        ]}
        height={300}
        className="mt-6 chartdiagram w-full h-full"
      />
       </div>
   </div>
  );
};

export { Charts };
