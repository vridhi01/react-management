import React from "react";
import "./App.css";
import Login from "./Component/auth/login";
import Registration from "./Component/auth/registration";
import Project from "../src/Component/Projects/index";
import ResetPassword from "./Component/auth/resetpassword";
import { Routes, Route } from "react-router-dom";
import Home from "../src/Pages/home";
import AdminLayout from "./layout";

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
          <Route path="registration" element={<Registration />} />
          <Route
            path="/projects"
            element={
              <AdminLayout>
                <Project />
              </AdminLayout>
            }
          />
          <Route path="/forgot_password" element={<ResetPassword />} />
          <Route
            path="/Home"
            element={
              <AdminLayout>
                <Home />
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
