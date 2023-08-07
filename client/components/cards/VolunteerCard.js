import React from "react";
import styles from '../../styles/components/services.module.css'

const VolunteerCard = ({ picture, name, email, phone, bio }) => {
  return (
    <div style={{ padding: "20px" }} className={styles.serviceCard}>
      <span ><img src={picture} style={{ width: "100px", height: "auto", borderRadius: "100%" }} /></span>
      <h2 className={styles.title}>{name}</h2>
      <span className="text-sm  text-black">{email}</span>
      <span className="text-sm text-black">+91 {phone}</span>
      <h6 className={styles.text}>{bio?.length < 100 ? bio : bio?.slice(0, 200) + "..."}</h6>
    </div>
  );
};


export default VolunteerCard;