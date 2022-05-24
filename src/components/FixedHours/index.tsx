import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { fixedProject } from "../../redux/slice/project/fixedHoursSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ToastContainer } from "react-toastify";

const validationSchema = yup.object({
  projectTasks: yup.string().required("Project Tasks is required"),
  tasksStatus: yup.string().required("Tasks Status is required"),
  timepicker: yup.string().required("Project Hours is required")
});

const FixedHours = ({ fixedHours, setFixedHours }: any) => {
  const dispatch = useDispatch();

  const addFixedHourssuccess = useSelector(
    (state: RootState) => state.fixedHoursSlice
  );

  useEffect(() => {
    if (addFixedHourssuccess.fixedtaskaddingSuccess) {
      setFixedHours(false);
    }
  }, [addFixedHourssuccess]);

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
      <Dialog open={fixedHours} onClose={handleFixedForm} fullWidth>
        {" "}
        <DialogTitle className="text-center">
          {" "}
          Add Project Task Details
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            dispatch(
              fixedProject({
                pendingReason: values.pendingReason,
                projectTasks: values.projectTasks,
                tasksStatus: values.tasksStatus,
                timepicker: values.timepicker
              })
            );
          }}
        >
          {({
            values,
            touched,
            handleChange,
            handleSubmit,
            setTouched,
            setValues,
            setFieldValue,
            errors,
            ...rest
          }) => {
            return (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <DialogContent>
                  <label className="block">Project Hours</label>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    style={{ borderColor: "#e5e7eb !important" }}
                  >
                    <Stack spacing={3}>
                      <TimePicker
                        ampm={false}
                        ampmInClock={false}
                        value={values.timepicker}
                        onChange={(value) => {
                          setFieldValue("timepicker", value);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  {values?.timepicker == "Invalid Date" ? (
                    <p className="text-red-600 text-xs">Invalid Date</p>
                  ) : (
                    <p className="text-red-600 text-xs">
                      {touched.timepicker && errors.timepicker}
                    </p>
                  )}

                  <div className="mt-4">
                    <label className="block">Tasks</label>
                    <TextField
                      type="text"
                      placeholder="Enter all the tasks"
                      name="projectTasks"
                      autoComplete="off"
                      multiline
                      rows={4}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.projectTasks}
                      className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <p className="text-red-600 text-xs">
                      {touched.projectTasks && errors.projectTasks}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block"> Tasks Status</label>
                    <Select
                      className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="tasksStatus"
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.tasksStatus}
                    >
                      {projectStatus.map((team, key) => {
                        return (
                          <MenuItem key={key} value={team}>
                            {team}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <p className="text-red-600 text-xs">
                      {touched.tasksStatus && errors.tasksStatus}
                    </p>
                  </div>
                  {values.tasksStatus == "taskpending" ? (
                    <div className="mt-4">
                      <label className="block">Reason For pending</label>
                      <TextField
                        type="text"
                        placeholder="Enter the Reason"
                        name="pendingReason"
                        autoComplete="off"
                        multiline
                        rows={4}
                        onChange={(e) => {
                          handleChange(e);
                          setTouched({ ...touched, ["pendingReason"]: true });
                        }}
                        className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      <p className="text-red-600 text-xs">
                        {touched.pendingReason && errors.pendingReason}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </DialogContent>
                <DialogActions>
                  <Button type="submit">submit</Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
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
      </Dialog>
    </>
  );
};

export default FixedHours;
