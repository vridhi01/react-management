import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../context/AppContextData";

const PrivateRoute = ({ children }: any) => {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
