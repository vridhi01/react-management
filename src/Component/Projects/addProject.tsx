import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addProject } from "../../redux/slice/project/addProjectSlice";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
const validationSchema = yup.object({
  ProjectName: yup.string().required("name is required"),
  Username: yup.string().required("Username is required"),
  Description: yup.string().required("Description is required"),
  Link: yup.string().required("Link is required"),
  Rate: yup.string().required("Rate is required"),
  Team: yup.string().required("team is required")
});
const AddProject: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const teamDetails = [
    "nodejs",
    "angular",
    "react",
    "reactNative",
    "flutter",
    "python",
    "magento"
  ];
  interface formEvent {
    projectName: string;
    Username: string;
    Description: string;
    Link: string;
    Rate: string;
    Team: string;
  }
  const dispatch = useDispatch();
  const formik = useFormik<formEvent>({
    initialValues: {
      projectName: "",
      Username: "",
      Description: "",
      Link: "",
      Rate: "",
      Team: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log(values, "values");
      dispatch(
        addProject({
          projectName: values.Name,
          Username: values.Username,
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
        onClick={handleOpen}
        variant="contained"
        style={{
          backgroundColor: "#21b6ae"
        }}
      >
        Add Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">
              Add project Details
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <div className="mt-4">
                  <label className="block">Project Name</label>
                  <TextField
                    type="text"
                    placeholder="Project Name"
                    name="projectName"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={
                      formik.touched.projectName &&
                      Boolean(formik.errors.projectName)
                    }
                  />
                </div>
                <div className="mt-4">
                  <label className="block">User Name</label>
                  <TextField
                    type="text"
                    placeholder="User Name"
                    name="Username"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={
                      formik.touched.Username && Boolean(formik.errors.Username)
                    }
                  />
                </div>
                <div className="mt-4">
                  <label className="block"> Project Description</label>
                  <TextField
                    type="text"
                    placeholder="Description"
                    name="Description"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    rows={2}
                    maxRows={4}
                    error={
                      formik.touched.Description &&
                      Boolean(formik.errors.Description)
                    }
                  />
                </div>

                <div className="mt-4">
                  <label className="block">Project Link</label>
                  <TextField
                    type="text"
                    placeholder="Link"
                    name="Link"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={formik.touched.Link && Boolean(formik.errors.Link)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block">Rate</label>
                  <TextField
                    type="text"
                    placeholder="Rate"
                    name="Rate"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={formik.touched.Rate && Boolean(formik.errors.Rate)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Team</label>
                  <Select
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="Team"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={formik.touched.Team && Boolean(formik.errors.Team)}
                  >
                    <option value="selectedvalue">Please Select</option>
                    {teamDetails.map((team, key) => {
                      return (
                        <MenuItem key={key} value={team}>
                          {team}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div className="flex">
                  <button
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    type="submit"
                  >
                    submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddProject;
