import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import {} from "firebase/firestore";
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

export const listProjectLog = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const collectiondata: any = [];
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const projectData = doc.data();
        const querySnapshot2 = await getDocs(
          collection(db, "projects", projectData.projectid, "users")
        );
        const arr: Array<object> = [];
        await Promise.all(
          querySnapshot2.docs.map((doc) => {
            const userquerydata = doc.data();
            arr.push(userquerydata);
          })
        );
        if (arr.length > 0) {
          collectiondata.push({ ...projectData, userData: arr });
        }
      })
    );
    console.log(collectiondata, "collectiondata");
    return collectiondata;
  } catch (error: any) {
    throw error;
  }
};
