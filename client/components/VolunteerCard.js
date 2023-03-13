import Link from "next/link";
import React from "react";
import styles from "../styles/components/volunteerCard.module.css";

const VolunteerCard = ({ picture,name, email, bio, link }) => {
  return (
    <>
      <div className={styles.volunteer}>
        <Link href={link} className={styles.link}>
        <div>
          <img src={picture} alt="volunteer_image not found" />
          </div>
          <div>
          <h2 style={{fontSize:"25px", fontWeight:"900"}} >{name}</h2>
          <h6>{email}</h6>
          <h6>{bio}</h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VolunteerCard;
