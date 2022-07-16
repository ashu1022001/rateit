import create from "zustand";

const useUser = create(set => ({
    currUser: JSON.parse(localStorage.getItem("user") || '{}'),
    updateCurrUser:(user)=>{
      localStorage.setItem("user", JSON.stringify(user));
      set(({currUser:user}))
    },
    removeCurrUser:()=>{
      localStorage.removeItem("user");
      set({currUser:null})
    }
   
  }))

  export  default useUser;