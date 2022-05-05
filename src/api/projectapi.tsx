import {
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
  query,
  collection,
  setDoc
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
  Team: string,
  userData: any
) => {
  try {
    const userDatasets: any = [];
    userData.map(async (dataset: any) => {
      const q = query(
        collection(db, "employee"),
        where("userId", "==", dataset)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userDatasets.push(doc.data());
      });
    });

    const newDocRef = doc(collection(db, "projects"));
    setDoc(newDocRef, {
      projectName: projectName,
      projectType: projectType,
      createdDate: createdDate,
      description: Description,
      team: Team,
      link: Link,
      rate: Rate,
      projectid: newDocRef.id
    }).then(function () {
      userDatasets?.map(async (data: any) => {
        const newColRef = doc(
          db,
          "projects",
          newDocRef.id,
          "users",
          data.userId
        );
        await setDoc(newColRef, {
          userName: data.userName,
          userRole: data.userRole,
          userEmail: data.userEmail,
          userID: data.userId
        });
      });
    });
  } catch (error: any) {
    throw error;
  }
};

export const listProjectApi = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const collectiondata: any = [];
    querySnapshot.docs.map(async (doc) => {
      const userDatas = doc.data();
      const querySnapshot2 = await getDocs(
        collection(db, "projects", userDatas.projectid, "users")
      );
      const arr: any = [];
      querySnapshot2.docs.map((doc) => {
        const userquerydata = doc.data();
        arr.push(userquerydata);
      });

      collectiondata.push({ ...userDatas, users: arr });
    });

    console.log(collectiondata, "collectiondata");
    return collectiondata;
  } catch (error: any) {
    console.log(error, "error");
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

export const editProjectApi = async (
  projectName: string,
  projectType: string,
  createdDate: string,
  Description: string,
  Link: string,
  Rate: string,
  Team: string,
  projectId: string
) => {
  try {
    const editRef = doc(db, "projects", projectId);
    updateDoc(editRef, {
      projectName: projectName,
      projectType: projectType,
      createdDate: createdDate,
      description: Description,
      link: Link,
      rate: Rate,
      team: Team
    });
    toast("Product updated successfully", {
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
