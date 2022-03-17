import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

const AddProject: React.FC = () => {
  const [projectDetails, setProjectDetails] = useState({
    Name: "",
    Username: "",
    Description: "",
    Team: "",
    Link: "",
    errorStatus: false,
    Rate: "",
    errorMessage: "",
    successStatus: false,
    successMessage: ""
  });
  const teamDetails = [
    "nodejs",
    "angular",
    "react",
    "reactNative",
    "flutter",
    "python",
    "magento"
  ];

  const handleProject = (e: any) => {
    const { name, value } = e.target;
    setProjectDetails({
      ...projectDetails,
      [name]: value
    });
  };

  const submitProject = async (e: any) => {
    e.preventDefault();
    try {
      if (projectDetails) {
        const data = {
          ProjectName: projectDetails.Name,
          UserName: projectDetails.Username,
          Description: projectDetails.Description,
          Team: projectDetails.Team,
          Link: projectDetails.Link,
          Rate: projectDetails.Rate
        };
        const projecRef = collection(db, "Projects");
        await setDoc(doc(projecRef, "projectData"), {
          data
        });
        setProjectDetails({
          ...projectDetails,
          successStatus: true,
          successMessage: "Project Successfully submitted"
        });
      }
    } catch (error: any) {
      setProjectDetails({
        ...projectDetails,
        errorStatus: true,
        errorMessage: error.message
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Add project Details</h3>
        {projectDetails.errorStatus ? (
          <div>{projectDetails.errorMessage}</div>
        ) : null}
        {projectDetails.successStatus ? (
          <div>{projectDetails.successMessage}</div>
        ) : null}
        <form action="">
          <div className="mt-4">
            <div className="mt-4">
              <label className="block">Project Name</label>
              <input
                type="text"
                placeholder="Project Name"
                name="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleProject(e);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block">User Name</label>
              <input
                type="text"
                placeholder="User Name"
                name="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleProject(e);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block"> Project Description</label>
              <input
                type="text"
                placeholder="Description"
                name="Description"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleProject(e);
                }}
              />
            </div>

            <div className="mt-4">
              <label className="block">Project Link</label>
              <input
                type="text"
                placeholder="Link"
                name="Link"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleProject(e);
                }}
              />
            </div>

            <div className="mt-4">
              <label className="block">Rate</label>
              <input
                type="text"
                placeholder="Rate"
                name="Rate"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleProject(e);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block">Team</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="Team"
                onChange={(e) => {
                  handleProject(e);
                }}
              >
                <option value="selectedvalue">Please Select</option>
                {teamDetails.map((team, key) => {
                  return (
                    <>
                      <option key={key} value={team}>
                        {team}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>

            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={submitProject}
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
