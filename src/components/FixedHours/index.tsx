import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { projectStatus } from "../../pages/hardCodedData";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as yup from "yup";
// import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  projectTasks: yup.string().required("projectTasks is required"),
  tasksStatus: yup.string().required("tasksStatus is required"),
  pendingReason: yup.string().required("reason is required")
});

const FixedHours = ({ fixedHours, setFixedHours }: any) => {
  const [value, setValue] = React.useState<Date | null>(
    new Date("2018-01-01T00:00:00")
  );
  // const dispatch = useDispatch();

  const handleFixedForm = () => {
    setFixedHours(false);
  };
  const initialValues = {
    projectTasks: "",
    tasksStatus: "",
    pendingReason: "",
    timepicker: ""
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          // dispatch();
        }}
      >
        {({
          values,
          touched,
          handleChange,
          handleSubmit,
          setTouched,
          setValues,
          errors,
          ...rest
        }) => {
          console.log(values);

          return (
            <form>
              <Dialog open={fixedHours} onClose={handleFixedForm} fullWidth>
                {" "}
                <DialogTitle className="text-center">
                  {" "}
                  Add Project Task Details
                </DialogTitle>
                <DialogContent>
                  <label className="block">Project Hours</label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <TimePicker
                        ampm={false}
                        ampmInClock={false}
                        value={value}
                        onChange={setValue}
                        renderInput={(params) => (
                          <TextField {...params} name="timepicker" />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>

                  <div className="mt-4">
                    <label className="block">Tasks</label>
                    <TextField
                      type="text"
                      placeholder="Enter all the tasks"
                      name="projectTasks"
                      autoComplete="off"
                      multiline
                      rows={4}
                      className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block"> Tasks Status</label>
                    <Select
                      className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="tasksStatus"
                      autoComplete="off"
                    >
                      {projectStatus.map((team, key) => {
                        return (
                          <MenuItem key={key} value={team}>
                            {team}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="mt-4">
                    <label className="block">Reason For pending</label>
                    <TextField
                      type="text"
                      placeholder="Enter the Reason"
                      name="pendingReason"
                      autoComplete="off"
                      multiline
                      rows={4}
                      className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button type="submit">submit</Button>
                </DialogActions>
              </Dialog>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default FixedHours;
