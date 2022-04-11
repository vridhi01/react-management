import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

export const addProjectApi = async (
  projectName: string,
  projectType: string,
  createdDate: string,
  Description: string,
  Link: string,
  Rate: string,
  Team: string
) => {
  try {
    const newDocRef = doc(collection(db, "projects"));
    await setDoc(newDocRef, {
      projectName: projectName,
      projectType: projectType,
      createdDate: createdDate,
      description: Description,
      team: Team,
      link: Link,
      rate: Rate,
      projectid: newDocRef.id
    });
  } catch (error: any) {
    throw error;
  }
};

export const listProjectApi = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data2 = querySnapshot.docs.map((doc) => doc.data());
    return data2;
  } catch (error: any) {
    throw error;
  }
};

export const deleteProjectApi = async (projectId: string) => {
  try {
    const deleteRef = doc(db, "projects", projectId);
    deleteDoc(deleteRef);

    toast("product deleted successfully", {
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
