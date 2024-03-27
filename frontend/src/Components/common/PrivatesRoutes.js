import { Navigate } from "react-router-dom";

const PrivatesRoutes = (props) => {
    const token = localStorage.getItem("token");
  const {component}  = props;
  return (token?component:<Navigate to="/"/>);
};
export { PrivatesRoutes };
