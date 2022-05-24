import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { storage } from "../firebaseConfig";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
const useStyles = makeStyles(() => ({
  avatarImg: {
    height: "55px",
    width: "55px",
    position: "relative",
    cursor: "Pointer"
  },

  profileUploader: {
    opacity: 0,
    top: "5px",
    position: "absolute",
    left: "0px",
    height: "50px",
    width: "50px"
  }
}));

const UploadImage: React.FC = () => {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError("");
        fileUploader(selectedFile);
        console.log(selectedFile, "=======");
      } else {
        setError("Please select an image file (png or jpg)");
      }
    }
  };
  const fileUploader = (file: any) => {
    if (file) {
      const storageReference = storageRef(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageReference, file);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          console.log(snapshot, "snapshot");
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  };
  console.log(error);
  return (
    <>
      {" "}
      <Avatar className={`${classes.avatarImg}`} alt="Avatar">
        {url ? (
          <img
            src={url}
            alt="user_pic"
            height="70px"
            width="70px"
            className={`${classes.avatarImg} rounded-circle`}
          />
        ) : (
          ""
        )}
        <input
          type="file"
          className={classes.profileUploader}
          onChange={handleChange}
          style={{ opacity: 0 }}
        />
      </Avatar>
    </>
  );
};

export default UploadImage;
