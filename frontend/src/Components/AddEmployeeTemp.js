import { Navbar } from "./Navbar";
import { HeaderTemplate } from "./HeaderTemplate";
import { Outlet, useLocation } from "react-router-dom";
import { Card } from "./Card";
import dashboardimg from "../assets/Dashboard.svg";
import createprojectimg from "../assets/create-project.svg";
import createprojectimgActive from "../assets/create-project-active.svg";
import projectlist from "../assets/Project-list.svg";
import projectlistActive from "../assets/Project-list-active.svg"
import logout from "../assets/Logout.svg";
import { Link } from "react-router-dom";
import { PrivatesRoutes } from "./common/PrivatesRoutes";
import { AddEmployee } from "./AddEmployee";
const AddEmployeeTemp = () => {

  const location = useLocation();
  const path = location.pathname;
  console.log("my path anme is ",path);

   const heading = "Create Project"
  return (
    <div className="flex w-full">
      <div className="flex p-4  w-1/12 createprojectnav flex-col justify-center items-center h-screen gap-6 relative z-50">
        <Link to={"/dashboard"}>
          <img src={dashboardimg} className="w-8 active" />
        </Link>

        <PrivatesRoutes
          component={
            <Link to={"/project-listing"}>
              {path !=="/project-listing"?<img src={projectlist} className="w-8" />:<img src={projectlistActive} className="w-8"/>}
            </Link>
          }
        />

        <PrivatesRoutes
          component={
            <Link to={"/create-project"}>
              {path === "create-project"?<img src={createprojectimg} className="w-8 border-t-2 pt-4" />:<img src={createprojectimgActive} className="w-8 border-t-2 pt-4" />}
            </Link>
          }
        />

        <Link
          to={"/"}
          className="absolute bottom-3 logoutbtn"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <img src={logout} className="w-8 " />
        </Link>
      </div>
      <div className="w-full flex flex-col bg-slate-100 gap-10">
        <HeaderTemplate heading={heading} />
        <AddEmployee />
        <div className="addempsmall">
        <Link to={"/dashboard"}>
          <img src={dashboardimg} className="w-8 active" />
        </Link>

        <PrivatesRoutes
          component={
            <Link to={"/project-listing"}>
              <img src={projectlist} className="w-8" />
            </Link>
          }
        />

        <PrivatesRoutes
          component={
            <Link to={"/create-project"}>
              <img src={createprojectimg} className="w-8" />
            </Link>
          }
        />

        <Link
          to={"/"}
          className="absolute bottom-3 logoutbtn"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <img src={logout} className="w-8 " />
        </Link>
      </div>
      </div>
    </div>
  );
};

export { AddEmployeeTemp };
