import React from "react";
import "./App.css";
import Login from "./components/auth/login";
import Registration from "./components/auth/registration";
import Project from "./components/Projects/index";
import ResetPassword from "./components/auth/resetpassword";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AdminLayout from "./layout/index";
import PrivateRoute from "./components/PrivateRoute";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgot_password" element={<ResetPassword />} />
          <Route path="registration" element={<Registration />} />
          <Route
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="projects" element={<Project />} />
            <Route path="Home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
