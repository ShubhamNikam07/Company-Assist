import dashboardimg from "../assets/Dashboard.svg";
import dashboardimgActive from "../assets/Dashboard-active.svg";
import createprojectimg from "../assets/create-project.svg";
import createprojectimgActive from "../assets/create-project-active.svg";
import projectlist from "../assets/Project-list.svg";
import projectlistActive from "../assets/Project-list-active.svg"
import logout from "../assets/Logout.svg";
import { Link, useLocation } from "react-router-dom";
import { PrivatesRoutes } from "./common/PrivatesRoutes";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log("my path anme is ",path)
  return (
    <div className="navbar w-1/12 flex flex-col justify-center items-center h-screen gap-6 relative">
      <Link to={"/dashboard"}>{path !=="/dashboard"?<img src={dashboardimg} className="w-8 active" />:<img src={dashboardimgActive} className="w-8 active "/>}</Link>
      
      <PrivatesRoutes
        component={<Link to={"/project-listing"}>{path !== "/project-listing"?<img src={projectlist} className="w-8" />:<img src={projectlistActive} className="w-8" />}</Link>}
      />
      
      <PrivatesRoutes
        component={<Link to={"/create-project"}>{path !== "/create-project"?<img src={createprojectimg} className="w-8 border-t-2 pt-4 createprojectsmall" />:<img src={createprojectimgActive} className="w-8 border-t-2 pt-4 createprojectsmall" />}</Link>}
      />

      <Link to={"/"} className="absolute bottom-3 logoutbtn" onClick={()=>{localStorage.removeItem("token")}}><img src={logout} className="w-8 "/></Link>
    </div>
  );
};

export { Navbar };
