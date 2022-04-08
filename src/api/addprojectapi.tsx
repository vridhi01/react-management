import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addProjectApi = async (
  projectName: string,
  Username: string,
  Description: string,
  Link: string,
  Rate: string,
  Team: string
) => {
  try {
    const data = {
      projectName: projectName,
      userName: Username,
      description: Description,
      team: Team,
      link: Link,
      rate: Rate
    };
    const projecRef = await addDoc(collection(db, "Projects"), data);
    console.log("Document written with ID: ", projecRef.id);
  } catch (error: any) {
    throw error;
  }
};
