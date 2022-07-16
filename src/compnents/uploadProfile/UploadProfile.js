import React, { useEffect, useState } from "react";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { set as dbset, ref as dbref } from "firebase/database";
import { database } from "../firebase/firebase";
import {} from "@fortawesome/free-solid-svg-icons";
import useUser from "../Store";

import { toast } from "react-toastify";

function UploadProfile() {
  // const currUser = useUser((state) => state.currUser);

  const { currUser, updateCurrUser } = useUser();
  const [profileUpload, setProfileUpload] = useState(null);
  const uploadProfileHandler = () => {
    if (profileUpload == null) return;
    const profilePicRef = ref(
      storage,
      `images/profilepics/${currUser.userName}/${profileUpload.name}`
    );
    uploadBytes(profilePicRef, profileUpload)
      .then(() => {
        toast.success("Profile picture updated Successfully");
        if (profilePicRef) {
          getDownloadURL(
            ref(
              storage,
              `images/profilepics/${currUser.userName}/${profileUpload.name}`
            )
          ).then((url) => {
            dbset(
              dbref(database, `users/${currUser?.uid}/profilePicUrl/`),
              url
            );
            updateCurrUser({...currUser, profilePicUrl: url});
          });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="upload-image-cont">
      <label class="custom-file-upload">
        <input
          type="file"
          onChange={(e) => {
            setProfileUpload(e.target.files[0]);
          }}
        />
      </label>

      <button className="btn" onClick={uploadProfileHandler}>
        Upload
      </button>
    </div>
  );
}

export default UploadProfile;
