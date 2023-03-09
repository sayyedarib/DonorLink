import Link from "next/link";
import React from "react";
import styles from "../styles/components/volunteerCard.module.css";

const VolunteerCard = ({ name, email, bio, img, link }) => {
  return (
    <>
      <div className={styles.volunteer}>
        <Link href={link} className={styles.link}>
          <img src={img} alt="volunteer_image not found" />
          <h2>{name}</h2>
          <h6>{email}</h6>
          <h6>{bio}</h6>
        </Link>
      </div>
    </>
  );
};

export default VolunteerCard;
