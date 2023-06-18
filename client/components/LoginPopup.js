import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/loginPopup.module.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "@/context/auth/userContext";

const LoginPopup = () => {
  const userContextDetail = useContext(userContext)
  const [userDetail, setUserDetail] = useState({
    name: "",
    email:"",
    picture:"",
  });

  console.log("inside popup");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleCallBackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    userContextDetail.updateUserData(userObject);
    userContextDetail.updateLoginPopupVisibilty(false);
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
        userDetail,
        {
          withCredentials: true,
        }
      );

      // request to mail the form data
      setUser({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("error while login data ", err);
    }
  };

const handleSignUp = ()=>{

}

  return (
    <>
      <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.iconHeader}>
            <button
              className={styles.cross}
              onClick={userContextDetail.updateLoginPopupVisibilty}
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
            <div className="googleSignBtn">
              <div style={{ padding: "10px 30px" }} id="signInDiv"></div>
            </div>
            <div>
              <span>
                {" "}
                not a user? <span onClick={handleSignUp}>
                  Register now
                </span>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
