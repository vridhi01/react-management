import React from "react";
import "./App.css";
import Login from "./Pages/login";
import Registration from "./Pages/registration";
import AddProject from "./Pages/addProject";
import { Routes, Route } from "react-router-dom";
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
          <Route path="/projects" element={<AddProject />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
