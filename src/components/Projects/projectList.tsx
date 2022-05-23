import React from "react";
import { listprojectData } from "../../types/projects/index";
import Delete from "../../assests/delete.svg";
import Edit from "../../assests/edit.svg";

import { useNavigate } from "react-router-dom";

const ProjectList = (props: listprojectData) => {
  const { projectData, handleProjectCardClick, handleProjectDeleteClick } =
    props;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-10 justify-center">
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center overflow-hidden">
            <div className="w-full  justify-center">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Team</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-center">Rate</th>
                      <th className="py-3 px-6 text-center">Created Date</th>
                      <th className="py-3 px-6 text-center">Users</th>
                      <th className="py-3 px-6 text-center">Client</th>
                      <th className="py-3 px-6 text-center">Type</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {projectData.map((projectObject) => {
                      const {
                        createdDate,
                        projectName,
                        projectType,
                        rate,
                        team,
                        projectid,
                        clientName
                      } = projectObject;
                      return (
                        <tr
                          key={projectid}
                          className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate("/project_details", {
                              state: projectObject
                            });
                          }}
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">{team}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center text-gray-500">
                              <span>{projectName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center text-gray-500">
                              <span>{rate}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center text-gray-500">
                              <span>{createdDate}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center flex-col text-gray-500">
                              {projectObject?.userData.map((text: any) => {
                                return (
                                  <>
                                    <span>{text.userName}</span>
                                  </>
                                );
                              })}
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center text-gray-500">
                              <span>{clientName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            {projectType == "fixed Price" ? (
                              <button className="bg-purple-200 text-purple-600 py-1 px-3 hover:bg-purple-300 rounded-full text-xs">
                                {projectType}
                              </button>
                            ) : (
                              <button className="bg-yellow-200 text-yellow-600 py-1 px-3 hover:bg-yellow-300 rounded-full text-xs">
                                {projectType}
                              </button>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() => {
                                  handleProjectDeleteClick(projectid);
                                }}
                              >
                                <img src={Edit} />
                              </div>
                              <div
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() =>
                                  handleProjectCardClick(projectObject)
                                }
                                key={projectid}
                              >
                                <img src={Delete} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
