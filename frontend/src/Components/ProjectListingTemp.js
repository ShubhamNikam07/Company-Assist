import { Navbar } from "./Navbar";
import { HeaderTemplate } from "./HeaderTemplate";
import { Card } from "./Card";
import { useLocation } from "react-router-dom";
import { ProjectListing } from "./ProjectListing";

const ProjectListingTemp = () => {
  const outletData = useLocation();
  let heading = "Dashboard";
  if (outletData) {
    heading =
      outletData.pathname === "/dashboard/create-project"
        ? "Create Project"
        : outletData.pathname === "/dashboard"
        ? "Dashboard"
        : "Project Listing";
  }
  return (
    <div className="flex w-full h-screen relative ">
      <Navbar />
      <div className="flex flex-col projectlisttempheader w-full bg-slate-100">
        <HeaderTemplate heading={heading} />
        <ProjectListing />
      </div>
    </div>
  );
};

export { ProjectListingTemp };
