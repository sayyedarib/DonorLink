import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
const userData = {
  name:"",
  email:"",
  picture:""
}

const [userStateData, setUserStateData] = useState(userData); 
const [loginPopupVisibility, setLoginPopupVisibility] = useState(false);

const updateUserData=({name, email, picture})=>{
  setUserStateData({name, email, picture});
  console.log(userStateData, "  ", loginPopupVisibility);
}

const updateLoginPopupVisibilty = ()=>{
  setLoginPopupVisibility(!loginPopupVisibility);
  console.log(userStateData, "  ", loginPopupVisibility);
}

const signOut = () =>{
  setUserStateData({name:"", email:"", picture:""});
  setLoginPopupVisibility(false);
  console.log(userStateData, "  ", loginPopupVisibility);
}

  return <UserContext.Provider value={{userStateData, updateUserData, loginPopupVisibility, updateLoginPopupVisibilty, signOut}}>{props.children}</UserContext.Provider>;
};

export default UserState;
