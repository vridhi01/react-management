import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword
} from "firebase/auth";

export const loginApi = async (email: string, password: string) => {
  try {
    const userLogin = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("currentUser", userLogin?.user?.uid);
    return userLogin;
  } catch (error: any) {
    const errorCodes = error.code;
    toast(errorCodes, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    throw error;
  }
};

export const registrationapi = async (email: string, password: string) => {
  try {
    const userRegistration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userRegistration;
  } catch (error: any) {
    const errorCode = error.code;
    toast(errorCode, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    throw error;
  }
};

export const passwordrestapi = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email).then((res) => {
      toast("We have sent an email through to you update your password", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    });
  } catch (error: any) {
    const errorCodess = error.code;
    toast(errorCodess, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    throw error;
  }
};
