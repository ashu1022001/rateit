import  firebase from 'firebase/app';
import {getFirestore} from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getDatabase,ref,remove,set, update ,onValue,onChildRemoved, get, off, push, onChildChanged, onChildAdded} from 'firebase/database';
import "firebase/database"
import { useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBOpl5dwx6zah1kLK5HzDAxy55DnS5twVY",
    authDomain: "rateit-5f983.firebaseapp.com",
    databaseURL: "https://rateit-5f983-default-rtdb.firebaseio.com",
    projectId: "rateit-5f983",
    storageBucket: "rateit-5f983.appspot.com",
    messagingSenderId: "512399821244",
    appId: "1:512399821244:web:cc125093064c1327da43b9",
    measurementId: "G-Q79CV2F3CC"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const database = getDatabase(app);
  // set(ref(database,"user"),{
  //   name:"ashu",
  //   age:21
  // })
  // set(ref(database,"user1"),{
  //   name:"ashu",
  //   age:21
  // })
  // // remove(ref(database,"user/name"));
  // update(ref(database,"user"),{
  //   name:"Ashutosh"
  // })
  // remove(ref(database,"user1"))


// setTimeout(()=>{
//   onValue(ref(database,"user"),(snapshot)=>{
//     const val= snapshot.val()
//     console.log(`${val.name} is ${val.age} years old`)
//   })
  

// },1000)
// push(ref(database,"users"),{
//     name:"Ashutosh Singh",
//   profession:"Engineer"


// })
// push(ref(database,"users"),{
//   name:"peter Singh",
// profession:"Engineer"


// })
// push(ref(database,"users"),{
//   name:"stewie Singh",
// profession:"Engineer"


// })

// const users = [];
// onValue(ref(database,"users"),((snapshot)=>{
//   snapshot.forEach((snapshotchild)=>{
//     users.push(
//       {
//         id:snapshotchild.key,
//         ...snapshotchild.val()
//       }
//     )

//   })
//   console.log(users)
// }))

// onChildRemoved(ref(database,"users"),(snapshot)=>{
//   console.log(snapshot.val())
// })
// onChildChanged(ref(database,"users"),(snapshot)=>{
//   console.log(snapshot.val())

// })
// onChildAdded(ref(database,"users"),(snapshot)=>{
//   console.log(snapshot.key, snapshot.val())
// })



  // update(ref(database,"user"),{
  //   name:"Ashutosh Singh"
  // })
  // console.log("name is"+name+age)


 

  export {db,auth,storage,database};
  

 