import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import {} from "firebase/firestore";
export const fixedhoursapi = async (
  pendingReason: string,
  projectTasks: string,
  tasksStatus: string,
  projectid: string,
  timepicker: string,
  currentData: string
) => {
  try {
    const newDocRef = doc(collection(db, "fixedhours"));
    await setDoc(newDocRef, {
      timepicker: timepicker,
      projectTasks: projectTasks,
      tasksStatus: tasksStatus,
      projectid: projectid,
      pendingReason: pendingReason,
      currentData: currentData
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

export const listProjectLog = async (projectid: string) => {
  try {
    const querySnapshotProjectLog = await getDocs(collection(db, "fixedhours"));
    const data2ProjectLog = querySnapshotProjectLog.docs.map((doc) =>
      doc.data()
    );

    return data2ProjectLog;
  } catch (error: any) {
    throw error;
  }
};
