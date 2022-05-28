import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const addEmployeeApi = async (email: string, password: string) => {
  try {
    const employeeRegistration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return employeeRegistration;
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

export const listEmployeeApi = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data2 = querySnapshot.docs.map((doc) => doc.data());

    return data2;
  } catch (error: any) {
    throw error;
  }
};

export const deleteEmployeeApi = async (userId: string) => {
  try {
    const deleteRef = doc(db, "users", userId);
    deleteDoc(deleteRef);

    toast("Users deleted successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } catch (error: any) {
    throw error;
  }
};

export const editEmployeeApi = async (
  userName: string,
  userRole: string,
  userEmail: string,
  userId: string
) => {
  try {
    const editRef = doc(db, "users", userId);
    updateDoc(editRef, {
      userName: userName,
      userRole: userRole,
      userEmail: userEmail
    });
    toast("Users updated successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } catch (error: any) {
    throw error;
  }
};
