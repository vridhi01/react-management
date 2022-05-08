import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { ToastContainer } from "react-toastify";
import AddProject from "./addProject";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listProject } from "../../redux/slice/project/listProjectSlice";
import { RootState } from "../../redux/rootReducer";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProject from "./deleteModalProject";
import EditIcon from "@mui/icons-material/Edit";
import { listEmployee } from "../../redux/slice/employee/listEmployeeSlice";

export interface projectalldata {
  projectName: string;
  link: string;
  description: string;
  rate: string;
  team: string;
  createdDate: string;
  projectType: string;
  projectid: string;
  userData: any;
}

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const projectList = useSelector((state: RootState) => state.listProjectSlice);
  const deleteProductList = useSelector(
    (state: RootState) => state.deleteProjectSlice
  );
  const editProductList = useSelector(
    (state: RootState) => state.editProjectSlice
  );

  useEffect(() => {
    dispatch(listProject());
    dispatch(listEmployee());
  }, []);

  useEffect(() => {
    if (deleteProductList.projectdeleteSuccess == true) {
      dispatch(listProject());
      setDeleteOpen(false);
    }
  }, [deleteProductList.projectdeleteSuccess]);

  useEffect(() => {
    if (editProductList.projecteditingSuccess == true) {
      dispatch(listProject());
      setEdit(false);
      setOpen(false);
    }
  }, [editProductList.projecteditingSuccess]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({} as projectalldata);
  const [deleteid, setDeleteId] = useState({} as string);
  const [deleteopen, setDeleteOpen] = useState(false);
  const handleCardClick = (data: any) => {
    setOpen(true);
    setEditData(data);
    setEdit(true);
  };

  const handleDeleteClick = (projectid: string) => {
    setDeleteId(projectid);
    setDeleteOpen(true);
  };

  useEffect(() => {
    if (open === false) {
      setEdit(false);
    }
  }, [open]);
  return (
    <>
      <div className="flex justify-end p-5">
        <AddProject
          edit={edit}
          editData={editData}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {projectList?.isprojectlistloading == true ? (
        <CircularProgress />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 m-8 gap-4">
          {projectList &&
            projectList.projectData &&
            projectList?.projectData?.map((data: projectalldata) => {
              return (
                <>
                  <div className="shadow-md rounded font-medium  p-5 my-5">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-black text-left font-bold">
                          {data.projectName}
                        </div>
                        <div className="text-black text-left text-xs contents">
                          {data.projectType}
                        </div>
                      </div>{" "}
                      <div className="flex justify-between">
                        <div className="font-light text-sm text-left py-1 text-gray-500">
                          {data.createdDate}
                        </div>
                        <div className="font-light text-xs text-left  text-gray-500">
                          {data.rate}
                        </div>
                      </div>
                      <div className="font-light text-sm text-left">
                        {data.description}
                      </div>
                      <div className="font-light text-xs text-left py-2">
                        <a target="_blank" href={data.link} rel="noreferrer">
                          {data.link}
                        </a>
                      </div>
                      <div className="font-light text-sm text-left ">
                        {data.team}
                      </div>
                      {data?.userData?.map((text: any) => {
                        return (
                          <>
                            <div className="font-light text-xs text-left py-2">
                              {text.userName}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <DeleteProject
                      deleteopen={deleteopen}
                      setDeleteOpen={setDeleteOpen}
                      deleteid={deleteid}
                    />
                    <div className="flex justify-end">
                      <div
                        onClick={() => handleCardClick(data)}
                        key={data.projectid}
                      >
                        {" "}
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div
                        onClick={() => {
                          handleDeleteClick(data.projectid);
                        }}
                      >
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
};
export default Index;
