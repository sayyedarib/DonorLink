import React, { useContext} from "react";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import axios from "axios";
import jwt_decode from "jwt-decode";
import LoginPopup from "./LoginPopup";
import userContext from "@/context/auth/userContext";


const Header = () => {
  const userContextDetail = useContext(userContext);
  
  return (
    <>
      {/* <Navbar /> */}
      <header className={styles.header}>
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
        </div>
      </header>
    </>
  );
};

export default Header;
