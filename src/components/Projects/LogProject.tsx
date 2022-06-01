import React from "react";

const LogProject = ({ projectLogData }: any) => {
  console.log(projectLogData, "props");
  return (
    <>
      {" "}
      <div className="my-inventory-comment bg-white p-3 mt-4">
        <h6> Recent Logs</h6>
        <ul>
          {projectLogData?.map((datas: any) => {
            return (
              <>
                <li>
                  <span className="thumb-xs pull-left mr-sm">
                    <div>{datas?.timepicker}</div>
                  </span>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default LogProject;
