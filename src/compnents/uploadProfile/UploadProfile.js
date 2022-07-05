import React, { useState } from "react";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import {} from "@fortawesome/free-solid-svg-icons";
import useUser from "../Store";

import { toast } from "react-toastify";

function UploadProfile() {
  // const currUser = useUser((state) => state.currUser);

  const [profileUpload, setProfileUpload] = useState(null);
  const uploadProfileHandler = () => {
    if (profileUpload == null) return;
    const profilePicRef = ref(
      storage,
      `images/profilepics/${<span>localstorage</span>}/${profileUpload.name + v4()}`
    );
    uploadBytes(profilePicRef, profileUpload)
      .then(() => {
        toast.success("Profile picture updated Successfully");
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
