import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../redux/slice/project/deleteProjectSlice";

type deleteData = {
  deleteopen: boolean;
  deleteid: string;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const deleteModalProject = ({
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
      deleteProject({
        projectId: deleteid
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
        style={{ backgroundColor: "transparent" }}
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

export default deleteModalProject;
