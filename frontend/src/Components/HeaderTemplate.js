import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import logout from "../assets/Logout.svg"
import { Link } from "react-router-dom";
import rightside from "../assets/back arrow.svg"

const HeaderTemplate = (props) => {
  const { heading } = props;
  const navigate = useNavigate();
  return (
    <div className="creteemphead mainhead flex h-1/6 ">
      {heading !== "Dashboard" ? (
        <div className="flex items-center headernotdashboard">
            <div className="flex gap-5 items-center pl-40">
            <img src={rightside} className="font-bold w-2 cursor-pointer " onClick={()=>navigate(-1)}/>
            <span className="text-xl font-bold">{heading}</span>
              </div>
            <Link to={"/"} className="logoutbtnup" onClick={()=>{localStorage.removeItem("token")}}><img src={logout} className="w-8 "/></Link>
        </div>
      ) : (
        <div className="flex justify-between items-center pl-4 ">
          <span className="text-xl font-semibold">{heading}</span>
          <Link to={"/"} className=" logoutbtnup " onClick={()=>{localStorage.removeItem("token")}}><img src={logout} className="w-8 "/></Link>
        
        </div>
      )}
       <img src={logo} className="mx-auto w-16 logo-image self-center" />
    </div>
  );
};

export { HeaderTemplate };
