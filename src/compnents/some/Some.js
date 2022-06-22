import React, { useEffect, useState } from 'react'
// import modal from "react-modal"
// import {db} from "../firebase/firebase"
// import {collection, getDocs} from "firebase/firestore"
// import { async } from '@firebase/util'

const Some = () => {
// const [users,setUsers] = useState([]);
// const userCollectionref = collection(db,"users");

// useEffect(()=>{

//   const getUsers = async () =>{
//     const data = await getDocs(userCollectionref);
//     setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

//   }
const [userPost,setUserPost] = useState([]);
useEffect(()=>{
    fetch("https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10",{
    headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      }}
    )
      .then((posts) => posts.json())
      .then((posts) => posts).then(posts => setUserPost(posts.data));

},[])

console.log(userPost[0]?.id)



return (
<div>
{userPost.map((post)=>{
    return(
       <p>{post.owner.firstName}</p> 
    )
})}
</div>
)

// getUsers();
// },[users])

//  return (
//   <div>
//   {
//     users.map((user)=>{
//       return(
//         <div>
//         {user.age}
//         {user.name}
//         </div>
//       )
//     })
//   }
//   </div>
//  )
}

export default Some