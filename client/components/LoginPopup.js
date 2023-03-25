import React, { useState,useEffect } from "react";
import styles from "../styles/components/loginPopup.module.css";
import axios from "axios";
import { BACKEND_URL } from "next.config";
import jwt_decode from "jwt-decode";
import { useDispatch,useSelector } from "react-redux";
import loginPopupSlice from "@/slices/loginPopupSlice";
import userDetailSlice from "@/slices/userDetailSlice";

const LoginPopup = () => {
  const {userDetails} = useSelector((state)=>state. userDetail)
  console.log(userDetails);
  const { changeVisibility } = loginPopupSlice.actions;

  const { userDetailUpdate } = userDetailSlice.actions;
  const dispatch = useDispatch();
  console.log("inside popup");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT ID token " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
  dispatch(userDetailUpdate(userObject));
  dispatch(changeVisibility())
  };

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        "587921623953-23fr6m7muhh45pf3j36rvi0lvmfse4aj.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);


  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({
      [name]: value,
    });
  };


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log("start response");
      const response = await axios.post(`${BACKEND_URL}/login`, userDetails, {
        withCredentials: true,
      });

      // request to mail the form data

      setUser({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("error while login data ", err);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.iconHeader}>
            <button
              className={styles.cross}
              onClick={() => dispatch(changeVisibility())}
            >
              <img src="/assets/images/icon/close-icon.svg" />
            </button>
          </div>
          <h3>SignIn</h3>
          <form method="post" className={styles.form}>
            <input
              value={user.email}
              onChange={handleInput}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              value={user.password}
              onChange={handleInput}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <input type="submit" value="Login" onClick={handleClick} />
            <h3>Or</h3>
            <div id="signInDiv"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
