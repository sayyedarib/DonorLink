import { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserState = (props) => {
  const [userStateData, setUserStateData] = useState({}); 

// useEffect(()=>{
//   if (typeof localStorage !== 'undefined'){
//   setUserStateData(localStorage.getItem("userData")?localStorage.getItem("userData"):userStateData)
// }
// }, [userStateData])


const updateUserData=async (loginUser)=>{
  console.log("userStateData ", loginUser);
  // localStorage.setItem("userData", loginUser.profile);
  await setUserStateData(loginUser);
}

const signOut = () =>{
  setUserStateData({name:"", email:"", picture:""});
  localStorage.removeItem("userData");
}

  return <UserContext.Provider value={{userStateData, updateUserData, signOut}}>{props.children}</UserContext.Provider>;
};

export default UserState;
