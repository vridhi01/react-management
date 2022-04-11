import React from "react";

interface dataSet {
  open: boolean;
}

const EditProject: React.FC<dataSet> = (props) => {
  console.log(props);
  return (
    <>
      <div>hello world</div>
    </>
  );
};

export default EditProject;
