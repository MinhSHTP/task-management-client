import { APP_PATH } from "@utils";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = {
  children: ReactNode;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const userJSONString = localStorage.getItem("user")?.toString() || null;

  const user = userJSONString ? JSON.parse(userJSONString) : null;
  return user ? children : <Navigate to={APP_PATH.LOGIN_ROUTE} />;
};

export default RequireAuth;
