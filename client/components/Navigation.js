import { useState, useContext } from "react";
import Link from "next/link";
import styles from "../styles/components/navigation.module.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userContext from "@/context/auth/userContext";
import LoginPopup from "./LoginPopup";

const Navbar = () => {
  const userContextDetail = useContext(userContext);

  return (
    <>

      <div>
      </div>
    <nav className={styles.nav}>
      <input type="checkbox" id="check" className={styles.check} />
      <label htmlFor="check" className={styles.checkbtn}>
        <FontAwesomeIcon icon={faBars} />
      </label>
      <label className={styles.logo}>
        <Link className={styles.link} href="/">
          DonorLink
        </Link>
      </label>
      <ul>
        <li>
          <Link className={styles.active} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/">
            About
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/">
            Services
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/">
            Contact
          </Link>
        </li>
        <li>
          {
            (userContextDetail?.userStateData.name != "" ? (
              <button
              className={styles.btn}
              style={{ border: "none", overflow: "hidden", borderRadius: "100%", margin:"0", padding:"0", display:"flex", justifyContent:"center", alignItems:"center"}}
                onClick={() => {
                  userContextDetail?.updateLoginPopupVisibilty();
                  userContextDetail?.signOut();
                }}
              >
                <img src={userContextDetail?.userStateData.picture} style={{width:"2rem", height:"auto"}}/>
              </button>
            ) : (
              <button
                className={styles.btn}
                onClick={() => {userContextDetail?.updateLoginPopupVisibilty()}}
              >
                Login
              </button>
            ))
          }
        </li>
      </ul>
    </nav>
    {userContextDetail?.loginPopupVisibility && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <LoginPopup />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
