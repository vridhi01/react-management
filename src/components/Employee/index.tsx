import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AddProject from "./addEmployee";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listEmployee } from "../../redux/slice/employee/listEmployeeSlice";
import { RootState } from "../../redux/rootReducer";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteEmployee from "./deleteModalEmployee";
import { employeealldata } from "../../types/employee/index";
import EmployeeTable from "./employeeTable";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (state: RootState) => state.listEmployeeSlice
  );

  const deleteUserList = useSelector(
    (state: RootState) => state.deleteEmployeeSlice
  );
  const editEmployeeList = useSelector(
    (state: RootState) => state.editEmployeeSLice
  );

  const addEmployeesuccess = useSelector(
    (state: RootState) => state.addEmployeeSlice
  );

  useEffect(() => {
    if (addEmployeesuccess.employeeaddingSuccess) {
      console.log("kkkk");
      dispatch(listEmployee());
      setOpen(false);
    }
  }, [addEmployeesuccess.employeeaddingSuccess]);

  useEffect(() => {
    dispatch(listEmployee());
  }, []);

  useEffect(() => {
    if (deleteUserList.employeedeleteSuccess) {
      dispatch(listEmployee());
      setDeleteOpen(false);
    }
  }, [deleteUserList]);

  useEffect(() => {
    if (editEmployeeList.employeeeditingSuccess) {
      dispatch(listEmployee());
      setEdit(false);
      setOpen(false);
    }
  }, [editEmployeeList.employeeeditingSuccess]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({} as employeealldata);
  const [deleteid, setDeleteId] = useState({} as string);
  const [deleteopen, setDeleteOpen] = useState(false);
  const handleCardClick = (data: any) => {
    setOpen(true);
    setEditData(data);
    setEdit(true);
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteId(userId);
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

        <AddProject
          edit={edit}
          editData={editData}
          open={open}
          setOpen={setOpen}
        />
      </div>
      {employeeList?.isemployeelistloading == true ? (
        <CircularProgress />
      ) : (
        <>
          {employeeList && employeeList.employeeData && (
            <EmployeeTable
              employeedata={employeeList.employeeData}
              handleCardClick={handleCardClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}

          <DeleteEmployee
            deleteopen={deleteopen}
            setDeleteOpen={setDeleteOpen}
            deleteid={deleteid}
          />
        </>
      )}
    </>
  );
};
export default Index;
