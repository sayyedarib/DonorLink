import React, { useState } from "react";
import axios from 'axios'
import styles from "../styles/pages/signUpPage.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const LoginPage = () => {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
      });
      let name, value;
      const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value });
      };
      
      const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password}=userLogin;
        const data = { email, password };
        try {
          const response = await axios.post("http://localhost:3001/login", data, {
            withCredentials: true,
          });
          setUserLogin({ email: "", password: ""});
        } catch (err) {
          console.log("error while posting login data to server: ", err);
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
          <h1>Login</h1>
          <form method="post">
            <TextField
              name="email"
              value={userLogin.email}
              onChange={handleInput}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <br></br>
            <TextField
              name="password"
              value={userLogin.password}
              onChange={handleInput}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <br></br>
            <Button
              onClick={handleLogin}
              type="submit"
              variant="contained"
              color="success"
              href="#contained-buttons"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
