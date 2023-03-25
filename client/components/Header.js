import React, { useEffect, useState } from "react";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "next.config";
import jwt_decode from "jwt-decode";
import {useSelector } from "react-redux";
import LoginPopup from "./LoginPopup";

const Header = () => {
  const { visible } = useSelector((state) => state.loginPopupVisibility);
  console.log(visible);


  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT ID token " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  };

  const handleSignOut = () => {
    setUser({});
    console.log(user);
    return;
  };

  // useEffect(() => {
  //   // global google
  //   google.accounts.id.initialize({
  //     client_id:
  //       "587921623953-23fr6m7muhh45pf3j36rvi0lvmfse4aj.apps.googleusercontent.com",
  //     callback: handleCallBackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });

  //   google.accounts.id.prompt();
  // }, []);

  // const checkoutHandler = async () => {
  //   let amount = 1000;

  //   const {
  //     data: { key },
  //   } = await axios.get(`${BACKEND_URL}/api/getkey`);

  //   const {
  //     data: { order },
  //   } = await axios.post(`${BACKEND_URL}/api/checkout`, {
  //     amount,
  //   });
  //   console.log(order);

  //   const options = {
  //     key,
  //     amount: order.amount,
  //     currency: "INR",
  //     name: "Aarib",
  //     description: "Tutorial of RazorPay",
  //     image: "assets/images/fill-gap/boy.svg",
  //     order_id: order.id,
  //     callback_url: `${BACKEND_URL}/api/paymentverification`,
  //     prefill: {
  //       name: "Sayyed Arib Hussain",
  //       email: "sayyedaribhussain4321@gmail.com",
  //       contact: "+91 8604078497",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#121212",
  //     },
  //   };
  //   const razor = new window.Razorpay(options);
  //   razor.open();
  // };

  return (
    <>
      {/* <Navbar /> */}
      <header className={styles.header}>
        {visible&&<LoginPopup />}
        <div className={styles.content}>
          <h1>Who we are?</h1>
          <h2>
            We are a unified platform of donation where volunteer can join us
            and help to collect cloths and food from donors. And donate it to
            needy people
          </h2>
          <div className={styles.btnDiv}>
            <button>Support</button>
            <Link href="/forms/volunteerRegistration">
              <button>Join Us</button>
            </Link>
          </div>
          {/* {Object.keys(user).length != 0 ? (
            <div>
              {" "}
              <img src={user.picture} alt="user_picture" />
              <h3>Welcome {user.name}</h3>
              <button onClick={(e) => handleSignOut(e)}>Signout</button>
            </div>
          ) : (
            <div className={styles.btnDiv}>Login</div>
          )} */}
        </div>
      </header>
    </>
  );
};

export default Header;
