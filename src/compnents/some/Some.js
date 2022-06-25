import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import {useState,useEffect} from 'react'
import {db} from "../firebase/firebase"

function Some() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db,"users");
  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/user?limit=10",{
      headers:{
        "app-id": "62adde4072c63ad0c100fa56",
      }
    }).
    then((users)=>users.json()).
    then((users)=> setUsers(users.data));
  }, [])

  
  return(<div>
{users.map((user)=>{
  return(
    addDoc(userCollectionRef,{
      id:user.id,
      fname:user.firstName,
      lname:user.lastName,

    })
  )
})}
</div>
  )
  
}

export default Some