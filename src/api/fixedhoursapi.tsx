import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
export const fixedhoursapi = async (
  pendingReason: string,
  projectTasks: string,
  tasksStatus: string,
  timepicker: string
) => {
  try {
    const newDocRef = doc(collection(db, "fixedhours"));
    await setDoc(newDocRef, {
      timepicker: timepicker,
      projectTasks: projectTasks,
      tasksStatus: tasksStatus,
      pendingReason: pendingReason
    });
    toast("tasks added successfully", {
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
