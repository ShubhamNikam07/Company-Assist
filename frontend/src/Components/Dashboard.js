import { Navbar } from "./Navbar";
import { HeaderTemplate } from "./HeaderTemplate";
import { Outlet, useLocation } from "react-router-dom";
import { Card } from "./Card";
const Dashboard = () => {
  const outletData = useLocation();
  let heading = "Dashboard";
  if (outletData) {
    heading =
      outletData.pathname === "/dashboard/create-project"
        ? "Create Project"
        :outletData.pathname === "/dashboard"
        ? "Dashboard"
        : "Project Listing";
  }
  return (
    <div className="flex w-full h-screen dashboard">
      <Navbar />
      <div className="w-full flex flex-col bg-slate-100">
        <HeaderTemplate heading={heading} />
        <Card/>
      </div>
      
    </div>
  );
};

export { Dashboard };
