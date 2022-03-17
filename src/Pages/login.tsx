import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
const Login: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState({
    Email: "",
    Password: "",
    errorStatus: false,
    errorMessage: "",
    successStatus: false,
    successMessage: ""
  });
  const handleLogin = (e: any) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };
  console.log(loginDetails, "dssssss");
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    if (loginDetails.Email) {
      try {
        const userLogin = await signInWithEmailAndPassword(
          auth,
          loginDetails.Email,
          loginDetails.Password
        );
        localStorage.setItem("currentUser", JSON.stringify(userLogin.user.uid));
        window.location.replace("/home");
      } catch (error: any) {
        setLoginDetails({
          ...loginDetails,
          errorMessage: error.message,
          errorStatus: true
        });
      }
    } else {
      setLoginDetails({
        ...loginDetails,
        errorMessage: "Enter email",
        errorStatus: true
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
          Login to your account
        </h3>
        {loginDetails.errorStatus ? <div>{loginDetails.errorMessage}</div> : ""}
        <form>
          <div className="mt-4">
            <div>
              <label className="block">Email</label>
              <input
                type="text"
                placeholder="Email"
                name="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  handleLogin(e);
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
                  handleLogin(e);
                }}
              />
            </div>

            <div className="flex items-baseline justify-between">
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={handleSignIn}
              >
                Login
              </button>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>

        <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
          Dont have an account ?{" "}
          <Link className="text-blue-600 hover:underline" to="/registration">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
