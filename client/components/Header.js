import React from "react";
import Navbar from "./Navigation";
import styles from "../styles/components/header.module.css";

const Header = () => {
  return (
    <>
        <Navbar />
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Sharing love, spreading hope</h1>
          <h2>Spreading hope can inspire others to persevere through difficult times and see the possibilities for a brighter future. Together, sharing love and spreading hope can help create a world where we can all thrive and live to our fullest potential.</h2>
          <div className={styles.btnDiv}>

            <button>Donate</button>
            <button>Join Us</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
