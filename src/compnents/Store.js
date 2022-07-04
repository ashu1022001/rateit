import create from "zustand";

const useUser = create(set => ({
    currUser:JSON.parse(localStorage.getItem("currUser")),
    removeCurrUser:()=>{set({currUser:null})}
   
  }))

  export  default useUser;