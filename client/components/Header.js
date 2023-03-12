import React from "react";
import Navbar from "./Navigation";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <>
      <Navbar />
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Who we are?</h1>
          <h2>we are a unified platform of donation where volunteer can join us and help to collect cloths and food from donors.</h2>
          <div className={styles.btnDiv}>

            <button >
            Donate</button>
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
