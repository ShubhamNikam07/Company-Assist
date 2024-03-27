import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/Store";
import { Card } from "./Components/Card";
import { PrivatesRoutes } from "./Components/common/PrivatesRoutes";
import { ProjectListingTemp } from "./Components/ProjectListingTemp";
import { AddEmployeeTemp } from "./Components/AddEmployeeTemp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <PrivatesRoutes component={<Dashboard />} />,
  },
  {
    path: "/card",
    element: <PrivatesRoutes component={<Card />} />,
  },
  {
    path: "/create-project",
    element: <PrivatesRoutes component={<AddEmployeeTemp />} />,
  },
  {
    path: "/project-listing",
    element: <PrivatesRoutes component={<ProjectListingTemp />} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
