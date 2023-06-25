import { useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserState = (props) => {


const [userStateData, setUserStateData] = useState({}); 
const [loginPopupVisibility, setLoginPopupVisibility] = useState(false);

const updateUserData=async (loginUser)=>{
  // const {data} =await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList?particular=${email}`);
  // console.log("userDatabase ",data);
  await setUserStateData(loginUser);

  console.log("userState data ", userStateData);
}

const updateLoginPopupVisibilty = ()=>{
  setLoginPopupVisibility(!loginPopupVisibility);
  console.log("update loginpopupvisibilty called ",userStateData, "  ", loginPopupVisibility);
}

const signOut = () =>{
  setUserStateData({name:"", email:"", picture:""});
  setLoginPopupVisibility(false);
  console.log(userStateData, "  ", loginPopupVisibility);
}

  return <UserContext.Provider value={{userStateData, updateUserData, loginPopupVisibility, updateLoginPopupVisibilty, signOut}}>{props.children}</UserContext.Provider>;
};

export default UserState;
