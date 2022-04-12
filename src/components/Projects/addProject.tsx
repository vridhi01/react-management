import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addProject } from "../../redux/slice/project/addProjectSlice";
import { listProject } from "../../redux/slice/project/listProjectSlice";
import { editProject } from "../../redux/slice/project/editProjectSLice";
import { projectalldata } from "./index";

const validationSchema = yup.object({
  projectName: yup.string().required("name is required"),
  Description: yup.string().required("Description is required"),
  Link: yup.string().required("Link is required"),
  Rate: yup.string().required("Rate is required"),
  Team: yup.string().required("team is required"),
  projectType: yup.string().required("projecttype is required"),
  createdDate: yup.string().required("date is required")
});

type Props = {
  editData: projectalldata | null;
  open: boolean;
  edit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddProject = ({ edit, editData, open, setOpen }: Props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [iseditItem, setIsEditItem] = useState<null | projectalldata>();

  useEffect(() => {
    if (edit) {
      setIsEditItem(editData);
    }
  }, [edit]);

  const addProjectsuccess = useSelector(
    (state: RootState) => state.addProjectSlice
  );
  useEffect(() => {
    if (addProjectsuccess.projectaddingSuccess == true) {
      dispatch(listProject());
      setOpen(false);
    }
  }, [addProjectsuccess.projectaddingSuccess]);

  const handleClose = () => {
    setOpen(false);
    setIsEditItem(null);
  };
  const teamDetails = [
    "nodejs",
    "angular",
    "react",
    "reactNative",
    "flutter",
    "python",
    "magento"
  ];
  const prodjectType = ["fixed Price", "Hourly Based"];

  const dispatch = useDispatch();

  const initialValues = {
    projectName: iseditItem?.projectName || "",
    Description: iseditItem?.description || "",
    Link: iseditItem?.link || "",
    Rate: iseditItem?.rate || "",
    createdDate: iseditItem?.createdDate || "",
    projectType: iseditItem?.projectType || "fixed Price",
    Team: iseditItem?.team || "nodejs",
    projectid: iseditItem?.projectid || ""
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "#21b6ae",
          color: "white"
        }}
      >
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {edit ? (
          <DialogTitle className="text-center">
            {" "}
            Edit project Details
          </DialogTitle>
        ) : (
          <DialogTitle className="text-center">
            {" "}
            Add project Details
          </DialogTitle>
        )}

        <Formik
          initialValues={initialValues} // this changes over time but still values don't get changed
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            dispatch(
              edit
                ? editProject({
                    projectName: values.projectName,
                    projectType: values.projectType,
                    createdDate: values.createdDate,
                    Description: values.Description,
                    Link: values.Link,
                    Rate: values.Rate,
                    Team: values.Team,
                    projectId: values.projectid
                  })
                : addProject({
                    projectName: values.projectName,
                    projectType: values.projectType,
                    createdDate: values.createdDate,
                    Description: values.Description,
                    Link: values.Link,
                    Rate: values.Rate,
                    Team: values.Team
                  })
            );
          }}
        >
          {({
            values,
            touched,
            handleChange,
            handleSubmit,
            errors,
            ...rest
          }) => {
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <div className="mt-2 grid grid-cols-2 gap-8">
                      <div>
                        <label className="block">Project Name</label>
                        <TextField
                          type="text"
                          placeholder="Project Name"
                          name="projectName"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={values.projectName}
                          error={
                            touched.projectName && Boolean(errors.projectName)
                          }
                        />
                        <p className="text-red-600 text-xs">
                          {touched.projectName && errors.projectName}
                        </p>
                      </div>

                      <div>
                        <label className="block"> Project Type</label>
                        <Select
                          className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="projectType"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={values.projectType}
                          error={
                            touched.projectType && Boolean(errors.projectType)
                          }
                        >
                          {prodjectType.map((team, key) => {
                            return (
                              <MenuItem key={key} value={team}>
                                {team}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <p className="text-red-600 text-xs">
                          {touched.projectType && errors.projectType}
                        </p>
                      </div>

                      <div>
                        <label className="block">Project Link</label>
                        <TextField
                          type="text"
                          placeholder="Link"
                          name="Link"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={values.Link}
                          error={touched.Link && Boolean(errors.Link)}
                        />
                        <p className="text-red-600 text-xs">
                          {touched.Link && errors.Link}
                        </p>
                      </div>

                      <div>
                        <label className="block">Rate</label>
                        <TextField
                          type="text"
                          placeholder="Rate"
                          name="Rate"
                          className=" mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={values.Rate}
                          error={touched.Rate && Boolean(errors.Rate)}
                        />

                        <p className="text-red-600 text-xs">
                          {touched.Rate && errors.Rate}
                        </p>
                      </div>

                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        className="w-full"
                      >
                        <div>
                          <label className="block">Created Date</label>
                          <TextField
                            type="date"
                            placeholder="Enter Date"
                            name="createdDate"
                            className=" mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={values.createdDate}
                            error={
                              touched.createdDate && Boolean(errors.createdDate)
                            }
                          />
                          <p className="text-red-600 text-xs">
                            {touched.createdDate && errors.createdDate}
                          </p>
                        </div>
                      </LocalizationProvider>

                      <div>
                        <label className="block">Team</label>
                        <Select
                          className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="Team"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={values.Team}
                          error={touched.Team && Boolean(errors.Team)}
                        >
                          {teamDetails.map((team, key) => {
                            return (
                              <MenuItem key={key} value={team}>
                                {team}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <p className="text-red-600 text-xs">
                          {touched.Team && errors.Team}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block"> Project Description</label>
                      <TextField
                        type="text"
                        placeholder="Description"
                        name="Description"
                        multiline
                        rows={4}
                        className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={values.Description}
                        error={
                          touched.Description && Boolean(errors.Description)
                        }
                      />
                      <p className="text-red-600 text-xs">
                        {touched.Description && errors.Description}
                      </p>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    {edit ? (
                      <Button type="submit">update</Button>
                    ) : (
                      <Button type="submit">submit</Button>
                    )}
                  </DialogActions>
                </form>
              </>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};
export default AddProject;
