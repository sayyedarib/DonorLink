import React from "react";
import data from "../constants/data";
import VolunteerCard from "./VolunteerCard";
import styles from '../styles/components/volunteers.module.css'
const Volunteers = () => {
  return (
    <>
    <section className={styles.volunteerSection}>
    <h1>Our Volunteers</h1>
    <div >
      {data.volunteers.map((data) => {
return (
        <VolunteerCard
          key={data.id}
          name={data.name}
          email={data.email}
          bio={data.bio}
          link="/"
        />)
      })}
      </div>
          </section>
    </>
  );
};

export default Volunteers;
