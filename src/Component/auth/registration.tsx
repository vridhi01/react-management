import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { userSignup } from "../../redux/slice/auth/registrationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { collection, doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { unwrapResult } from "@reduxjs/toolkit";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

interface formEvent {
  Name: string;
  Email: string;
  Password: string;
  CPassword: string;
  Role: string;
}

const validationSchema = yup.object({
  Name: yup.string().required("name is required"),
  Email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  Password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required")
    .matches(/[a-z]+/, "Password must contain one lowercase character")
    .matches(/[A-Z]+/, "Password must contain one uppercase character")
    .matches(/[@$!%*#?&]+/, "Password must contain one special character")
    .matches(/\d+/, "Password must contain one number"),
  CPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  Role: yup.string().required("Role is required")
});

const Registration: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    Name: "",
    Email: "",
    Role: " "
  });

  const dispatch = useDispatch();
  const RegisterUser = useSelector((state: RootState) => state.userSignup);

  useEffect(() => {
    const genRandomKey = async () => {
      if (RegisterUser.userData.uid) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(RegisterUser.userData.uid)
        );
        const data = {
          Name: userDetails.Name,
          Email: userDetails.Email,
          Role: userDetails.Role,
          uid: RegisterUser.userData.uid
        };

        const usersRef = collection(db, "Users");
        await setDoc(doc(usersRef, `${RegisterUser.userData.uid}`), data);
        window.location.replace("/home");
      }
    };
    genRandomKey();
  }, [RegisterUser]);

  const formik = useFormik<formEvent>({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      CPassword: "",
      Role: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      setUserDetails(values);
      dispatch(
        userSignup({
          email: values.Email,
          password: values.Password
        })
      );
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div className="flex justify-center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbcAAABPCAYAAABoIYsrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTEyLTEyVDE1OjMwOjQ1KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTEyVDE1OjMwOjQ1KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMi0xMlQxNTozMDo0NSswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjEzNDQ3NC05NTc0LWQ0NDYtOTViNC1iMzY3ZjgwYTc1ZGUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiM2MzMWYzOS1mM2Y5LWM3NGYtYmMz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"
            alt="excellencelogo"
            className="mb-4  w-[50%]"
          />
        </div>
        <h3 className="text-2xl font-bold text-center">
          Sign up to your account
        </h3>

        {/* {userDetails.errorStatus ? <div>{userDetails.errorMessage}</div> : null}
        {userDetails.successStatus ? (
          <div>{userDetails.successMessage}</div>
        ) : null} */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <div className="mt-2">
              <label className="block">Name</label>
              <TextField
                type="text"
                placeholder="Name"
                name="Name"
                size="small"
                value={formik.values.Name}
                className="w-full  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={formik.touched.Name && Boolean(formik.errors.Name)}
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Name && formik.errors.Name}
            </p>
            <div className="mt-4">
              <label className="block">Email</label>
              <TextField
                type="text"
                placeholder="Email"
                name="Email"
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.Email}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Email && formik.errors.Email}
            </p>
            <div className="mt-4">
              <label className="block">Password</label>
              <TextField
                type="password"
                placeholder="Password"
                name="Password"
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.Password}
                size="small"
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Password && formik.errors.Password}
            </p>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <TextField
                type="password"
                placeholder="Confirm Password"
                name="CPassword"
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.CPassword}
                error={
                  formik.touched.CPassword && Boolean(formik.errors.CPassword)
                }
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.CPassword && formik.errors.CPassword}
            </p>
            <div className="mt-4">
              <label className="block">Role</label>
              <Select
                className="w-full  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="Role"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.Role}
                error={formik.touched.Role && Boolean(formik.errors.Role)}
              >
                <MenuItem value="selectedvalue">Please Select</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Role && formik.errors.Role}
            </p>
            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                type="submit"
              >
                Create Account
              </button>
            </div>
            <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account ?{" "}
              <Link className="text-blue-600 hover:underline" to="/">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
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
  );
};

export default Registration;
