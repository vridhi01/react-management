import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const currentUser = localStorage.getItem("currentUser");
  // const { user } = useAuthState();
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
