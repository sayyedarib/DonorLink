import React from "react";
import Navbar from "./Navigation";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import axios from 'axios';

const Header = () => {

  const checkoutHandler = async () => {
    let amount=1000

    const { data: { key } } = await axios.get("http://localhost:3001/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:3001/api/checkout", {
        amount
    })
    console.log(order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "6 Pack Programmer",
      description: "Tutorial of RazorPay",
      image: "assets/images/fill-gap/boy.png",
      order_id: order.id,
      callback_url: "http://localhost:3001/api/paymentverification",
      prefill: {
        name: "Sayyed Arib Hussain",
        email: "sayyedaribhussain4321@gmail.com",
        contact: "+91 8604078497",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };


  return (
    <>
      <Navbar />
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Sharing Love,spreading hope</h1>
          <h2>
            Spreading hope can inspire others to persevere through difficult
            times and see the possibilities for a brighter future. Together,
            sharing love and spreading hope can help create a world where we can
            all thrive and live to our fullest potential.
          </h2>
          <div className={styles.btnDiv}>
            <button onClick={checkoutHandler}>Donate</button>
            <Link href="/forms/volunteerRegistration">
              <button>Join Us</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
