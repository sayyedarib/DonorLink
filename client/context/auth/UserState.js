import { useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserState = (props) => {


const [userStateData, setUserStateData] = useState({}); 

const updateUserData=async (loginUser)=>{
  await setUserStateData(loginUser);
}

const signOut = () =>{
  setUserStateData({name:"", email:"", picture:""});
}

  return <UserContext.Provider value={{userStateData, updateUserData, signOut}}>{props.children}</UserContext.Provider>;
};

export default UserState;
