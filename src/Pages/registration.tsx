import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
const Registration: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    Email: "",
    Password: "",
    Role: "",
    ProjectName: "",
    errorStatus: false,
    uid: "",
    errorMessage: "",
    successStatus: false,
    successMessage: ""
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      if (userDetails.Password.length >= 6) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userDetails.Email,
          userDetails.Password
        );
        if (userCredential) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userCredential.user.uid)
          );
          setUserDetails({ ...userDetails, uid: userCredential.user.uid });
          const data = {
            Email: userDetails.Email,
            Password: userDetails.Password,
            ProjectName: userDetails.ProjectName,
            Role: userDetails.Role
          };
          const usersRef = collection(db, "Users");
          await setDoc(doc(usersRef, `${userCredential.user.uid}`), {
            userInfo: data
          });
          setUserDetails({
            ...userDetails,
            successStatus: true,
            successMessage: "Regiistered Successfully"
          });
          window.location.replace("/home");
        }
      } else {
        setUserDetails({
          ...userDetails,
          errorStatus: true,
          errorMessage: "please enter atleast 6 digit password"
        });
      }
    } catch (error: any) {
      setUserDetails({
        ...userDetails,
        errorStatus: true,
        errorMessage: error.message
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">
          Sign up to your account
        </h3>
        {userDetails.errorStatus ? <div>{userDetails.errorMessage}</div> : null}
        {userDetails.successStatus ? (
          <div>{userDetails.successMessage}</div>
        ) : null}
        <form action="">
          <div className="mt-4">
            <div className="mt-4">
              <label className="block">Email</label>
              <input
                type="text"
                placeholder="Email"
                name="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="mt-4">
              <label className="block">Role</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="Role"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="selectedvalue">Please Select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {userDetails.Role == "user" ? (
              <div className="mt-4">
                <label className="block">Project Name</label>
                <input
                  type="text"
                  name="ProjectName"
                  placeholder="Project Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            ) : (
              ""
            )}

            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={handleSignUp}
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
    </div>
  );
};

export default Registration;
