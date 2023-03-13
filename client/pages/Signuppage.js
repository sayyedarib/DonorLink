import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/pages/signUpPage.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BACKEND_URL } from "next.config";

const SignUpPage = () => {
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = userSignUp;
    const data = { name, email, password, cpassword };
    try {
      const response = await axios.post(`${BACKEND_URL}/signUp`, data, {
        withCredentials: true,
      });
      setUserSignUp({ name: "", email: "", password: "", cpassword: "" });
    } catch (err) {
      console.log("error while posting signUp data to server: ", err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <img
            src="signup.png"
            alt="Image"
            style={{ borderRadius: "110px" }}
          ></img>
        </div>
        <div className={styles.formcontainer}>
          <h1>Sign up</h1>
          <form method="post">
            <TextField
              name="name"
              value={userSignUp.name}
              onChange={handleInput}
              id="outlined-basic"
              label="name"
              variant="outlined"
            />
            <br />
            <TextField
              name="email"
              value={userSignUp.email}
              onChange={handleInput}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <br></br>
            <TextField
              name="password"
              value={userSignUp.password}
              onChange={handleInput}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <br></br>
            <TextField
              name="cpassword"
              value={userSignUp.cpassword}
              onChange={handleInput}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
            />
            <br></br>
            <Button
              onClick={handleSignUp}
              type="submit"
              variant="contained"
              color="success"
              href="#contained-buttons"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
