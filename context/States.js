import { useState, useEffect } from "react";
import Context from "./contexts";
import axios from "axios";

const States = (props) => {
  const [popupState, setPopupState] = useState(false);
  const [userStateData, setUserStateData] = useState({});
  
  useEffect(()=>{
    const data  = JSON.parse(localStorage.getItem("userData"))
    if(data){
      setUserStateData(data)
    }
  }, [])

  const updatePopupState = () => {
    setPopupState(!popupState);
  };

  const updateUserData = async (loginUser) => {
    setUserStateData(loginUser);
  };

  const signOut = () => {
    setUserStateData({ name: "", email: "", picture: "" });
    localStorage.removeItem("userData");
  };

  return (
    <Context.Provider
      value={{
        popupState,
        updatePopupState,
        userStateData,
        updateUserData,
        signOut,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default States;
