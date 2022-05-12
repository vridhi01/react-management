import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
export const addEmployeeApi = async (
  userName: string,
  userRole: string,
  userEmail: string
) => {
  try {
    const newDocRef = doc(collection(db, "employee"));
    await setDoc(newDocRef, {
      userName: userName,
      userRole: userRole,
      userEmail: userEmail,
      userId: newDocRef.id
    });
  } catch (error: any) {
    throw error;
  }
};

export const listEmployeeApi = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "employee"));
    const data2 = querySnapshot.docs.map((doc) => doc.data());
    return data2;
  } catch (error: any) {
    throw error;
  }
};

export const deleteEmployeeApi = async (userId: string) => {
  try {
    const deleteRef = doc(db, "employee", userId);
    deleteDoc(deleteRef);

    toast("Employee deleted successfully", {
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
    const editRef = doc(db, "employee", userId);
    updateDoc(editRef, {
      userName: userName,
      userRole: userRole,
      userEmail: userEmail
    });
    toast("Employee updated successfully", {
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
