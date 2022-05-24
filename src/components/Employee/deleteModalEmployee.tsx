import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../redux/slice/employee/deleteEmployeeSlice";
import { deleteData } from "../../types/employee/index";

const deleteModalEmployee = ({
  deleteopen,
  setDeleteOpen,
  deleteid
}: deleteData) => {
  const handleClose = () => {
    setDeleteOpen(false);
  };
  const dispatch = useDispatch();

  const deleteHandleClick = () => {
    dispatch(
      deleteEmployee({
        userId: deleteid
      })
    );
  };

  return (
    <div>
      <Dialog
        open={deleteopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}> No</Button>
          <Button onClick={deleteHandleClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default deleteModalEmployee;
