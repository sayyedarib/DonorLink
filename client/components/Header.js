import React from "react";
import Navbar from "./Navigation";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "next.config";

const Header = () => {
  const checkoutHandler = async () => {
    let amount = 1000;

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/api/getkey`);

    const {
      data: { order },
    } = await axios.post(`${BACKEND_URL}/api/checkout`, {
      amount,
    });
    console.log(order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Aarib",
      description: "Tutorial of RazorPay",
      image: "assets/images/fill-gap/boy.png",
      order_id: order.id,
      callback_url: `${BACKEND_URL}/api/paymentverification`,
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
      {/* <Navbar /> */}
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Who we are?</h1>
          <h2>
            we are a unified platform of donation where volunteer can join us
            and help to collect cloths and food from donors. And donate it to
            needy people
          </h2>
          <div className={styles.btnDiv}>
            <button onClick={checkoutHandler}>Support</button>
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
