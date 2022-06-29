import React, { useState ,useEffect} from "react";
import {storage} from "../firebase/firebase"
import { ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid"
import "./Upload.css"
import {toast} from "react-toastify"

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);


  const uploadHandler = () => {
    if(imageUpload==null) return ;
    const imageref = ref(storage,`images/${imageUpload.name + v4()}`);
    uploadBytes(imageref,imageUpload).then(()=>{
        toast.success("image uploaded successfully")
    }).catch((err)=>{
        toast.error(err.message)
    })

  };


  
  

  return (
    <div    className="upload-image-cont">
      <input className="inputbtn"
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      ></input>
      <button  className="btn" onClick={uploadHandler}>Upload</button>
    </div>
  );
}

export default Upload;
