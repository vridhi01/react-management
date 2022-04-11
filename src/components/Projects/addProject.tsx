import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addProject } from "../../redux/slice/project/addProjectSlice";
import { listProject } from "../../redux/slice/project/listProjectSlice";

const validationSchema = yup.object({
  projectName: yup.string().required("name is required"),
  Description: yup.string().required("Description is required"),
  Link: yup.string().required("Link is required"),
  Rate: yup.string().required("Rate is required"),
  Team: yup.string().required("team is required"),
  projectType: yup.string().required("projecttype is required"),
  createdDate: yup.string().required("date is required")
});

const AddProject: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
  interface formEvent {
    projectName: string;
    Description: string;
    Link: string;
    Rate: string;
    Team: string;
    createdDate: string;
    projectType: string;
  }
  const dispatch = useDispatch();

  const formik = useFormik<formEvent>({
    initialValues: {
      projectName: "",
      Description: "",
      Link: "",
      Rate: "",
      createdDate: "",
      projectType: "fixed Price",
      Team: "nodejs"
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      dispatch(
        addProject({
          projectName: values.projectName,
          projectType: values.projectType,
          createdDate: values.createdDate,
          Description: values.Description,
          Link: values.Link,
          Rate: values.Rate,
          Team: values.Team
        })
      );
    }
  });
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
        <DialogTitle className="text-center"> Add project Details</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
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
                    formik.handleChange(e);
                  }}
                  error={
                    formik.touched.projectName &&
                    Boolean(formik.errors.projectName)
                  }
                />
                <p className="text-red-600 text-xs">
                  {formik.touched.projectName && formik.errors.projectName}
                </p>
              </div>

              <div>
                <label className="block"> Project Type</label>
                <Select
                  className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="projectType"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  error={
                    formik.touched.projectType &&
                    Boolean(formik.errors.projectType)
                  }
                  value={formik.values.projectType}
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
                  {formik.touched.projectType && formik.errors.projectType}
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
                    formik.handleChange(e);
                  }}
                  error={formik.touched.Link && Boolean(formik.errors.Link)}
                />
                <p className="text-red-600 text-xs">
                  {formik.touched.Link && formik.errors.Link}
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
                    formik.handleChange(e);
                  }}
                  error={formik.touched.Rate && Boolean(formik.errors.Rate)}
                />
                <p className="text-red-600 text-xs">
                  {formik.touched.Rate && formik.errors.Rate}
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
                      formik.handleChange(e);
                    }}
                    error={
                      formik.touched.createdDate &&
                      Boolean(formik.errors.createdDate)
                    }
                  />
                  <p className="text-red-600 text-xs">
                    {formik.touched.createdDate && formik.errors.createdDate}
                  </p>
                </div>
              </LocalizationProvider>

              <div>
                <label className="block">Team</label>
                <Select
                  className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="Team"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.Team}
                  error={formik.touched.Team && Boolean(formik.errors.Team)}
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
                  {formik.touched.Team && formik.errors.Team}
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
                  formik.handleChange(e);
                }}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
              />
              <p className="text-red-600 text-xs">
                {formik.touched.Description && formik.errors.Description}
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default AddProject;
