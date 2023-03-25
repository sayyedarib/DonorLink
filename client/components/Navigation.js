import { useState,useEffect } from "react";
import Link from "next/link";
import styles from "../styles/components/navigation.module.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch,useSelector } from "react-redux";
import loginPopupSlice from "@/slices/loginPopupSlice";
import userDetailSlice from "@/slices/userDetailSlice";


const Navbar = () => {
  const {userDetails} = useSelector((state)=>state.userDetail);
  console.log("userDetails ", userDetails)
  const [user, setUser] = useState({});
  const { changeVisibility } = loginPopupSlice.actions;
  const {signOutUser}= userDetailSlice.actions;
  const dispatch = useDispatch();

  return (
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
          {userDetails&&Object.keys(userDetails).length != 0 ? (
            <button className={styles.btn} onClick={()=>dispatch(signOutUser())}  >SignOut</button>
          ) : (
            <button
              className={styles.btn}
              onClick={() => dispatch(changeVisibility())}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
