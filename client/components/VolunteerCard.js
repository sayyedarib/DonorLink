import Link from "next/link";
import React from "react";
import styles from "../styles/components/volunteerCard.module.css";

const VolunteerCard = ({ name, email, bio, img, link }) => {
  return (
    <>
        <div className={styles.volunteer}>
      <Link href={link}>
          <img src={img} alt="volunteer_image not found" />
          <h2>{name}</h2>
          <h3>{email}</h3>
          <p>{bio}</p>
      </Link>
        </div>
    </>
  );
};

export default VolunteerCard;
