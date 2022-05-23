import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import FixedHours from "../FixedHours/index";
import Button from "@mui/material/Button";

const ProjectDetails: React.FC = () => {
  const location = useLocation();
  const projectDetailsData: any = location.state;
  const [fixedHours, setFixedHours] = useState(false);
  const handleFixedPriceCLick = () => {
    setFixedHours(true);
  };
  return (
    <>
      <FixedHours fixedHours={fixedHours} setFixedHours={setFixedHours} />
      <div className="text-left px-20 py-10 shadow-md h-full">
        <div className="flex justify-end">
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#21b6ae",
              color: "white"
            }}
            onClick={handleFixedPriceCLick}
          >
            Log Hours
          </Button>
        </div>
        <div className="grid grid-cols-2 ">
          <div className="mt-3">
            <label className="font-bold">Project Name</label>
            <div className="text-gray-500">
              {projectDetailsData.projectName}
            </div>
          </div>
          <div className="mt-3">
            <label className="font-bold">Client Name</label>
            <div className="text-gray-500">{projectDetailsData.clientName}</div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Project Link </label>
            <div>
              <a className="text-gray-500" href={projectDetailsData.link}>
                {projectDetailsData.link}
              </a>
            </div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Project Type</label>
            <div className="text-gray-500">
              {projectDetailsData.projectType}
            </div>
          </div>
          <div className="mt-3">
            <label className="font-bold">Project Rate</label>
            <div className="text-gray-500">{projectDetailsData.rate}</div>
          </div>
          <div className="mt-3">
            <label className="font-bold">Project Team</label>
            <div className="text-gray-500">{projectDetailsData.team}</div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Project Description</label>
            <div className="text-gray-500">
              {projectDetailsData.description}
            </div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Users</label>
            <div className="text-gray-500">
              {projectDetailsData.userData.map((text: any) => {
                return (
                  <>
                    <span>{text.userName}</span>
                  </>
                );
              })}
            </div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Created Date</label>
            <div className="text-gray-500">
              {projectDetailsData.createdDate}
            </div>
          </div>

          <div className="mt-3">
            <label className="font-bold">Ended Date</label>
            <div className="text-gray-500">
              {projectDetailsData.createdDate}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
